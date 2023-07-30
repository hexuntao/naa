import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(6010);
}
bootstrap().then(() => {
  console.log('http://localhost:6010/');
});
