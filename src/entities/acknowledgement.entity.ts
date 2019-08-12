import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Patient } from './patient';
import { Treatment } from './treatment';

@Entity('acknowledgement', { schema: 'public' })
export class Acknowledgement {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(type => Patient, patient => patient.Acknowledgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'patient_id' })
  Patient: Patient | null;

  @ManyToOne(type => Treatment, treatment => treatment.Acknowledgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'treatment_id' })
  Treatment: Treatment | null;

  @Column('date', {
    nullable: false,
    name: 'date',
  })
  Date: string;

  @Column('bytea', {
    nullable: false,
    name: 'signature',
  })
  Signature: Buffer;
}
