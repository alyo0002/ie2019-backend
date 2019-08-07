import { ApiModelProperty } from '@nestjs/swagger';

export class ScanDTO {
  @ApiModelProperty()
  readonly name: string;
}
