import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Depends } from '@/modules/restful/decorators';
import { DeleteWithTrashDto, PaginateWithTrashedDto, RestoreDto } from '@/modules/restful/dtos';

import { CreateOrgDto, QueryOrgTreeDto, UpdateOrgDto } from '../dtos';
import { OrgService } from '../services';
import { SystemModule } from '../system.module';

@ApiTags('组织操作')
@Depends(SystemModule)
@Controller('orgs')
export class OrgController {
  constructor(protected service: OrgService) {}

  /**
   * 查询树
   * @param options
   */
  @Get('tree')
  @SerializeOptions({ groups: ['org-tree'] })
  async tree(@Query() options: QueryOrgTreeDto) {
    return this.service.findTrees(options);
  }

  /**
   * 分页查询列表
   * @param options
   */
  @Get()
  @SerializeOptions({ groups: ['org-list'] })
  async list(
    @Query()
    options: PaginateWithTrashedDto,
  ) {
    return this.service.paginate(options);
  }

  /**
   * 分页详解查询
   * @param id
   */
  @Get(':id')
  @SerializeOptions({ groups: ['org-detail'] })
  async detail(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.service.detail(id);
  }

  /**
   * 新增
   * @param data
   */
  @Post()
  @SerializeOptions({ groups: ['org-detail'] })
  async store(
    @Body()
    data: CreateOrgDto,
  ) {
    return this.service.create(data);
  }

  /**
   * 更新
   * @param data
   */
  @Patch()
  @SerializeOptions({ groups: ['org-detail'] })
  async update(
    @Body()
    data: UpdateOrgDto,
  ) {
    return this.service.update(data);
  }

  /**
   * 批量删除
   * @param data
   */
  @Delete()
  @SerializeOptions({ groups: ['org-list'] })
  async delete(
    @Body()
    data: DeleteWithTrashDto,
  ) {
    const { ids, trash } = data;
    return this.service.delete(ids, trash);
  }

  /**
   * 批量恢复
   * @param data
   */
  @Patch('restore')
  @SerializeOptions({ groups: ['org-list'] })
  async restore(
    @Body()
    data: RestoreDto,
  ) {
    const { ids } = data;
    return this.service.restore(ids);
  }
}
