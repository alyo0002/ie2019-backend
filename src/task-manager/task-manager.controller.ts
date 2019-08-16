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
  @Get('/myTasks/:userId')
  async fetchMyTasks(@Param('userId') userId: number) {
    return this.taskService.fetchMyTasks(userId);
  }

  // Fetch all of the tasks that this user has assigned to other users.
  @Get('/assignedTasks/:userId')
  async fetchAssignedTasks(@Param('userId') userId: number) {
    return this.taskService.fetchAssignedTasks(userId);
  }

  // Add a task to the assigned user.
  @Post(':userId')
  async addTask(@Param('userId') userId: number, @Body() taskDTO: TaskDTO) {
    return this.taskService.addTask(userId, taskDTO);
  }

  // Update a task. Note that task assigner cannot be updated.
  @Put(':taskId')
  async updateTask(@Param('taskId') taskId: number, @Body() taskDTO: TaskDTO) {
    return this.taskService.updateTask(taskId, taskDTO);
  }

  // Delete a task.
  @Delete(':taskId')
  async removeTask(@Param('taskId') taskId: number) {
    return this.taskService.removeTask(taskId);
  }
}
