import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import {
  DeleteResult,
  getConnection,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { UserGroups } from '../entities/user-groups.entity';

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
    Logger.debug('Creating new user');
    Logger.debug(userDTO);

    const {
      email,
      name_first,
      name_last,
      password_hash,
      user_groups_id,
    } = userDTO;
    // const userCheck = await getConnection()
    //   .createQueryBuilder()
    //   .relation(Users, 'UserGroups')
    //   .of(userDTO)
    //   .loadOne();
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
    newUser.UserGroupsId = Number(await getConnection()
      .createQueryBuilder(UserGroups, 'UserGroups')
      .select('id')
      .where('id = :id', {id: user_groups_id}).getOne());

    Logger.debug('New User: ');
    Logger.debug(newUser);

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
