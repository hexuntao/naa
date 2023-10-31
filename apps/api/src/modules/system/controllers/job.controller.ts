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

import { CreateJobDto, QueryJobTreeDto, UpdateJobDto } from '../dtos';
import { JobService } from '../services';
import { SystemModule } from '../system.module';

@ApiTags('岗位操作')
@Depends(SystemModule)
@Controller('jobs')
export class JobController {
  constructor(protected service: JobService) {}

  /**
   * 查询树
   * @param options
   */
  @Get('tree')
  @SerializeOptions({ groups: ['job-tree'] })
  async tree(@Query() options: QueryJobTreeDto) {
    return this.service.findTrees(options);
  }

  /**
   * 分页查询列表
   * @param options
   */
  @Get()
  @SerializeOptions({ groups: ['job-list'] })
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
  @SerializeOptions({ groups: ['job-detail'] })
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
  @SerializeOptions({ groups: ['job-detail'] })
  async store(
    @Body()
    data: CreateJobDto,
  ) {
    return this.service.create(data);
  }

  /**
   * 更新
   * @param data
   */
  @Patch()
  @SerializeOptions({ groups: ['job-detail'] })
  async update(
    @Body()
    data: UpdateJobDto,
  ) {
    return this.service.update(data);
  }

  /**
   * 批量删除
   * @param data
   */
  @Delete()
  @SerializeOptions({ groups: ['job-list'] })
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
  @SerializeOptions({ groups: ['job-list'] })
  async restore(
    @Body()
    data: RestoreDto,
  ) {
    const { ids } = data;
    return this.service.restore(ids);
  }
}
