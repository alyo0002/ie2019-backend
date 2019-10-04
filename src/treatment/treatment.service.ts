import { Injectable } from '@nestjs/common';
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
    let toUpdate = await this.treatmentRepository.findOne(
      { Patient: patient },
      { relations: ['Patient'] },
    );
    if (toUpdate !== undefined){
      toUpdate.Phase = phase;
      return await this.treatmentRepository.save(toUpdate);
    } else {
      let treatment = new Treatment();
      treatment.Patient = patient;
      treatment.Phase = phase;
      return await this.treatmentRepository.save(treatment);
    }
  }

}
