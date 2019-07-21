export class AddTaskDto {
  readonly id: number;
  readonly name: string;
  readonly date_creation: string;
  readonly date_due: string;
  readonly description: string;
  readonly priority: number;
}
