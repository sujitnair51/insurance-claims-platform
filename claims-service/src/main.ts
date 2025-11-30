import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import './load-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('ENV FROM NEST:', process.env.NODE_ENV);
  //  add logger - this ensures all Prisma SQL logs go through Pino
  const logger = app.get(Logger);
  app.useLogger(logger);

  // add validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
