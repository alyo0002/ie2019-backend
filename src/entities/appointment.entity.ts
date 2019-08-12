import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Treatment } from './treatment';
import { Users } from './users';
import { Form } from './form';
import { Report } from './report';
import { Scan } from './scan';

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

  @ManyToOne(type => Users, users => users.Appointments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  User: Users | null;

  @OneToMany(type => Form, form => form.Appointment)
  Forms: Form[];

  @OneToMany(type => Report, report => report.Appointment)
  Reports: Report[];

  @OneToMany(type => Scan, scan => scan.Appointment)
  Scans: Scan[];
}
