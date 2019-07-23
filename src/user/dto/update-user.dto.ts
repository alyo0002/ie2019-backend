import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiModelPropertyOptional()
  readonly name_first?: string;
  @ApiModelPropertyOptional()
  readonly name_last?: string;
  @ApiModelPropertyOptional()
  readonly email?: string;
  @ApiModelPropertyOptional()
  readonly password_hash?: string;
  @ApiModelPropertyOptional()
  readonly user_groups_id?: number;
}
