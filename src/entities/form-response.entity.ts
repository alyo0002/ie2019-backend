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

@Entity('form_response', { schema: 'public' })
export class FormResponse {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('json', {
    nullable: false,
    name: 'response_data',
  })
  ResponseData: object;

  @OneToMany(type => FormManager, form_manager => form_manager.Response)
  FormManagers: FormManager[];
}
