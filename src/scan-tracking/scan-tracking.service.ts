import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scan } from '../entities/scan.entity';
import { ScanTypes } from '../entities/scan-types.entity';
import { Appointment } from '../entities/appointment.entity';
import { Users } from '../entities/users.entity';
import { ScanDTO } from './scan.dto';

@Injectable()
export class ScanTrackingService {
  constructor(
    @InjectRepository(Scan)
    private scanRepository: Repository<Scan>,
    @InjectRepository(ScanTypes)
    private scanTypesRepository: Repository<ScanTypes>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async fetchUserScans(userId: number): Promise<any> {
    // Get all of the user's scans.
    return await this.scanRepository
      .createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getMany();
  }

  async fetchScanById(scanId: number): Promise<any> {
    // Fetch a user's specific scan.
    return await this.scanRepository.findOne(scanId);
  }

  async addScan(scanDTO: ScanDTO): Promise<any> {
    // Get the scan details from the DTO
    const { scanTypeId, appointmentId, userId, attachment } = scanDTO;
    // Create the new scan object
    const newScan = new Scan();
    newScan.ScanType = this.scanTypesRepository.findOne(scanTypeId);
    newScan.Appointment = this.appointmentRepository.findOne(appointmentId);
    newScan.User = this.usersRepository.findOne(userId);
    newScan.Attachment = attachment;
    // Upload the new scan
    return await this.scanRepository.save(newScan);
  }

  async updateScan(scanId: number, scanDTO: ScanDTO) {
    // Get the updated scan details from the DTO
    const { scanTypeId, appointmentId, userId, attachment } = scanDTO;
    // Find the scan to update, using scanId
    const scan = await this.scanRepository.findOne(scanId);
    // Update the scan details
    Scan.ScanType = this.scanTypesRepository.findOne(scanTypeId);
    Scan.Appointment = this.appointmentRepository.findOne(appointmentId);
    Scan.User = this.usersRepository.findOne(userId);
    Scan.Attachment = attachment;
    // Save the updated scan
    return await this.scanRepository.save(scan);
  }

  async removeScan(scanId: number) {
    // Delete the scan, using its Id.
    await this.scanRepository.delete(scanId);
  }

  async fetchScanTypes() {
    // Fetch all of the scan type options.
    await this.scanTypesRepository.find();
  }
}
