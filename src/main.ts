import { NestFactory } from '@nestjs/core';
import {UsersModule } from './users/users.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
