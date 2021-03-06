import { Column, Entity } from 'typeorm';

@Entity('test_table', { schema: 'public' })
export class TestTable {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: true,
    name: 'test_text',
  })
  TestText: string | null;
}
