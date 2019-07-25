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
import { Patient } from './patient.entity';
import { Phases } from './phases.entity';
import { Acknowledgement } from './acknowledgement.entity';
import { Appointment } from './appointment.entity';

@Entity('treatment', { schema: 'public' })
export class Treatment {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(type => Patient, patient => patient.Treatments, {
    nullable: false,
  })
  @JoinColumn({ name: 'patient_id' })
  Patient: Patient | null;

  @ManyToOne(type => Phases, phases => phases.Treatments, { nullable: false })
  @JoinColumn({ name: 'phase_id' })
  Phase: Phases | null;

  @Column('text', {
    nullable: false,
    name: 'treatment_name',
  })
  TreatmentName: string;

  @Column('integer', {
    nullable: true,
    name: 'treatment_cycle',
  })
  TreatmentCycle: number | null;

  @OneToMany(
    type => Acknowledgement,
    acknowledgement => acknowledgement.Treatment,
  )
  Acknowledgements: Acknowledgement[];

  @OneToMany(type => Appointment, appointment => appointment.Treatment)
  Appointments: Appointment[];
}
