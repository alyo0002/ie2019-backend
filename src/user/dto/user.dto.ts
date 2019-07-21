import { ApiModelProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly name_first: string;
  @ApiModelProperty()
  readonly name_last: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password_hash: string;
  @ApiModelProperty()
  readonly user_groups_id: number;
}
