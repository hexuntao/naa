import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';

import { ConfigService } from '@/modules/config';
import { LoggerService } from '@/modules/logger';
import { SwaggerService } from '@/modules/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(LoggerService));

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');

  const swaggerConfig = config.get('swagger');
  const swagger = new SwaggerService(app, swaggerConfig);
  swagger.setup();

  await app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log(`http://localhost:${port}/swagger`);
  });
}

bootstrap();
