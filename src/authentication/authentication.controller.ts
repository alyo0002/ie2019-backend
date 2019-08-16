import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.signIn(authCredentialsDto);
  }
}
