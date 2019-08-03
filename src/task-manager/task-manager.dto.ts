import { ApiModelProperty } from '@nestjs/swagger';

export class TaskManagerDTO {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly userId: number;
  @ApiModelProperty()
  readonly taskId: number;
}
