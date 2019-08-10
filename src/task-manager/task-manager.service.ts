import { Injectable, Logger } from '@nestjs/common';
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

  async fetchUserTasks(userId: number): Promise<any> {
    // Get the user's task managers
    const taskManagers = await this.taskManagerRepository
      .createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getMany();

    return taskManagers;

    /*// Create an array to hold the taskManagers
    const taskManagers = [];
    // For each task manager id, get the corresponding task manager
    taskManagerIds.forEach(async (taskManagerId) => {
      Logger.debug(taskManagerId.Id);
      Logger.debug(await this.taskManagerRepository.findOne(taskManagerId.Id));
      const tempTaskManager = await this.taskManagerRepository.findOne(taskManagerId.Id);
      Logger.debug(tempTaskManager);
      taskManagers.push(tempTaskManager);
    });
    return taskManagers;*/
  }

  async addTask(userId: number, taskDTO: TaskDTO): Promise<any> {
    // Get the task details from the DTO
    const { name, date_creation, date_due, description, priority } = taskDTO;
    // Create the new task object
    const newTask = new Tasks();
    newTask.Name = name;
    newTask.DateCreation = date_creation;
    newTask.DateDue = date_due;
    newTask.Description = description;
    newTask.Priority = priority;
    // Save the new task
    await this.tasksRepository.save(newTask);
    // Get the id of the newly-created task
    const latestTask = await this.tasksRepository
      .createQueryBuilder()
      .orderBy("id", "DESC")
      .getOne();
    // Create the new task manager object
    const newTaskManager = new TaskManager();
    newTaskManager.User = await this.usersRepository.findOne(userId);
    newTaskManager.Task = await this.tasksRepository.findOne(latestTask.Id);
    // Save the new task manager
    return await this.taskManagerRepository.save(newTaskManager);
  }

  async updateTask(taskId: number, taskDTO: TaskDTO): Promise<any> {
    // Get the updated task details from the DTO
    const { name, date_creation, date_due, description, priority } = taskDTO;
    // Find the task to update, using taskId
    const task = await this.tasksRepository.findOne(taskId);
    // Update the task details
    task.Name = name;
    task.DateCreation = date_creation;
    task.DateDue = date_due;
    task.Description = description;
    task.Priority = priority;
    // Save the updated task
    return await this.tasksRepository.save(task);
  }

  async removeTask(taskId: number): Promise<any> {
    // Delete the task from Task Manager, using taskId
    await this.taskManagerRepository.delete(taskId);
    // Delete the task from Tasks, using taskId
    return await this.tasksRepository.delete(taskId);
  }
}
