import { IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiModelProperty()
  @IsString()
  username: string;
  @ApiModelProperty()
  @IsString()
  password: string;
}
