import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from './task.dto';
import { TaskManager } from '../entities/task-manager.entity';
import { Users } from '../entities/users.entity';

@Injectable()
export class TaskManagerService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    @InjectRepository(TaskManager)
    private taskManagerRepository: Repository<TaskManager>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

    /*async fetchUserTasks(userId: number): Promise<Tasks[]> {
      // Get list of taskIds from task manager where userId = userID
      const taskIds = number[];
      await this.taskManagerRepository.find(userId);
      // Use list of taskIds to fetch task details
      return await this.tasksRepository.find(userId);
    }*/

    async addTask(userId: number, taskDTO: TaskDTO): Promise<any> {
      // Get the task details from the DTO
      const {
        name,
        date_creation,
        date_due,
        description,
        priority,
      } = taskDTO;
      // Create the new task object
      const newTask = new Tasks();
      newTask.Name = name;
      newTask.DateCreation = date_creation;
      newTask.DateDue = date_due;
      newTask.Description = description;
      newTask.Priority = priority;
      // Save the new task
      const savedTask = await this.tasksRepository.save(newTask);
      // Create the new task manager object
      const newTaskManager = new TaskManager();
      newTaskManager.User = await this.usersRepository.findOne(userId);
      newTaskManager.Task = savedTask;
      // Save the new task manager
      return await this.taskManagerRepository.save(newTaskManager);
    }

    /*async updateTask(taskId: number, taskDTO: TaskDTO): Promise<any> {
      // Find the task to update, using taskId
      const task = await this.tasksRepository.findOne(taskId);
      // Update the task details, using the taskDTO
      const updatedTask = Object.assign(task, taskDTO);
      return await this.tasksRepository.save(updatedTask);
    }*/

    /*async removeTask(taskId: number): Promise<any> {
      // Delete the task, using taskId
      return await this.tasksRepository.delete(taskId);
    }*/
}
