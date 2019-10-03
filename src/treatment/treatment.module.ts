import { HttpModule, Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Treatment } from '../entities/treatment.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Treatment, Patient])],
  providers: [TreatmentService],
  controllers: [TreatmentController],
})
export class TreatmentModule {}
