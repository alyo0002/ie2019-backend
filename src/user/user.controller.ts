import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

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
  async getUser(@Param('userID') userID: number) {
    return this.userService.getUser(userID);
  }

  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Put(':userID')
  async updateUser(
    @Param('userID') userID: number,
    @Body() user: UpdateUserDTO,
  ) {
    return this.userService.updateUser(userID, user);
  }
}
