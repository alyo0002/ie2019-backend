import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskManagerController } from './task-manager/task-manager.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '167.71.36.250',
      port: 5432,
      username: 'postgres',
      password: 'qaaNGvi5CSQ968tv3v1hSemg1gc',
      database: 'oms',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController, TaskManagerController],
  providers: [AppService],
})
export class AppModule {}
