import { Column, Entity, OneToMany } from 'typeorm';
import { Patient } from './patient';

@Entity('emergency_contact', { schema: 'public' })
export class EmergencyContact {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: true,
    name: 'name_first',
  })
  NameFirst: string | null;

  @Column('text', {
    nullable: true,
    name: 'name_last',
  })
  NameLast: string | null;

  @Column('text', {
    nullable: true,
    name: 'phone_number',
  })
  PhoneNumber: string | null;

  @Column('text', {
    nullable: true,
    name: 'email',
  })
  Email: string | null;

  @Column('text', {
    nullable: true,
    name: 'relationship',
  })
  Relationship: string | null;

  @OneToMany(type => Patient, patient => patient.EmergencyContact)
  Patients: Patient[];
}
