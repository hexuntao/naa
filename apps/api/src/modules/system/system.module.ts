import { Module, ModuleMetadata } from '@nestjs/common';

import { Configure } from '../config/configure';

import { DatabaseModule } from '../database/database.module';

import { addEntities } from '../database/helpers';

import * as entities from './entities';
import { defaultSystemConfig } from './helpers';
import * as repositories from './repositories';
import * as services from './services';
import { SystemConfig } from './types';

@Module({})
export class SystemModule {
  static async forRoot(configure: Configure) {
    const config = await configure.get<SystemConfig>('system', defaultSystemConfig);
    config;
    const DatabaseRepository = DatabaseModule.forRepository(Object.values(repositories));

    //  System 下 所有服务
    const systemServices = Object.values(services);

    const providers: ModuleMetadata['providers'] = [...systemServices];
    return {
      module: SystemModule,
      imports: [addEntities(configure, Object.values(entities)), DatabaseRepository],
      providers,
      exports: [...systemServices, DatabaseRepository],
    };
  }
}
