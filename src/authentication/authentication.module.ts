import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { AuthenticationController } from './authentication.controller';
import { UserService } from '../user/user.service';
import { UserGroups } from '../entities/user_groups.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserGroups]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      // TODO: Change to something secure at some point
      secret: 'jwt-secret-1231!',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule],
  providers: [AuthenticationService, JwtStrategy, UserService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
