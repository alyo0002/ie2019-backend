import { Column, Entity, OneToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity('user_groups', { schema: 'public' })
export class UserGroups {
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

  @OneToMany(type => Users, users => users.UserGroups)
  Userss: Users[];
}
