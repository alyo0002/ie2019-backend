import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from './task.dto';
import { TaskManager } from '../entities/task-manager.entity';

@Injectable()
export class TaskManagerService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    @InjectRepository(TaskManager)
    private taskManagerRepository: Repository<TaskManager>,
  ) {}

    async fetchUserTasks(userId: number): Promise<Tasks[]> {
      // Get list of taskIds from task manager where userId = userID
      const taskIds = number[];
      await this.taskManagerRepository.find(userId);
      // Use list of taskIds to fetch task details
      return await this.tasksRepository.find(userId);
    }

    async addTask(userId: number, taskDTO: TaskDTO): Promise<any> {
      // Use task details to create task, and get its ID
      // Insert task ID and userId into task manager
      return await this.tasksRepository.insert(TaskDTO);
    }

    async updateTask(taskId: number, taskDTO: TaskDTO): Promise<any> {
      // Find the task to update, using taskId
      const task = await this.tasksRepository.findOne(taskId);
      // Update the task details, using the taskDTO
      const updatedTask = Object.assign(task, taskDTO);
      return await this.tasksRepository.save(updatedTask);
    }

    async removeTask(taskId: number): Promise<any> {
      // Delete the task, using taskId
      return await this.tasksRepository.delete(taskId);
    }
}
