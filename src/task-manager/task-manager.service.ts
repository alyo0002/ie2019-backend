import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from './task.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class TaskManagerService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async fetchMyTasks(userId: number): Promise<any> {
    /* Get all of the tasks assigned to the user,
    including the tasks assigned by the user to himself/herself.*/
    try {
      return await this.taskRepository
        .createQueryBuilder()
        .where('assignee_user_id = :userId', { userId })
        .orderBy('date_due', 'ASC')
        .addOrderBy('priority', 'DESC')
        .getMany();
    } catch (e) {
      e.printStackTrace;
    }
  }

  async fetchAssignedTasks(userId: number): Promise<any> {
    /* Get all of the tasks assigned by the user,
    except for the tasks assigned by the user to himself/herself.*/
    try {
      return await this.taskRepository
        .createQueryBuilder()
        .where('assigner_user_id = :userId AND assignee_user_id != :userId', {
          userId,
        })
        .orderBy('date_due', 'ASC')
        .addOrderBy('priority', 'DESC')
        .getMany();
    } catch (e) {
      e.printStackTrace;
    }
  }

  async addTask(userId: number, taskDTO: TaskDTO): Promise<any> {
    try {
      // Get the task details from the DTO
      const {
        name,
        date_creation,
        date_due,
        description,
        priority,
        assignee_user_id,
      } = taskDTO;
      // Create the new task object
      const newTask = new Task();
      newTask.Name = name;
      newTask.DateCreation = date_creation;
      newTask.DateDue = date_due;
      newTask.Description = description;
      newTask.Priority = priority;
      newTask.AssigneeUser = await this.usersRepository.findOne(
        assignee_user_id,
      );
      newTask.AssignerUser = await this.usersRepository.findOne(userId);
      // Save the new task
      return await this.taskRepository.save(newTask);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async updateTask(taskId: number, taskDTO: TaskDTO): Promise<any> {
    try {
      // Get the updated task details from the DTO
      const {
        name,
        date_creation,
        date_due,
        description,
        priority,
        assignee_user_id,
      } = taskDTO;
      // Find the task to update, using taskId
      const task = await this.taskRepository.findOne(taskId);
      // Update the task details
      task.Name = name;
      task.DateCreation = date_creation;
      task.DateDue = date_due;
      task.Description = description;
      task.Priority = priority;
      task.AssigneeUser = await this.usersRepository.findOne(assignee_user_id);
      // Save the updated task
      return await this.taskRepository.save(task);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async removeTask(taskId: number): Promise<any> {
    try {
      return await this.taskRepository.delete(taskId);
    } catch (e) {
      e.printStackTrace;
    }
  }
}
