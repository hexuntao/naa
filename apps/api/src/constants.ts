/* eslint-disable global-require */

import { NestFactory } from '@nestjs/core';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import * as configs from './config';
import { ContentModule } from './modules/content/content.module';
import { CreateOptions } from './modules/core/types';
import * as dbCommands from './modules/database/commands';
import { DatabaseModule } from './modules/database/database.module';
import { MeilliModule } from './modules/meilisearch/melli.module';
import { RestfulModule } from './modules/restful/restful.module';

export const createOptions: CreateOptions = {
  config: { factories: configs, storage: { enabled: true } },
  modules: async (configure) => [
    DatabaseModule.forRoot(configure),
    MeilliModule.forRoot(configure),
    RestfulModule.forRoot(configure),
    ContentModule.forRoot(configure),
    // SystemModule.forRoot(configure),
  ],
  commands: () => [...Object.values(dbCommands)],
  globals: {},
  builder: async ({ configure, BootModule }) => {
    const container = await NestFactory.create<NestFastifyApplication>(
      BootModule,
      new FastifyAdapter(),
      {
        cors: true,
        logger: ['error', 'warn'],
      },
    );
    // if (!isNil(await configure.get<ApiConfig>('api', null))) {
    //   const restful = container.get(Restful);
    //   /**
    //    * 判断是否存在metadata模块,存在的话则加载并传入factoryDocs
    //    */
    //   let metadata: () => Promise<Record<string, any>>;
    //   if (existsSync(join(__dirname, 'metadata.js'))) {
    //     metadata = require(join(__dirname, 'metadata.js')).default;
    //   }
    //   if (existsSync(join(__dirname, 'metadata.ts'))) {
    //     metadata = require(join(__dirname, 'metadata.ts')).default;
    //   }
    //   await restful.factoryDocs(container, metadata);
    // }
    return container;
  },
};
