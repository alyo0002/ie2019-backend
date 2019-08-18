import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormTemplate } from '../entities/form_template.entity';
import { FormTemplateDTO } from './form_template.dto';
import { Form } from '../entities/form.entity';
import { FormDTO } from './form.dto';
import { Appointment } from '../entities/appointment.entity';
import { Users } from '../entities/users.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FormTemplate)
    private formTemplateRepository: Repository<FormTemplate>,
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getAllTemplates(): Promise<any> {
    // Fetch all of the form templates
    return await this.formTemplateRepository.find();
  }

  async getFormTemplateById(formTemplateId: number): Promise<any> {
    // Fetch the template, using its Id
    return await this.formTemplateRepository.findOne(formTemplateId);
  }

  async createFormTemplate(formTemplateDTO: FormTemplateDTO): Promise<any> {
    try {
      // Get the form template details from the DTO
      const { name, formData } = formTemplateDTO;
      // Create the new form template object
      const newFormTemplate = new FormTemplate();
      newFormTemplate.Name = name;
      newFormTemplate.FormData = formData;
      // Save the new form template
      return await this.formTemplateRepository.save(newFormTemplate);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async editFormTemplate(formTemplateId: number, formTemplateDTO: FormTemplateDTO): Promise<any> {
    try {
      // Get the updated form template details from the DTO
      const { name, formData } = formTemplateDTO;
      // Find the form template to update, using formTemplateId
      const formTemplate = await this.formTemplateRepository.findOne(formTemplateId);
      // Update the form template details
      formTemplate.Name = name;
      formTemplate.FormData = formData;
      // Save the updated form template
      return await this.formTemplateRepository.save(formTemplate);
    } catch (e) {
      e.printStackTrace;
    }
  }

    async removeFormTemplate(formTemplateId: number): Promise<any> {
      try {
        // Delete the form template, using its Id.
        return await this.formTemplateRepository.delete(formTemplateId);
      } catch (e) {
        e.printStackTrace;
      }
  }

  async captureFormResponse(formDTO: FormDTO): Promise<any> {
    try {
      // Get the form details from the DTO
      const { formName, formData, appointmentId, formTemplateId } = formDTO;
      // Create the new form object
      const newForm = new Form();
      newForm.FormName = formName;
      newForm.FormData = formData;
      newForm.Appointment = await this.appointmentRepository.findOne(appointmentId);
      newForm.FormTemplate = await this.formTemplateRepository.findOne(formTemplateId);
      // Save the new form
      return await this.formRepository.save(newForm);
    } catch (e) {
      e.printStackTrace;
    }
  }

  async getAppointmentForms(appointmentId: number): Promise<any> {
    try {
      // Fetch the form(s) from the specific appointment
      return await this.formRepository
        .createQueryBuilder()
        .where('appointmentId = :appointmentId', { appointmentId })
        .getMany();
    } catch (e) {
      e.printStackTrace;
    }
  }
}
