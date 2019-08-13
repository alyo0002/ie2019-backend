import { Column, Entity, OneToMany } from 'typeorm';
import { Form } from './form.entity';

@Entity('form_template', { schema: 'public' })
export class FormTemplate {
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

  @Column('json', {
    nullable: false,
    name: 'form_data',
  })
  FormData: Object;

  @OneToMany(type => Form, form => form.FormTemplate)
  Forms: Form[];
}
