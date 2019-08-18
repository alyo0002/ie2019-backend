import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTemplate } from '../entities/form_template.entity';
import { Form } from '../entities/form.entity';
import { Appointment } from '../entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormTemplate, Form, Appointment])],
  providers: [FormsService],
  controllers: [FormsController]
})
export class FormsModule {}
