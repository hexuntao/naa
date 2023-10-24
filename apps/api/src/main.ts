import { NestFactory } from '@nestjs/core';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    // 启用跨域访问
    cors: true,
    // 只使用error和warn这两种输出，避免在控制台冗余输出
    logger: ['error', 'warn'],
  });

  // 设置全局访问前缀
  app.setGlobalPrefix('api');

  // 使validator的约束可以使用nestjs的容器
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(6010, () => {
    console.log('api: http://127.0.0.1:6010');
  });
}
bootstrap();
