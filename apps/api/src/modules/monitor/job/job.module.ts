import { BullModule } from '@nestjs/bull';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JOB_BULL_NAME } from './constants/bull.constants';
import { JobLog } from './entities/job-log.entity';
import { Job } from './entities/job.entity';
import { JobController } from './job.controller';
import { JobProcessor } from './job.processor';
import { JobQueue } from './job.queue';
import { JobService } from './job.service';

import { CallTask } from './tasks/call.task';
import { HttpTask } from './tasks/http.task';

const taskProviders = [CallTask, HttpTask];
const taskAliasProviders = taskProviders.map<Provider>((task) => {
  // 创建字符串别名，以便可以通过字符串类型获取定义的 Service
  return {
    provide: task.name,
    useExisting: task,
  };
});

/**
 * 任务模块
 * @description 实现动态管理任务，可以达到动态控制定时任务启动、暂停、重启、删除、添加、修改等操作
 */
@Module({
  imports: [
    BullModule.registerQueue({
      name: JOB_BULL_NAME,
    }),
    TypeOrmModule.forFeature([Job, JobLog]),
  ],
  controllers: [JobController],
  providers: [JobQueue, JobService, JobProcessor, ...taskProviders, ...taskAliasProviders],
})
export class JobModule {}
