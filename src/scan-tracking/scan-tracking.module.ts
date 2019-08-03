import { Module } from '@nestjs/common';
import { ScanTrackingController } from './scan-tracking.controller';
import { ScanTrackingService } from './scan-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scan } from '../entities/scan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scan])],
  controllers: [ScanTrackingController],
  providers: [ScanTrackingService],
})
export class ScanTrackingModule {}
