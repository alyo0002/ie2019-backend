import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interface/jwt-payload.interface';
import { Users } from '../entities/users.entity';
import { stringify } from 'querystring';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(UserService)
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate the parsed authentication credentials dto
   * @param authCredentialsDto DTO to validate
   */
  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<Users> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.getUserByEmail(username);

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  /**
   * Generate a JWT token for the user
   * @param authCredentialsDto
   */
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    const user = await this.validateUser(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // payload for the token
    const payload: JwtPayloadInterface = { emailaddress: user.Email };
    const token = await this.jwtService.sign(payload);
    const firstName = user.NameFirst;
    const lastName = user.NameLast;
    const role = 'Admin';
    const id = user.Id;
    const username = user.Email;

    return { firstName, lastName, role, id, username, token };
  }
}
