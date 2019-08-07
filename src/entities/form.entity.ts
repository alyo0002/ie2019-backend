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
import { FormManager } from './form-manager.entity';

@Entity('form', { schema: 'public' })
export class Form {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: false,
    name: 'form_name',
  })
  FormName: string;

  @Column('json', {
    nullable: false,
    name: 'form_data',
  })
  FormData: Object;

  @OneToMany(type => FormManager, form_manager => form_manager.Form)
  FormManagers: FormManager[];
}
