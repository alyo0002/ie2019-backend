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
import { ReportManager } from './report-manager.entity';

@Entity('generated_reports', { schema: 'public' })
export class GeneratedReports {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('json', {
    nullable: false,
    name: 'report_data',
  })
  ReportData: Object;

  @OneToMany(
    type => ReportManager,
    report_manager => report_manager.GeneratedReport,
  )
  ReportManagers: ReportManager[];
}
