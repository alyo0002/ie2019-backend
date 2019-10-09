import { Injectable, Logger } from '@nestjs/common';
import { Treatment } from '../entities/treatment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  /**
   * Get a treatment entity from the database
   * @param patientID patientID to lookup
   */
  async getTreatment(patientID: number): Promise<Treatment> {
    const patient = await this.patientRepository.findOne(patientID);
    return await this.treatmentRepository.findOne(
      { Patient: patient },
      { relations: ['Patient'] },
    );
  }

  /**
   * Update a treatment phase for a patient
   * @param patientID patientID to lookup
   * @param phase phase to update to
   */
  async setTreatmentPhase(
    patientID: number,
    phase: number,
  ): Promise<Treatment> {
    const patient = await this.patientRepository.findOne(patientID);
    const toUpdate = await this.treatmentRepository.findOne(
      { Patient: patient },
      { relations: ['Patient'] },
    );
    if (toUpdate !== undefined) {
      toUpdate.Phase = phase;
      return await this.treatmentRepository.save(toUpdate);
    } else {
      const treatment = new Treatment();
      treatment.Patient = patient;
      treatment.Phase = phase;
      return await this.treatmentRepository.save(treatment);
    }
  }

  /**
   * Get phase totals
   */
  async getPhaseTotals(): Promise<any> {
    return await this.treatmentRepository
      .createQueryBuilder()
      .select('phase, COUNT(phase)')
      .groupBy('phase')
      .orderBy('phase')
      .getRawMany();
  }
}
