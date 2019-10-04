import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get all users
   */
  @Get()
  async findAll() {
    return this.userService.getUsers();
  }

  /**
   * Get specific user
   * @param userID
   */
  @Get(':userID')
  async getUser(@Param('userID') userID: number) {
    return this.userService.getUser(userID);
  }

  /**
   * Create a new user
   * @param userDTO
   */
  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  /**
   * Update an existing user
   * @param userID
   * @param user
   */
  @Put(':userID')
  async updateUser(
    @Param('userID') userID: number,
    @Body() user: UpdateUserDTO,
  ) {
    return this.userService.updateUser(userID, user);
  }

  /**
   * Delete a user
   * @param userID
   */
  @Get('/delete/:userID')
  async deleteUser(@Param('userID') userID: number) {
    return this.userService.deleteUser(userID);
  }
}
