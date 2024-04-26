import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesController } from './courses/courses.controller';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [UsersModule, CoursesModule, TeachersModule],
  controllers: [AppController, CoursesController],
  providers: [AppService],
})
export class AppModule {}
