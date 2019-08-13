import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Appointment } from './appointment.entity';
import { FormTemplate } from './form_template.entity';

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

  @ManyToOne(type => Appointment, appointment => appointment.Forms, {})
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment | null;

  @ManyToOne(type => FormTemplate, form_template => form_template.Forms, {
    nullable: false,
  })
  @JoinColumn({ name: 'form_template_id' })
  FormTemplate: FormTemplate | null;
}
