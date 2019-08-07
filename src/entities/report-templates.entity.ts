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
  ReportData: object;

  @OneToMany(
    type => ReportManager,
    report_manager => report_manager.ReportTemplate,
  )
  ReportManagers: ReportManager[];
}
