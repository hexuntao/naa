import { Injectable } from '@nestjs/common';

import { isNil, omit } from 'lodash';

import { EntityNotFoundError } from 'typeorm';

import { BaseService } from '@/modules/database/base';
import { SelectTrashMode } from '@/modules/database/constants';
import { treePaginate } from '@/modules/database/helpers';

import { PaginateWithTrashedDto } from '@/modules/restful/dtos';

import { CreateOrgDto, QueryOrgTreeDto, UpdateOrgDto } from '../dtos';
import { OrgEntity } from '../entities';
import { OrgRepository } from '../repositories';

@Injectable()
export class OrgService extends BaseService<OrgEntity, OrgRepository> {
  protected enableTrash = true;

  constructor(protected repository: OrgRepository) {
    super(repository);
  }

  /**
   * 查询树
   */
  async findTrees(options: QueryOrgTreeDto) {
    const { trashed = SelectTrashMode.NONE } = options;
    return this.repository.findTrees({
      withTrashed: trashed === SelectTrashMode.ALL || trashed === SelectTrashMode.ONLY,
      onlyTrashed: trashed === SelectTrashMode.ONLY,
    });
  }

  /**
   * 获取分页数据
   * @param options 分页选项
   */
  async paginate(options: PaginateWithTrashedDto) {
    const { trashed = SelectTrashMode.NONE } = options;
    const tree = await this.repository.findTrees({
      withTrashed: trashed === SelectTrashMode.ALL || trashed === SelectTrashMode.ONLY,
      onlyTrashed: trashed === SelectTrashMode.ONLY,
    });
    const data = await this.repository.toFlatTrees(tree);
    return treePaginate(options, data);
  }

  /**
   * 获取数据详情
   * @param id
   */
  async detail(id: string) {
    return this.repository.findOneOrFail({
      where: { id },
      relations: ['parent'],
    });
  }

  /**
   * 新增
   * @param data
   */
  async create(data: CreateOrgDto) {
    const item = await this.repository.save({
      ...data,
      parent: await this.getParent(undefined, data.parent),
    });
    return this.detail(item.id);
  }

  /**
   * 更新
   * @param data
   */
  async update(data: UpdateOrgDto) {
    await this.repository.update(data.id, omit(data, ['id', 'parent']));
    await this.detail(data.id);
    const item = await this.repository.findOneOrFail({
      where: { id: data.id },
      relations: ['parent'],
    });
    const parent = await this.getParent(item.parent?.id, data.parent);
    const shouldUpdateParent =
      (!isNil(item.parent) && !isNil(parent) && item.parent.id !== parent.id) ||
      (isNil(item.parent) && !isNil(parent)) ||
      (!isNil(item.parent) && isNil(parent));
    // 父级单独更新
    if (parent !== undefined && shouldUpdateParent) {
      item.parent = parent;
      await this.repository.save(item, { reload: true });
    }
    return item;
  }

  /**
   * 获取请求传入的父级
   * @param current 当前ID
   * @param id
   */
  protected async getParent(current?: string, parentId?: string) {
    if (current === parentId) return undefined;
    let parent: OrgEntity | undefined;
    if (parentId !== undefined) {
      if (parentId === null) return null;
      parent = await this.repository.findOne({ where: { id: parentId } });
      if (!parent) throw new EntityNotFoundError(OrgEntity, `Parent id ${parentId} not exists!`);
    }
    return parent;
  }
}
