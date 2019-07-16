import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { UserGroups } from './UserGroups';
import { Scan } from './Scan';
import { TaskManager } from './TaskManager';

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

  @RelationId((users: Users) => users.UserGroups)
  UserGroupsId: number[];

  @OneToMany(type => Scan, scan => scan.User)
  Scans: Scan[];

  @OneToMany(type => TaskManager, task_manager => task_manager.User)
  TaskManagers: TaskManager[];
}
