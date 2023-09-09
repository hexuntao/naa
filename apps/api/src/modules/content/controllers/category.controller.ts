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

import { QueryCategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dtos';

import { CategoryService } from '../services';

@Controller('categories')
export class CategoryController {
  constructor(protected service: CategoryService) {}

  @Get('tree')
  @SerializeOptions({ groups: ['category-tree'] })
  async tree() {
    return this.service.findTrees();
  }

  @Get()
  @SerializeOptions({ groups: ['category-list'] })
  async list(
    @Query()
    options: QueryCategoryDto,
  ) {
    return this.service.paginate(options);
  }

  @Get(':id')
  @SerializeOptions({ groups: ['category-detail'] })
  async detail(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.service.detail(id);
  }

  @Post()
  @SerializeOptions({ groups: ['category-detail'] })
  async store(
    @Body()
    data: CreateCategoryDto,
  ) {
    return this.service.create(data);
  }

  @Patch()
  @SerializeOptions({ groups: ['category-detail'] })
  async update(
    @Body()
    data: UpdateCategoryDto,
  ) {
    return this.service.update(data);
  }

  @Delete(':id')
  @SerializeOptions({ groups: ['category-detail'] })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
