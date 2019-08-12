import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EmergencyContact } from './emergency_contact';
import { FamilyDoctor } from './family_doctor';
import { Acknowledgement } from './acknowledgement';
import { Treatment } from './treatment';

@Entity('patient', { schema: 'public' })
export class Patient {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('uuid', {
    nullable: false,
    name: 'lb_uuid',
  })
  LbUuid: string;

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

  @Column('date', {
    nullable: true,
    name: 'dob',
  })
  Dob: string | null;

  @Column('text', {
    nullable: true,
    name: 'id_number',
  })
  IdNumber: string | null;

  @Column('text', {
    nullable: true,
    name: 'gender',
  })
  Gender: string | null;

  @Column('text', {
    nullable: true,
    name: 'nationality',
  })
  Nationality: string | null;

  @Column('text', {
    nullable: true,
    name: 'phone_home',
  })
  PhoneHome: string | null;

  @Column('text', {
    nullable: true,
    name: 'phone_cell',
  })
  PhoneCell: string | null;

  @Column('text', {
    nullable: true,
    name: 'phone_work',
  })
  PhoneWork: string | null;

  @Column('text', {
    nullable: true,
    name: 'email',
  })
  Email: string | null;

  @Column('text', {
    nullable: true,
    name: 'address_postal',
  })
  AddressPostal: string | null;

  @Column('text', {
    nullable: true,
    name: 'address_physical',
  })
  AddressPhysical: string | null;

  @ManyToOne(
    type => EmergencyContact,
    emergency_contact => emergency_contact.Patients,
    {},
  )
  @JoinColumn({ name: 'emergency_contact_id' })
  EmergencyContact: EmergencyContact | null;

  @ManyToOne(type => FamilyDoctor, family_doctor => family_doctor.Patients, {})
  @JoinColumn({ name: 'family_doctor_id' })
  FamilyDoctor: FamilyDoctor | null;

  @OneToMany(
    type => Acknowledgement,
    acknowledgement => acknowledgement.Patient,
  )
  Acknowledgements: Acknowledgement[];

  @OneToMany(type => Treatment, treatment => treatment.Patient)
  Treatments: Treatment[];
}
