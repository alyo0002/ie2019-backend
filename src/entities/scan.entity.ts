import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ScanTypes } from './scan_types.entity';
import { Appointment } from './appointment.entity';
import { Users } from './users.entity';

@Entity('scan', { schema: 'public' })
export class Scan {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(type => ScanTypes, scan_types => scan_types.Scans, {
    nullable: false,
  })
  @JoinColumn({ name: 'scan_type_id' })
  ScanType: ScanTypes | null;

  @ManyToOne(type => Appointment, appointment => appointment.Scans, {
    nullable: false,
  })
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment | null;

  @ManyToOne(type => Users, users => users.Scans, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  User: Users | null;

  @Column('bytea', {
    nullable: false,
    name: 'attachment',
  })
  Attachment: Buffer;
}
