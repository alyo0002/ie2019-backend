import { ApiModelProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly date_creation: string;
  @ApiModelProperty()
  readonly date_due: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly priority: number;
  @ApiModelProperty()
  readonly assignee_user_id: number;
}
