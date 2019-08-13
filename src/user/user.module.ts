import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { UserGroups } from '../entities/user-groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserGroups])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
