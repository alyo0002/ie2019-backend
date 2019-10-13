import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Scan Data Transfer Object
 */
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
