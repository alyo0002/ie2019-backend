import { Test, TestingModule } from '@nestjs/testing';
import { ScanTrackingService } from './scan-tracking.service';

describe('ScanTrackingService', () => {
  let service: ScanTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScanTrackingService],
    }).compile();

    service = module.get<ScanTrackingService>(ScanTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
