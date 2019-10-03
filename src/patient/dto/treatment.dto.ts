import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class TreatmentDTO {
  @ApiModelProperty()
  readonly patient_id: number;
  @ApiModelProperty()
  readonly phase: number;
}
