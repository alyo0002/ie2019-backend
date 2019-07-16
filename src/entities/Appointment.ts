import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Treatment } from './Treatment';
import { FormManager } from './FormManager';
import { Scan } from './Scan';

@Entity('appointment', { schema: 'public' })
export class Appointment {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('date', {
    nullable: false,
    name: 'appointment_date',
  })
  AppointmentDate: string;

  @ManyToOne(type => Treatment, treatment => treatment.Appointments, {})
  @JoinColumn({ name: 'treatment_id' })
  Treatment: Treatment | null;

  @RelationId((appointment: Appointment) => appointment.Treatment)
  TreatmentId: number[];

  @Column('integer', {
    nullable: false,
    name: 'user_id',
  })
  UserId: number;

  @OneToMany(type => FormManager, form_manager => form_manager.Appointment)
  FormManagers: FormManager[];

  @OneToMany(type => Scan, scan => scan.Appointment)
  Scans: Scan[];
}
