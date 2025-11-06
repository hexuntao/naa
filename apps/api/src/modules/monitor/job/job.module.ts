import { BullModule } from '@nestjs/bull';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobLog } from './entities/job-log.entity';
import { Job } from './entities/job.entity';
import { JobLogController } from './job-log.controller';
import { JobLogService } from './job-log.service';
import { JobController } from './job.controller';
import { JobProcessor } from './job.processor';
import { JobQueue } from './job.queue';
import { JobService } from './job.service';

import { CallTask } from './tasks/call.task';
import { HttpTask } from './tasks/http.task';
import { JOB_BULL_NAME } from './constants/bull.constants';

const taskProviders = [CallTask, HttpTask];
const taskAliasProviders = taskProviders.map<Provider>((task) => {
  // 创建字符串别名，以便可以通过字符串类型获取定义的 Service
  return {
    provide: task.name,
    useExisting: task,
  };
});

@Module({
  imports: [
    BullModule.registerQueue({
      name: JOB_BULL_NAME,
    }),
    TypeOrmModule.forFeature([Job, JobLog]),
  ],
  controllers: [JobController, JobLogController],
  providers: [
    JobService,
    JobLogService,
    JobQueue,
    JobProcessor,
    ...taskProviders,
    ...taskAliasProviders,
  ],
})
export class JobModule {}
