import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Form } from './form.entity';
import { FormResponse } from './form-response.entity';

@Entity('form_manager', { schema: 'public' })
export class FormManager {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(type => Appointment, appointment => appointment.FormManagers, {
    nullable: false,
  })
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment | null;

  @RelationId((form_manager: FormManager) => form_manager.Appointment)
  AppointmentId: number[];

  @ManyToOne(type => Form, form => form.FormManagers, { nullable: false })
  @JoinColumn({ name: 'form_id' })
  Form: Form | null;

  @RelationId((form_manager: FormManager) => form_manager.Form)
  FormId: number[];

  @ManyToOne(
    type => FormResponse,
    form_response => form_response.FormManagers,
    { nullable: false },
  )
  @JoinColumn({ name: 'response_id' })
  Response: FormResponse | null;

  @RelationId((form_manager: FormManager) => form_manager.Response)
  ResponseId: number[];
}
