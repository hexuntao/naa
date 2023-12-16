import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { ConfigService } from '@/modules/config';
import { LoggerService } from '@/modules/logger';
import { SwaggerOptions, SwaggerService } from '@/modules/swagger';

import { AppModule } from './app.module';
import { AppConfig } from './config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // bufferLogs: false,
    cors: true,
    logger: ['error', 'warn'],
  });

  app.useLogger(app.get(LoggerService));

  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');

  app.setGlobalPrefix(appConfig.prefix);

  const swaggerConfig = configService.get<SwaggerOptions>('swagger');
  const swagger = new SwaggerService(app, swaggerConfig);
  swagger.setup();

  await app.listen(appConfig.port, appConfig.host, () => {
    const url = `http://${appConfig.host}:${appConfig.port}`;

    console.log(
      `- [${process.env.NODE_ENV}] RestAPI:  ${chalk.green.underline(
        `${url}/${appConfig.prefix}`,
      )}`,
    );

    if (swaggerConfig.enabled) {
      console.log(`- [${process.env.NODE_ENV}] RestDocs: ${url}/${swaggerConfig.path}`);
    }
  });
}

bootstrap();
