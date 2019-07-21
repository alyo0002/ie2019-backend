import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateTaskDto } from './update-task.dto';
import { AddTaskDto } from './add-task.dto';

@Controller('task-manager')
export class TaskManagerController {
  @Get(':userId')
  async fetchUserTasks(@Param() params): Promise<string> {
    return `This action fetches the tasks for user #${params.userId}.`;
    /*Fetch all task ids from task manager where user id = input
    Then fetch details for each task */
  }

  @Post(':userId')
  async addTask(@Param('userId') userId: string, @Body() addTaskDto: AddTaskDto) {
    return `This action adds a new task for user #${userId}.`;
    /*Add new task for user in task manager, then add task details to tasks*/
  }

  @Put(':taskId')
  async updateTask(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return `This action updates task #${taskId}.`;
    /*Update the details for the task in task*/
  }

  @Delete(':taskId')
  async removeTask(@Param() params): Promise<string> {
    return `This action removes task #${params.taskId}.`;
    /*Remove tasks from task*/
  }

}
