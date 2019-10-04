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
import { AuthGuard } from '@nestjs/passport';

@Controller('task-manager')
export class TaskManagerController {
  constructor(private taskService: TaskManagerService) {}

  /**
   * Fetch all of the user's assigned tasks.
   * @param userId
   */
  @Get('/myTasks/:userId')
  async fetchMyTasks(@Param('userId') userId: number) {
    return this.taskService.fetchMyTasks(userId);
  }

  /**
   * Fetch all of the tasks that this user has assigned to other users.
   * @param userId
   */
  @Get('/assignedTasks/:userId')
  async fetchAssignedTasks(@Param('userId') userId: number) {
    return this.taskService.fetchAssignedTasks(userId);
  }

  /**
   * Add a task to the assigned user.
   * @param userId
   * @param taskDTO
   */
  @Post(':userId')
  async addTask(@Param('userId') userId: number, @Body() taskDTO: TaskDTO) {
    return this.taskService.addTask(userId, taskDTO);
  }

  /**
   * Update a task. Note that task assigner cannot be updated.
   * @param taskId
   * @param taskDTO
   */
  @Put(':taskId')
  async updateTask(@Param('taskId') taskId: number, @Body() taskDTO: TaskDTO) {
    return this.taskService.updateTask(taskId, taskDTO);
  }

  /**
   * Delete a task.
   * @param taskId
   */
  @Delete(':taskId')
  async removeTask(@Param('taskId') taskId: number) {
    return this.taskService.removeTask(taskId);
  }
}
