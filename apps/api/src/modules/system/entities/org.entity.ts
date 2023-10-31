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
@Entity('system_orgs')
export class OrgEntity {
  @Expose()
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string;

  @Expose()
  @Column({ comment: '组织名称' })
  @Index({ fulltext: true })
  name: string;

  @Expose({ groups: ['org-detail', 'org-list'] })
  @TreeParent({ onDelete: 'NO ACTION' })
  @Column({ comment: '上级' })
  parent: Relation<OrgEntity> | null;

  @Expose({ groups: ['org-tree'] })
  @TreeChildren({ cascade: true })
  children: Relation<OrgEntity>[];

  @Expose({ groups: ['org-list', 'org-detail'] })
  @Column({ comment: '排序', default: 1 })
  sort?: number;

  @Expose({ groups: ['org-list'] })
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
