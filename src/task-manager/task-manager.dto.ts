import { ApiModelProperty } from '@nestjs/swagger';

export class TaskManagerDTO {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  taskId: number;
}
