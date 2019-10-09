import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from '../entities/emergency_contact.entity';
import { FamilyDoctor } from '../entities/family_doctor.entity';
import { Patient } from '../entities/patient.entity';
import { validate } from 'class-validator';
import { PatientDTO } from './dto/patient.dto';
import { map } from 'rxjs/operators';

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

  /**
   * Get an updated patient list from LogBox
   */
  async logboxUpdate(): Promise<any> {
    return this.httpService
      .get('https://qa.logbox.co.za/logboxrest_v2/patient/search', {
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
      })
      .pipe(map(response => response.data));
  }

  async logboxDatabaseUpdate(list: object): Promise<any> {
    // @ts-ignore
    list.subscribe(async data => {
      for (const item of Object.keys(data)) {
        // console.log(data[item]);
        if (
          !(await this.PatientRepository.findOne({
            IdNumber: data[item].person.idNumber,
          }))
        ) {
          const emergencyContact = new EmergencyContact();
          emergencyContact.NameFirst = data[item].emergencyContact.firstname;
          emergencyContact.NameLast = data[item].emergencyContact.lastname;
          emergencyContact.PhoneNumber =
            data[item].emergencyContact.phone.number;
          emergencyContact.Relationship =
            data[item].emergencyContact.relationship.name;

          const familyDoctor = new FamilyDoctor();
          familyDoctor.Name = data[item].familyDoctor.name;
          familyDoctor.PhoneNumber = data[item].familyDoctor.phone;

          const patient = new Patient();
          patient.LbUuid = data[item].person.uuid;
          patient.Title = data[item].person.title.name;
          patient.NameFirst = data[item].person.firstname;
          patient.NameLast = data[item].person.lastname;
          const dateParts = data[item].person.dob.split('-');
          patient.Dob = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          patient.IdNumber = data[item].person.idNumber;
          patient.Gender = data[item].person.gender;
          patient.Nationality =
            data[item].person.identityCountry.value == null
              ? 'South African'
              : data[item].person.identityCountry.value;
          patient.PhoneCell = data[item].cellPhone.number;
          patient.PhoneHome = data[item].homePhone;
          patient.PhoneWork = data[item].workPhone;
          patient.Email = data[item].email.address;
          patient.AddressPostal = data[item].postalAddress;
          patient.AddressPhysical = data[item].residentialAddress;
          // The problem is in these two fields, which are respectively relationships.
          // Due to the function being asynchronous, the 'await' keyword has to be utilized however,
          // because list is an observation returned from the http module,
          // it's impossible to query the await method inside, since the observable object itself is not asynchronous.
          // getting around this requires the usage of a TypeScript observable object, not a nest one
          if (
            !(await this.FamilyDoctorRepository.findOne({
              Name: data[item].familyDoctor.name,
              PhoneNumber: data[item].familyDoctor.phone,
            }))
          ) {
            await this.FamilyDoctorRepository.save(familyDoctor);
          }
          if (
            !(await this.EmergencyContactRepository.findOne({
              NameFirst: data[item].emergencyContact.firstname,
              NameLast: data[item].emergencyContact.lastname,
              PhoneNumber: data[item].emergencyContact.phone.number,
            }))
          ) {
            await this.EmergencyContactRepository.save(emergencyContact);
          }
          patient.EmergencyContact = await this.EmergencyContactRepository.findOne(
            {
              NameFirst: data[item].emergencyContact.firstname,
              NameLast: data[item].emergencyContact.lastname,
              PhoneNumber: data[item].emergencyContact.phone.number,
            },
          );
          patient.FamilyDoctor = await this.FamilyDoctorRepository.findOne({
            Name: data[item].familyDoctor.name,
            PhoneNumber: data[item].familyDoctor.phone,
          });
          await this.PatientRepository.save(patient);
        }
      }
    });
  }

  /**
   * Create a new patient
   * @param patientDTO
   */
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
    newPatient.Dob = new Date(dob);
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
