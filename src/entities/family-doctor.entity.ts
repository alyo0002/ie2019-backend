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
    name: 'phone_numbeer',
  })
  PhoneNumbeer: string | null;

  @Column('text', {
    nullable: true,
    name: 'email',
  })
  Email: string | null;

  @OneToMany(type => Patient, patient => patient.FamilyDoctor)
  Patients: Patient[];
}
