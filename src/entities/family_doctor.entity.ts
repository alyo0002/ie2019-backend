import { Column, Entity, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';

@Entity('family_doctor', { schema: 'public' })
export class FamilyDoctor {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: true,
    name: 'title',
  })
  Title: string | null;

  @Column('text', {
    nullable: true,
    name: 'name',
  })
  Name: string | null;

  @Column('text', {
    nullable: true,
    name: 'email',
  })
  Email: string | null;

  @Column('text', {
    nullable: true,
    name: 'phone_number',
  })
  PhoneNumber: string | null;

  @OneToMany(type => Patient, patient => patient.FamilyDoctor)
  Patients: Patient[];
}
