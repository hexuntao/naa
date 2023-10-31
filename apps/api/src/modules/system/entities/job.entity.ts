import { Exclude, Expose, Type } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  Relation,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Exclude()
@Tree('materialized-path')
@Entity('system_jobs')
export class JobEntity {
  @Expose()
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string;

  @Expose()
  @Column({ comment: '岗位名称' })
  @Index({ fulltext: true })
  name: string;

  @Expose({ groups: ['job-detail', 'job-list'] })
  @TreeParent({ onDelete: 'NO ACTION' })
  @Column({ comment: '上级' })
  parent: Relation<JobEntity> | null;

  @Expose({ groups: ['job-tree'] })
  @TreeChildren({ cascade: true })
  children: Relation<JobEntity>[];

  @Expose({ groups: ['job-list', 'job-detail'] })
  @Column({ comment: '排序', default: 1 })
  sort?: number;

  @Expose({ groups: ['job-list'] })
  depth = 0;

  @Expose()
  @Column({ comment: '描述', nullable: true })
  description?: string;

  @Expose()
  @Type(() => Date)
  @DeleteDateColumn({
    comment: '删除时间',
  })
  deletedAt: Date;
}
