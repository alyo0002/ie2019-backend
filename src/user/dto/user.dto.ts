import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
  @ApiModelProperty()
  readonly name_first: string;
  @ApiModelProperty()
  readonly name_last: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password_hash: string;
  @ApiModelPropertyOptional()
  readonly user_groups_id?: number;
}
