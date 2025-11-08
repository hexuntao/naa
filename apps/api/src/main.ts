import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { ConfigService } from '@/modules/config';
import { NestLogger } from '@/modules/logger';
import { SwaggerService } from '@/modules/swagger';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // bufferLogs: false,
    cors: true,
    logger: ['error', 'warn'],
  });

  app.useLogger(app.get(NestLogger));

  const config = app.get(ConfigService);
  const name = config.get<string>('app.name');
  const port = config.get<number>('app.port');
  const host = config.get<string>('app.host');
  const prefix = config.get<string>('app.prefix');

  app.setGlobalPrefix(prefix);
  app.useStaticAssets(config.get('upload.path'), { prefix: config.get('upload.prefix') });

  const swaggerConfig = config.get<any>('swagger');
  const swagger = new SwaggerService(app, swaggerConfig);
  swagger.setup();

  await app.listen(port, host, () => {
    const url = `http://${host}:${port}`;

    console.log(
      `- [${process.env.NODE_ENV}] ${name} RestAPI:  ${chalk.green.underline(`${url}/${prefix}`)}`,
    );

    if (swaggerConfig.enabled) {
      console.log(
        `- [${process.env.NODE_ENV}] ${name} RestDocs: ${chalk.green.underline(
          `${url}/${swaggerConfig.path}`,
        )}`,
      );
    }
  });
}

bootstrap();
