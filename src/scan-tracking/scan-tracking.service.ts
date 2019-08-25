import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scan } from '../entities/scan.entity';
import { ScanTypes } from '../entities/scan_types.entity';
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
    try {
      // Get all of the user's scans.
      return await this.scanRepository
        .createQueryBuilder()
        .where('user_id = :userId', { userId })
        .getMany();
    } catch (e) {
      e.printStackTrace;
    }
  }

  async fetchScanById(scanId: number): Promise<any> {
    try {
      // Fetch a user's specific scan.
      return await this.scanRepository.findOne(scanId);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async addScan(scanDTO: ScanDTO): Promise<any> {
    try {
      // Get the scan details from the DTO
      const { scanTypeId, appointmentId, userId, attachment } = scanDTO;
      // Create the new scan object
      const newScan = new Scan();
      newScan.ScanType = await this.scanTypesRepository.findOne(scanTypeId);
      newScan.Appointment = await this.appointmentRepository.findOne(
        appointmentId,
      );
      newScan.User = await this.usersRepository.findOne(userId);
      newScan.Attachment = attachment;
      // Upload the new scan
      return await this.scanRepository.save(newScan);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async updateScan(scanId: number, scanDTO: ScanDTO): Promise<any> {
    try {
      // Get the updated scan details from the DTO
      const { scanTypeId, appointmentId, userId, attachment } = scanDTO;
      // Find the scan to update, using scanId
      const scan = await this.scanRepository.findOne(scanId);
      // Update the scan details
      scan.ScanType = await this.scanTypesRepository.findOne(scanTypeId);
      scan.Appointment = await this.appointmentRepository.findOne(
        appointmentId,
      );
      scan.User = await this.usersRepository.findOne(userId);
      scan.Attachment = attachment;
      // Save the updated scan
      return await this.scanRepository.save(scan);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async removeScan(scanId: number): Promise<any> {
    try {
      // Delete the scan, using its Id.
      await this.scanRepository.delete(scanId);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async fetchScanTypes(): Promise<any> {
    try {
      // Fetch all of the scan type options.
      await this.scanTypesRepository.find();
    } catch (e) {
      e.printStackTrace;
    }
  }
}
