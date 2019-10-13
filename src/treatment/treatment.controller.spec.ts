import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentController } from './treatment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from '../entities/treatment.entity';
import { Patient } from '../entities/patient.entity';

describe('Treatment Controller', () => {
  let controller: TreatmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Treatment, Patient]),
      ],
      controllers: [TreatmentController],
    }).compile();
    controller = module.get<TreatmentController>(TreatmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
