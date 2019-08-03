import { Test, TestingModule } from '@nestjs/testing';
import { ScanTrackingController } from './scan-tracking.controller';

describe('ScanTracking Controller', () => {
  let controller: ScanTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScanTrackingController],
    }).compile();

    controller = module.get<ScanTrackingController>(ScanTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
