import { Module } from '@nestjs/common';
import { TaskManagerController } from './task-manager.controller';
import { TaskManagerService } from './task-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from '../entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
})
export class TaskManagerModule {}
