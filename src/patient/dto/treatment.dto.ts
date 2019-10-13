import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

/**
 * Treatment Data Transfer Object
 */
export class TreatmentDTO {
  @ApiModelProperty()
  readonly patient_id: number;
  @ApiModelProperty()
  readonly phase: number;
}
