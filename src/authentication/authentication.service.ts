import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interface/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await user.validatePassword(password))) {
      return user.Email;
    } else {
      return null;
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const emailaddress = await this.validateUser(authCredentialsDto);

    if (!emailaddress) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // payload for the token
    const payload: JwtPayloadInterface = { emailaddress };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
