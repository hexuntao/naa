import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import * as controllers from './controllers';
import * as entities from './entities';
import * as repositories from './repositories';
import * as services from './services';
import { SanitizeService } from './services/sanitize.service';
import { PostSubscriber } from './subscribers/post.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(entities)),
    DatabaseModule.forRepository(Object.values(repositories)),
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(services), SanitizeService, PostSubscriber],
  exports: [...Object.values(services), DatabaseModule.forRepository(Object.values(repositories))],
})
export class ContentModule {}
