import { ApiModelProperty } from '@nestjs/swagger';

export class ScanDTO {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly name: string;
}
