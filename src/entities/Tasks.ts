import { Column, Entity, OneToMany } from 'typeorm';
import { TaskManager } from './TaskManager';

@Entity('tasks', { schema: 'public' })
export class Tasks {

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: false,
    name: 'name',
  })
  Name: string;

  @Column('date', {
    nullable: false,
    name: 'date_creation',
  })
  DateCreation: string;

  @Column('date', {
    nullable: false,
    name: 'date_due',
  })
  DateDue: string;

  @Column('text', {
    nullable: false,
    name: 'description',
  })
  Description: string;

  @Column('smallint', {
    nullable: false,
    name: 'priority',
  })
  Priority: number;

  @OneToMany(type => TaskManager, task_manager => task_manager.Task)
  TaskManagers: TaskManager[];

}
