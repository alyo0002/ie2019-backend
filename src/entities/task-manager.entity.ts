import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Users } from './users.entity';
import { Tasks } from './tasks.entity';

@Entity('task_manager', { schema: 'public' })
export class TaskManager {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(type => Users, users => users.TaskManagers, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  User: Users | null;

  @ManyToOne(type => Tasks, tasks => tasks.TaskManagers, { nullable: false })
  @JoinColumn({ name: 'task_id' })
  Task: Tasks | null;
}
