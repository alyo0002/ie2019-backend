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
      return await this.tasksRepository.find(userId); // TODO Need to check task manager, then tasks
    }

    async addTask(userId: number, Task: TaskDTO): Promise<any> {
      return await this.tasksRepository.insert(TaskDTO); // TODO Need to add to task manager, and then tasks
    }

    async updateTask(taskId: number, Task: TaskDTO): Promise<any> {
      return await this.tasksRepository.update(taskId, Task); // TODO fix
    }

    async removeTask(taskId: number): Promise<any> {
      return await this.tasksRepository.delete(taskId);
    }
}
