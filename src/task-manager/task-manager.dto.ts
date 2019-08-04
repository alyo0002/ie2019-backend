import { ApiModelProperty } from '@nestjs/swagger';

export class TaskManagerDTO {
  @ApiModelProperty()
  readonly userId: number;
  @ApiModelProperty()
  readonly taskId: number;
}
