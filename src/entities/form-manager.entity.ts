import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Form } from './form.entity';
import { FormResponse } from './form-response.entity';

@Entity('form_manager', { schema: 'public' })
export class FormManager {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(type => Appointment, appointment => appointment.FormManagers, {
    nullable: false,
  })
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment | null;

  @ManyToOne(type => Form, form => form.FormManagers, { nullable: false })
  @JoinColumn({ name: 'form_id' })
  Form: Form | null;

  @ManyToOne(
    type => FormResponse,
    form_response => form_response.FormManagers,
    { nullable: false },
  )
  @JoinColumn({ name: 'response_id' })
  Response: FormResponse | null;
}
