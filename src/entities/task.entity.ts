import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity('task', { schema: 'public' })
export class Task {
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

  @ManyToOne(type => Users, users => users.Tasks, { nullable: false })
  @JoinColumn({ name: 'assignee_user_id' })
  AssigneeUser: Users | null;

  @ManyToOne(type => Users, users => users.Tasks2, { nullable: false })
  @JoinColumn({ name: 'assigner_user_id' })
  AssignerUser: Users | null;
}
