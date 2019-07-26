import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from './task.dto';

@Injectable()
export class TaskManagerService {
    constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    ) {}

    async fetchUserTasks(userId: number): Promise<any> {
      // Get list of taskIds from task manager where userId = userID
      // Use list of taskIds to fetch task details
      return await this.tasksRepository.find(userId);
    }

    async addTask(userId: number, Task: TaskDTO): Promise<any> {
      // Use task details to create task, and get its ID
      // Insert task ID and userId into task manager
      return await this.tasksRepository.insert(TaskDTO);
    }

    async updateTask(taskId: number, Task: TaskDTO): Promise<any> {
      // Update the task with new details, based on the taskId
      return await this.tasksRepository.update(taskId, Task);
    }

    async removeTask(taskId: number): Promise<any> {
      // Delete the task, using taskId
      return await this.tasksRepository.delete(taskId);
    }
}
