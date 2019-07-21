import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<any> {
    return await this.usersRepository.find();
  }

  async getUser(userID): Promise<any> {
    const id = Number(userID);
    return await this.usersRepository.findOne(id);
  }

  async addUser(user): Promise<any> {
    return await this.usersRepository.create(user);
  }

  async updateUser(userID, user): Promise<any> {
    return await this.usersRepository.update(userID, user);
  }
}
