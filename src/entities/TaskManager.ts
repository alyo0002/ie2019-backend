import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Users } from './Users';
import { Tasks } from './Tasks';

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

  @RelationId((task_manager: TaskManager) => task_manager.User)
  UserId: number[];

  @ManyToOne(type => Tasks, tasks => tasks.TaskManagers, { nullable: false })
  @JoinColumn({ name: 'task_id' })
  Task: Tasks | null;

  @RelationId((task_manager: TaskManager) => task_manager.Task)
  TaskId: number[];
}
