import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from '../entities/emergency_contact.entity';
import { FamilyDoctor } from '../entities/family_doctor.entity';
import { Patient } from '../entities/patient.entity';
import { Users } from '../entities/users.entity';
import { validate } from 'class-validator';
import { PatientDTO } from './dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private PatientRepository: Repository<Patient>,
    @InjectRepository(EmergencyContact)
    private EmergencyContactRepository: Repository<EmergencyContact>,
    @InjectRepository(FamilyDoctor)
    private FamilyDoctorRepository: Repository<FamilyDoctor>,
  ) {}

  async getPatientList(): Promise<Patient[]> {
    return await this.PatientRepository.find({
      relations: ['EmergencyContact', 'FamilyDoctor'],
    });
  }

  async getPatient(patientID: number): Promise<any> {
    return await this.PatientRepository.findOne(patientID, {
      relations: ['EmergencyContact', 'FamilyDoctor'],
    });
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
