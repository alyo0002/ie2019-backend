import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Treatment } from './treatment.entity';
import { Users } from './users.entity';
import { FormManager } from './form-manager.entity';
import { ReportManager } from './report-manager.entity';
import { Scan } from './scan.entity';

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

  @OneToMany(type => FormManager, form_manager => form_manager.Appointment)
  FormManagers: FormManager[];

  @OneToMany(
    type => ReportManager,
    report_manager => report_manager.Appointment,
  )
  ReportManagers: ReportManager[];

  @OneToMany(type => Scan, scan => scan.Appointment)
  Scans: Scan[];
}
