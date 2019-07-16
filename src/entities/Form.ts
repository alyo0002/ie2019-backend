import { Column, Entity, OneToMany } from 'typeorm';
import { FormManager } from './FormManager';

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
