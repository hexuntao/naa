import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';

import { CreateCommentDto, QueryCommentDto, QueryCommentTreeDto } from '../dtos';
import { CommentService } from '../services';

@Controller('comments')
export class CommentController {
  constructor(protected service: CommentService) {}

  @Get('tree')
  @SerializeOptions({ groups: ['comment-tree'] })
  async tree(
    @Query()
    query: QueryCommentTreeDto,
  ) {
    return this.service.findTrees(query);
  }

  @Get()
  @SerializeOptions({ groups: ['comment-list'] })
  async list(
    @Query()
    query: QueryCommentDto,
  ) {
    return this.service.paginate(query);
  }

  @Post()
  @SerializeOptions({ groups: ['comment-detail'] })
  async store(
    @Body()
    data: CreateCommentDto,
  ) {
    return this.service.create(data);
  }

  @Delete(':id')
  @SerializeOptions({ groups: ['comment-detail'] })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
