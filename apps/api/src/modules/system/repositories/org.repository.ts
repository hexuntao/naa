import { pick, unset } from 'lodash';
import { FindOptionsUtils, FindTreeOptions } from 'typeorm';

import { BaseTreeRepository } from '@/modules/database/base';
import { OrderType, TreeChildrenResolve } from '@/modules/database/constants';
import { CustomRepository } from '@/modules/database/decorators';

import { OrgEntity } from '../entities';

@CustomRepository(OrgEntity)
export class OrgRepository extends BaseTreeRepository<OrgEntity> {
  protected _qbName = 'org';

  protected orderBy = { name: 'sort', order: OrderType.ASC };

  protected _childrenResolve = TreeChildrenResolve.UP;

  /**
   * 构建基础查询器
   */
  buildBaseQB() {
    return this.createQueryBuilder('org').leftJoinAndSelect('org.parent', 'parent');
  }

  /**
   * 树形结构查询
   * @param options
   */
  async findTrees(
    options?: FindTreeOptions & {
      onlyTrashed?: boolean;
      withTrashed?: boolean;
    },
  ) {
    const roots = await this.findRoots(options);
    await Promise.all(roots.map((root) => this.findDescendantsTree(root, options)));
    return roots;
  }

  /**
   * 查询顶级分类
   * @param options
   */
  findRoots(
    options?: FindTreeOptions & {
      onlyTrashed?: boolean;
      withTrashed?: boolean;
    },
  ) {
    const escapeAlias = (alias: string) => this.manager.connection.driver.escape(alias);
    const escapeColumn = (column: string) => this.manager.connection.driver.escape(column);

    const joinColumn = this.metadata.treeParentRelation!.joinColumns[0];
    const parentPropertyName = joinColumn.givenDatabaseName || joinColumn.databaseName;
    const qb = this.buildBaseQB().orderBy('org.sort', 'ASC');
    qb.where(`${escapeAlias('org')}.${escapeColumn(parentPropertyName)} IS NULL`);
    FindOptionsUtils.applyOptionsToTreeQueryBuilder(qb, pick(options, ['relations', 'depth']));
    if (options?.withTrashed) {
      qb.withDeleted();
      if (options?.onlyTrashed) qb.where(`org.deletedAt IS NOT NULL`);
    }
    return qb.getMany();
  }

  /**
   * 查询后代分类
   * @param entity
   * @param options
   */
  findDescendants(
    entity: OrgEntity,
    options?: FindTreeOptions & {
      onlyTrashed?: boolean;
      withTrashed?: boolean;
    },
  ) {
    const qb = this.createDescendantsQueryBuilder('org', 'treeClosure', entity);
    FindOptionsUtils.applyOptionsToTreeQueryBuilder(qb, options);
    qb.orderBy('org.sort', 'ASC');
    if (options?.withTrashed) {
      qb.withDeleted();
      if (options?.onlyTrashed) qb.where(`org.deletedAt IS NOT NULL`);
    }
    return qb.getMany();
  }

  /**
   * 查询祖先分类
   * @param entity
   * @param options
   */
  findAncestors(
    entity: OrgEntity,
    options?: FindTreeOptions & {
      onlyTrashed?: boolean;
      withTrashed?: boolean;
    },
  ) {
    const qb = this.createAncestorsQueryBuilder('org', 'treeClosure', entity);
    FindOptionsUtils.applyOptionsToTreeQueryBuilder(qb, options);
    qb.orderBy('org.sort', 'ASC');
    if (options?.withTrashed) {
      qb.withDeleted();
      if (options?.onlyTrashed) qb.where(`org.deletedAt IS NOT NULL`);
    }
    return qb.getMany();
  }

  /**
   * 统计后代元素数量
   * @param entity
   * @param options
   */
  async countDescendants(
    entity: OrgEntity,
    options?: { withTrashed?: boolean; onlyTrashed?: boolean },
  ) {
    const qb = this.createDescendantsQueryBuilder('org', 'treeClosure', entity);
    if (options?.withTrashed) {
      qb.withDeleted();
      if (options?.onlyTrashed) qb.where(`org.deletedAt IS NOT NULL`);
    }
    return qb.getCount();
  }

  /**
   * 统计祖先元素数量
   * @param entity
   * @param options
   */
  async countAncestors(
    entity: OrgEntity,
    options?: { withTrashed?: boolean; onlyTrashed?: boolean },
  ) {
    const qb = this.createAncestorsQueryBuilder('org', 'treeClosure', entity);
    if (options?.withTrashed) {
      qb.withDeleted();
      if (options?.onlyTrashed) qb.where(`org.deletedAt IS NOT NULL`);
    }
    return qb.getCount();
  }

  /**
   * 打平并展开树
   * @param trees
   * @param depth
   * @param parent
   */
  async toFlatTrees(trees: OrgEntity[], depth = 0, parent: OrgEntity | null = null) {
    const data: Omit<OrgEntity, 'children'>[] = [];
    for (const item of trees) {
      item.depth = depth;
      item.parent = parent;
      const { children } = item;
      unset(item, 'children');
      data.push(item);
      data.push(...(await this.toFlatTrees(children, depth + 1, item)));
    }
    return data as OrgEntity[];
  }
}
