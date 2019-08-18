import { ApiModelProperty } from '@nestjs/swagger';

export class FormDTO {
  @ApiModelProperty()
  readonly formName: string;
  @ApiModelProperty()
  readonly formData: object;
  @ApiModelProperty()
  readonly appointmentId: number;
  @ApiModelProperty()
  readonly formTemplateId: number;
}
