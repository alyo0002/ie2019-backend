import { Module } from '@nestjs/common';
import { ScanTrackingController } from './scan-tracking.controller';
import { ScanTrackingService } from './scan-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scan } from '../entities/scan.entity';
import { ScanTypes } from '../entities/scan-types.entity';
import { Appointment } from '../entities/appointment.entity';
import { Users } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scan, ScanTypes, Appointment, Users])],
  controllers: [ScanTrackingController],
  providers: [ScanTrackingService],
})
export class ScanTrackingModule {}
