import { ApiModelProperty } from '@nestjs/swagger';

export class FormTemplateDTO {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly formData: object;
}
