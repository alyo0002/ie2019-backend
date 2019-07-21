import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  /*
   * TODO: Delete user
   * TODO: Forgotten password
   */

  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.getUsers();
  }

  @Get(':userID')
  async getUser(@Param('userID') userID) {
    return this.userService.getUser(userID);
  }

  @Post()
  async addUser(@Body() User: UserDTO) {
    return this.userService.addUser(User);
  }

  // TODO: Update specific userID
  @Put()
  async updateUser(@Body() User: UserDTO) {
    return this.userService.updateUser(User);
  }
}
