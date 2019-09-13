import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class PatientDTO {
  @ApiModelPropertyOptional()
  readonly lb_uuid: string;
  @ApiModelPropertyOptional()
  readonly title: string;
  @ApiModelPropertyOptional()
  readonly name_first: string;
  @ApiModelPropertyOptional()
  readonly name_last: string;
  @ApiModelPropertyOptional()
  readonly dob?: string;
  @ApiModelPropertyOptional()
  readonly id_number?: string;
  @ApiModelPropertyOptional()
  readonly gender?: string;
  @ApiModelPropertyOptional()
  readonly nationality?: string;
  @ApiModelPropertyOptional()
  readonly phone_home?: string;
  @ApiModelPropertyOptional()
  readonly phone_cell?: string;
  @ApiModelPropertyOptional()
  readonly phone_work?: string;
  @ApiModelPropertyOptional()
  readonly email?: string;
  @ApiModelPropertyOptional()
  readonly address_postal?: string;
  @ApiModelPropertyOptional()
  readonly address_physical?: string;
  @ApiModelPropertyOptional()
  readonly emergency_contact_id?: number;
  @ApiModelPropertyOptional()
  readonly family_doctor_id?: number;
}
