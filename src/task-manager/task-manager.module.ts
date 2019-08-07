import { Module } from '@nestjs/common';
import { TaskManagerController } from './task-manager.controller';
import { TaskManagerService } from './task-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from '../entities/tasks.entity';
import { TaskManager } from '../entities/task-manager.entity';
import { Users } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, TaskManager, Users])],
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
})
export class TaskManagerModule {}
