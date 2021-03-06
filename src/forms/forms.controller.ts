import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormTemplateDTO } from './form_template.dto';
import { FormDTO } from './form.dto';

@Controller('forms')
export class FormsController {
  constructor(private formService: FormsService) {}

  /**
   * Get all of the form templates
   */
  @Get()
  async getAllTemplates() {
    return this.formService.getAllTemplates();
  }

  /**
   * Get a specific form template
   * @param formTemplateId
   */
  @Get(':formTemplateId')
  async getFormTemplateById(@Param('formTemplateId') formTemplateId: number) {
    return this.formService.getFormTemplateById(formTemplateId);
  }

  /**
   * Create form template.
   * @param formTemplateDTO
   */
  @Post()
  async createFormTemplate(@Body() formTemplateDTO: FormTemplateDTO) {
    return this.formService.createFormTemplate(formTemplateDTO);
  }

  /**
   * Edit form template.
   * @param formTemplateId
   * @param formTemplateDTO
   */
  @Put(':formTemplateId')
  async editFormTemplate(
    @Param('formTemplateId') formTemplateId: number,
    @Body() formTemplateDTO: FormTemplateDTO,
  ) {
    return this.formService.editFormTemplate(formTemplateId, formTemplateDTO);
  }

  /**
   * Remove a form template
   * @param formTemplateId
   */
  @Delete(':formTemplateId')
  async removeFormTemplate(@Param('formTemplateId') formTemplateId: number) {
    return this.formService.removeFormTemplate(formTemplateId);
  }

  /**
   * Save a filled-out form
   * @param formDTO
   */
  @Post()
  async captureFormResponse(@Body() formDTO: FormDTO) {
    return this.formService.captureFormResponse(formDTO);
  }

  /**
   * Get the form(s) from a specific appointment
   * @param appointmentId
   */
  @Get(':appointmentId')
  async getAppointmentForms(@Param('appointmentId') appointmentId: number) {
    return this.formService.getAppointmentForms(appointmentId);
  }
}
