import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from '../entities/emergency_contact.entity';
import { FamilyDoctor } from '../entities/family_doctor.entity';
import { Patient } from '../entities/patient.entity';
import { validate } from 'class-validator';
import { PatientDTO } from './dto/patient.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private PatientRepository: Repository<Patient>,
    @InjectRepository(EmergencyContact)
    private EmergencyContactRepository: Repository<EmergencyContact>,
    @InjectRepository(FamilyDoctor)
    private FamilyDoctorRepository: Repository<FamilyDoctor>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Get a list of all patients
   */
  async getPatientList(): Promise<Patient[]> {
    return await this.PatientRepository.find({
      relations: ['EmergencyContact', 'FamilyDoctor'],
    });
  }

  /**
   * Get a patient by ID
   * @param patientID patientID to lookup
   */
  async getPatient(patientID: number): Promise<Patient> {
    return await this.PatientRepository.findOne(patientID, {
      relations: ['EmergencyContact', 'FamilyDoctor'],
    });
  }

  async logboxUpdate(): Promise<any> {
    /*
    TODO: Query logbox for a list of patients
    TODO: Filter list for duplicates
    TODO: Create new patients based on list
    */

    return this.httpService.get(
      'https://qa.logbox.co.za/logboxrest_v2/patient/search',
      {
        params: {
          practiceNumber: '0458795',
        },
        headers: {
          Connection: 'keep-alive',
          Host: 'qa.logbox.co.za',
          'Cache-Control': 'no-cache',
          Accept: '*/*',
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJsaXZkbTk1QGdtYWlsLmNvbSJ9.am6gP8vm-_GFGKzyXEL_oKD5HnjxSItBF5jaTaGeCFd1hNjECd-cqLfzpQE6DeM7XCHj-IEP89PXbNgtdyI3oA',
        },
      },
    );
  }

  async createPatient(patientDTO: PatientDTO): Promise<any> {
    const {
      address_physical,
      address_postal,
      dob,
      email,
      emergency_contact_id,
      family_doctor_id,
      gender,
      id_number,
      name_first,
      name_last,
      nationality,
      phone_cell,
      phone_home,
      phone_work,
      title,
      lb_uuid,
    } = patientDTO;

    const userCheck = await this.PatientRepository.createQueryBuilder()
      .where('LbUuid = :lb_uuid', { lb_uuid })
      .getOne();
    if (userCheck) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newPatient = new Patient();
    newPatient.LbUuid = lb_uuid;
    newPatient.Title = title;
    newPatient.NameFirst = name_first;
    newPatient.NameLast = name_last;
    newPatient.Dob = dob;
    newPatient.IdNumber = id_number;
    newPatient.Gender = gender;
    newPatient.Nationality = nationality;
    newPatient.PhoneHome = phone_home;
    newPatient.PhoneCell = phone_cell;
    newPatient.PhoneWork = phone_work;
    newPatient.Email = email;
    newPatient.AddressPostal = address_postal;
    newPatient.AddressPhysical = address_physical;
    newPatient.EmergencyContact = await this.EmergencyContactRepository.findOne(
      emergency_contact_id,
    );
    newPatient.FamilyDoctor = await this.FamilyDoctorRepository.findOne(
      family_doctor_id,
    );

    const errors = await validate(newPatient);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Something went wrong', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.PatientRepository.save(newPatient);
    }
  }
}
