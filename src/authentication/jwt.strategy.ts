import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadInterface } from './interface/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt-secret-1231!',
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const user = await this.usersService.getUserByEmail(payload.emailaddress);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    return user;
  }
}
