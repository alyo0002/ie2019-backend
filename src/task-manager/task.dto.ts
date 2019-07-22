import { ApiModelProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiModelProperty()
  readonly id: number;
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
}
