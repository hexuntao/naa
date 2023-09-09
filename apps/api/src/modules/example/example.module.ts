import { Module } from '@nestjs/common';

import { ContentModule } from '../content/content.module';

import { TestController } from './controllers/test.controller';
import { EighthService } from './services/eighth.service';
import { FifthService } from './services/fifth.service';
import { FirstService } from './services/first.service';
import { FourthService } from './services/fourth.service';
import { SecondService } from './services/second.service';
import { SeventhService } from './services/seventh.service';
import { SixthService } from './services/sixth.service';
import { ThirdService } from './services/third.service';

const firstObject = {
  useValue: () => 'useValue提供者',
  useAlias: () => '别名提供者',
};

const firstInstance = new FirstService();

@Module({
  imports: [ContentModule],
  providers: [
    {
      provide: FirstService,
      useValue: firstObject,
    },
    {
      provide: 'ID-EXAMPLE',
      useValue: firstInstance,
    },
    {
      provide: SecondService,
      useClass: ThirdService,
    },
    {
      provide: 'FACTORY-EXAMPLE',
      useFactory(second: SecondService) {
        const factory = new FourthService(second);
        return factory;
      },
      inject: [SecondService],
    },
    {
      provide: 'ALIAS-EXAMPLE',
      useExisting: FirstService,
    },
    {
      provide: 'ASYNC-EXAMPLE',
      useFactory: async () => {
        const factory = new FourthService(new SecondService());
        return factory.getPromise();
      },
    },
    FifthService,
    SixthService,
    SeventhService,
    EighthService,
  ],
  controllers: [TestController],
})
export class ExampleModule {}
