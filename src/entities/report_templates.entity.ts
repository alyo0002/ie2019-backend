import { Column, Entity, OneToMany } from 'typeorm';
import { Report } from './report';

@Entity('report_templates', { schema: 'public' })
export class ReportTemplates {
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
    name: 'report_data',
  })
  ReportData: Object;

  @OneToMany(type => Report, report => report.ReportTemplate)
  Reports: Report[];
}
