import { HttpModule, Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from '../entities/emergency_contact.entity';
import { FamilyDoctor } from '../entities/family_doctor.entity';
import { Patient } from '../entities/patient.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Patient, EmergencyContact, FamilyDoctor]),
  ],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
