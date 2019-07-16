import { Column, Entity, OneToMany } from 'typeorm';
import { Treatment } from './Treatment';

@Entity('phases', { schema: 'public' })
export class Phases {

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: false,
    name: 'description',
  })
  Description: string;

  @OneToMany(type => Treatment, treatment => treatment.Phase)
  Treatments: Treatment[];

}
