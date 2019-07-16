import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Phases } from './Phases';
import { Appointment } from './Appointment';

@Entity('treatment', { schema: 'public' })
export class Treatment {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('integer', {
    nullable: false,
    name: 'patient_id',
  })
  PatientId: number;

  @ManyToOne(type => Phases, phases => phases.Treatments, { nullable: false })
  @JoinColumn({ name: 'phase_id' })
  Phase: Phases | null;

  @RelationId((treatment: Treatment) => treatment.Phase)
  PhaseId: number[];

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

  @OneToMany(type => Appointment, appointment => appointment.Treatment)
  Appointments: Appointment[];
}
