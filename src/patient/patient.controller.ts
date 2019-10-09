import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDTO } from './dto/patient.dto';
import { TreatmentDTO } from './dto/treatment.dto';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  /**
   * Get all patients
   */
  @Get('/list')
  async findAll() {
    return this.patientService.getPatientList();
  }
  /**
   * Update patient list from LogBox. This happens in two stages due to an issue with the nestjs lifecycle
   * The first stage gets an observer from the nest http module by calling logboxUpdate
   * The second stage passes the observer to logboxDatabaseUpdate and converts the observer to a TypeScript
   * object and forces the resulting lambda to be asynchronous allowing for the relationships to be created within the object.
   * This is done using the ES5 and not ES6 functions, but this shouldn't result in any issues long term.
   */
  @Get('/listUpdate')
  async logboxUpdate() {
    const patientList = await this.patientService.logboxUpdate().catch(err => {
      throw err;
    });
    return await this.patientService.logboxDatabaseUpdate(patientList);
  }

  /**
   * Get specific patient
   * @param patientID
   */
  @Get(':patientID')
  async getUser(@Param('patientID') patientID: number) {
    return this.patientService.getPatient(patientID);
  }

  /**
   * Create a new patient
   * @param patientDTO
   */
  @Post()
  async createPatient(@Body() patientDTO: PatientDTO) {
    return this.patientService.createPatient(patientDTO);
  }
}
