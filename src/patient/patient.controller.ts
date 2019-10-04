import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDTO } from './dto/patient.dto';
import { TreatmentDTO } from './dto/treatment.dto';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get('/list')
  async findAll() {
    return this.patientService.getPatientList();
  }

  @Get(':patientID')
  async getUser(@Param('patientID') patientID: number) {
    return this.patientService.getPatient(patientID);
  }

  @Get('/listUpdate')
  async logboxUpdate() {
    return this.patientService.logboxUpdate().catch(err => {
      throw err;
    });
  }

  @Post()
  async createPatient(@Body() patientDTO: PatientDTO) {
    return this.patientService.createPatient(patientDTO);
  }
}