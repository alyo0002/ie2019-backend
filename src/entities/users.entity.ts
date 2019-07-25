import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserGroups } from './user-groups.entity';
import { Appointment } from './appointment.entity';
import { Scan } from './scan.entity';
import { TaskManager } from './task-manager.entity';
const bcrypt = require('bcrypt');

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

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.PasswordHash) {
      this.PasswordHash = await Users.hashPassword(this.PasswordHash);
    }
  }

  private static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  @ManyToOne(type => UserGroups, user_groups => user_groups.Userss, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_groups_id' })
  UserGroups: UserGroups | null;

  @OneToMany(type => Appointment, appointment => appointment.User)
  Appointments: Appointment[];

  @OneToMany(type => Scan, scan => scan.User)
  Scans: Scan[];

  @OneToMany(type => TaskManager, task_manager => task_manager.User)
  TaskManagers: TaskManager[];
}
