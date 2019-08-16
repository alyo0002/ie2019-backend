import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { UserGroups } from '../entities/user-groups.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(UserGroups)
    private userGroupsRepository: Repository<UserGroups>,
  ) {}

  async getUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async getUser(userID: number): Promise<any> {
    return await this.usersRepository.findOne(userID);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { Email: email } });
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
    Logger.debug('Creating new user');
    Logger.debug(userDTO);

    const {
      email,
      name_first,
      name_last,
      password_hash,
      user_groups_id,
    } = userDTO;

    const userCheck = await this.usersRepository
      .createQueryBuilder()
      .where('Email = :email', { email })
      .getOne();
    Logger.debug('User check result');
    Logger.debug(userCheck);
    if (userCheck) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = new Users();
    newUser.Email = email;
    newUser.NameFirst = name_first;
    newUser.NameLast = name_last;
    newUser.PasswordHash = password_hash;
    newUser.UserGroups = await this.userGroupsRepository.findOne(
      user_groups_id,
    );

    Logger.debug('New User object');
    Logger.debug(newUser);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Something went wrong', errors },
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
