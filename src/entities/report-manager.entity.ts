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
import { GeneratedReports } from './generated-reports.entity';
import { ReportTemplates } from './report-templates.entity';
import { Appointment } from './appointment.entity';

@Entity('report_manager', { schema: 'public' })
export class ReportManager {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @ManyToOne(
    type => GeneratedReports,
    generated_reports => generated_reports.ReportManagers,
    { nullable: false },
  )
  @JoinColumn({ name: 'generated_report_id' })
  GeneratedReport: GeneratedReports | null;

  @ManyToOne(
    type => ReportTemplates,
    report_templates => report_templates.ReportManagers,
    { nullable: false },
  )
  @JoinColumn({ name: 'report_template_id' })
  ReportTemplate: ReportTemplates | null;

  @ManyToOne(type => Appointment, appointment => appointment.ReportManagers, {})
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment | null;
}
