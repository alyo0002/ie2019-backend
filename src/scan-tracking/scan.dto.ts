import { ApiModelProperty } from '@nestjs/swagger';

export class ScanDTO {
  @ApiModelProperty()
  readonly scanTypeId: number;
  @ApiModelProperty()
  readonly appointmentId: number;
  @ApiModelProperty()
  readonly userId: number;
  @ApiModelProperty()
  readonly attachment: Buffer;
}
