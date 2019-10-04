import { Controller, Get, Param, Post } from '@nestjs/common';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {}

  /**
   * Get the current treatment for a specific patient
   * @param patientID
   */
  @Get(':patientID')
  async getTreatment(@Param('patientID') patientID: number) {
    return this.treatmentService.getTreatment(patientID);
  }

  /**
   * Change the treatment phase for a specific patient
   * @param patientID
   * @param phase
   */
  @Get(':patientID/:phase')
  async setTreatmentPhase(
    @Param('patientID') patientID: number,
    @Param('phase') phase: number,
  ) {
    return this.treatmentService.setTreatmentPhase(patientID, phase);
  }
}
