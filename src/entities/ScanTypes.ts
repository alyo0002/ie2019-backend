import { Column, Entity, OneToMany } from 'typeorm';
import { Scan } from './Scan';

@Entity('scan_types', { schema: 'public' })
export class ScanTypes {

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

  @OneToMany(type => Scan, scan => scan.ScanType)
  Scans: Scan[];

}
