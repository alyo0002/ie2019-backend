import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserGroups } from './user_groups.entity';
import { Appointment } from './appointment.entity';
import { Scan } from './scan.entity';
import { Task } from './task.entity';

import bcrypt = require('bcrypt');

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
      const salt = bcrypt.genSaltSync();

      this.PasswordHash = await Users.hashPassword(this.PasswordHash, salt);
      this.PasswordSalt = salt;
    }
  }

  private static hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  @Column('text', {
    nullable: true,
    name: 'password_salt',
  })
  PasswordSalt: string;

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

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.PasswordSalt);
    return hash === this.PasswordHash;
  }
}
