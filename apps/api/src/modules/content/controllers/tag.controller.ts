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

import { QueryCategoryDto, CreateTagDto, UpdateTagDto } from '../dtos';

import { TagService } from '../services';

@Controller('tags')
export class TagController {
  constructor(protected service: TagService) {}

  @Get()
  @SerializeOptions({})
  async list(
    @Query()
    options: QueryCategoryDto,
  ) {
    return this.service.paginate(options);
  }

  @Get(':id')
  @SerializeOptions({})
  async detail(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.service.detail(id);
  }

  @Post()
  @SerializeOptions({})
  async store(
    @Body()
    data: CreateTagDto,
  ) {
    return this.service.create(data);
  }

  @Patch()
  @SerializeOptions({})
  async update(
    @Body()
    data: UpdateTagDto,
  ) {
    return this.service.update(data);
  }

  @Delete(':id')
  @SerializeOptions({})
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
