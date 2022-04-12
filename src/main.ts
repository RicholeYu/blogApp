import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ServeStatic from 'serve-static';
import { config } from 'config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use('/public', ServeStatic(config.STATIC_UPLOAD_DIR, {}));

  await app.listen(config.http.port);
}
bootstrap();
