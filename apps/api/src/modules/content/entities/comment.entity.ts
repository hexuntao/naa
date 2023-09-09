import { Exclude, Expose, Type } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { PostEntity } from './post.entity';

@Exclude()
@Tree('materialized-path')
@Entity('content_comments')
export class CommentEntity extends BaseEntity {
  @Expose()
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string;

  @Expose()
  @Column({ comment: '评论内容', type: 'text' })
  body: string;

  @Expose()
  @Type(() => Date)
  @CreateDateColumn({
    comment: '创建时间',
  })
  createdAt: Date;

  @Expose()
  depth = 0;

  @Expose()
  @ManyToOne(() => PostEntity, (post) => post.comments, {
    // 文章不能为空
    nullable: false,
    // 跟随父表删除与更新
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Relation<PostEntity>;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Relation<CommentEntity> | null;

  @Expose()
  @TreeChildren({ cascade: true })
  children: Relation<CommentEntity>[];
}
