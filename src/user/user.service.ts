import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { DeleteResult, getRepository, Repository, UpdateResult } from 'typeorm';
import { User } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async getUser(userID: number): Promise<any> {
    return await this.usersRepository.findOne(userID);
  }

  async updateUser(
    userID: number,
    userDTO: UpdateUserDTO,
  ): Promise<Users & UpdateUserDTO> {
    Logger.debug('Updating user: ' + userID);
    const toUpdate = await this.usersRepository.findOne(userID);
    Logger.debug('Found user object: ' + toUpdate);
    delete toUpdate.PasswordHash;

    const updatedUser = Object.assign(toUpdate, userDTO);
    return await this.usersRepository.save(updatedUser);
  }

  async createUser(userDTO: UserDTO): Promise<any> {
    Logger.debug('Creating user: ' + userDTO.email);

    const { email, name_first, name_last, password_hash } = userDTO;

    const query = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('user_groups_id', 'users')
      .where('users.email = :email', { email });
    const user = await query.getOne();
    if (user) {
      const error = {
        email: 'Email address currently exists within the database',
      };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new Users();
    newUser.Email = email;
    newUser.NameFirst = name_first;
    newUser.NameLast = name_last;
    newUser.PasswordHash = password_hash;

    Logger.debug('New User: ' + newUser);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Whoops', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.usersRepository.save(newUser);
    }
  }

  async deleteUser(userID: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(userID);
  }
}
