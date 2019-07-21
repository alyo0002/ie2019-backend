import { Module } from '@nestjs/common';
import { TaskManagerController } from './task-manager.controller';

@Module({
  controllers: [TaskManagerController]
})
export class TaskManagerModule {}
