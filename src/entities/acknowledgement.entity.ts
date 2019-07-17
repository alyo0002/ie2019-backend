import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Patient } from './patient.entity';
import { Treatment } from './treatment.entity';

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

  @RelationId((acknowledgement: Acknowledgement) => acknowledgement.Patient)
  PatientId: number[];

  @ManyToOne(type => Treatment, treatment => treatment.Acknowledgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'treatment_id' })
  Treatment: Treatment | null;

  @RelationId((acknowledgement: Acknowledgement) => acknowledgement.Treatment)
  TreatmentId: number[];

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
