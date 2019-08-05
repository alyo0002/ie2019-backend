import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { TaskManagerService } from './task-manager.service';

@Controller('task-manager')
export class TaskManagerController {
  constructor(private taskService: TaskManagerService) {}

  // Fetch all of the user's assigned tasks.
  @Get(':userId')
  async fetchUserTasks(
    @Param('userId') userId: number) {
    return this.taskService.fetchUserTasks(userId);
  }

  // Add a task to the assigned user.
  @Post(':userId')
  async addTask(
    @Param('userId') userId: number,
    @Body() taskDTO: TaskDTO) {
    return this.taskService.addTask(userId, taskDTO);
  }

  // Update a task.
  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() Task: TaskDTO) {
    return this.taskService.updateTask(taskId, Task);
  }

  // Delete a task.
  @Delete(':taskId')
  async removeTask(
    @Param('taskId') taskId: number) {
    return this.taskService.removeTask(taskId);
  }
}
