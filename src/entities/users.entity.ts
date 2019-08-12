import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserGroups } from './user_groups';
import { Appointment } from './appointment';
import { Scan } from './scan';
import { Task } from './task';

@Entity('users', { schema: 'public' })
export class Users {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: false,
    name: 'name_first',
  })
  NameFirst: string;

  @Column('text', {
    nullable: false,
    name: 'name_last',
  })
  NameLast: string;

  @Column('text', {
    nullable: false,
    name: 'email',
  })
  Email: string;

  @Column('text', {
    nullable: false,
    name: 'password_hash',
  })
  PasswordHash: string;

  @ManyToOne(type => UserGroups, user_groups => user_groups.Userss, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_groups_id' })
  UserGroups: UserGroups | null;

  @OneToMany(type => Appointment, appointment => appointment.User)
  Appointments: Appointment[];

  @OneToMany(type => Scan, scan => scan.User)
  Scans: Scan[];

  @OneToMany(type => Task, task => task.AssigneeUser)
  Tasks: Task[];

  @OneToMany(type => Task, task => task.AssignerUser)
  Tasks2: Task[];
}
