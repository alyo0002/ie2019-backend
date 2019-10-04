import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScanDTO } from './scan.dto';
import { ScanTrackingService } from '../scan-tracking/scan-tracking.service';

@Controller('scan-tracking')
export class ScanTrackingController {
  constructor(private scanService: ScanTrackingService) {}

  /**
   * Fetch all of the user's scans.
   * @param userId
   */
  @Get(':userId')
  async fetchUserScans(@Param('userId') userId: number) {
    return this.scanService.fetchUserScans(userId);
  }

  /**
   * Fetch a user's specific scan.
   * @param scanId
   */
  @Get(':scanId')
  async fetchScanById(@Param('scanId') scanId: number) {
    return this.scanService.fetchScanById(scanId);
  }

  /**
   * Upload a new scan.
   * @param scanDTO
   */
  @Post()
  async addScan(@Body() scanDTO: ScanDTO) {
    return this.scanService.addScan(scanDTO);
  }

  /**
   * Edit the details of a scan.
   * @param scanId
   * @param scanDTO
   */
  @Put(':scanId')
  async updateScan(@Param('scanId') scanId: number, @Body() scanDTO: ScanDTO) {
    return this.scanService.updateScan(scanId, scanDTO);
  }

  /**
   * Delete a scan.
   * @param scanId
   */
  @Delete(':scanId')
  async removeScan(@Param('scanId') scanId: number) {
    return this.scanService.removeScan(scanId);
  }

  /**
   * Fetch all of the scan type options
   */
  @Get()
  async fetchScanTypes() {
    return this.scanService.fetchScanTypes();
  }
}
