import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ReportTemplates } from './report_templates';
import { Appointment } from './appointment';

@Entity('report', { schema: 'public' })
export class Report {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(
    type => ReportTemplates,
    report_templates => report_templates.Reports,
    { nullable: false },
  )
  @JoinColumn({ name: 'report_template_id' })
  ReportTemplate: ReportTemplates | null;

  @ManyToOne(type => Appointment, appointment => appointment.Reports, {
    nullable: false,
  })
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment | null;

  @Column('json', {
    nullable: false,
    name: 'report_data',
  })
  ReportData: Object;
}
