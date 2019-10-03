import { Controller, Get, Param, Post } from '@nestjs/common';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {}

  @Get(':patientID')
  async getTreatment(@Param('patientID') patientID: number) {
    return this.treatmentService.getTreatment(patientID);
  }

  @Post(':patientID/:phase')
  async setTreatmentPhase(
    @Param('patientID') patientID: number,
    @Param('phase') phase: number,
  ) {
    return this.treatmentService.setTreatmentPhase(patientID, phase);
  }
}
