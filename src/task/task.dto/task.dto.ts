import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateTaskDTO {

  @IsNotEmpty()
  title: string

  description: string
}

export class UpdateTaskDTO {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  title: string

  isCompleted: boolean

  description: string
}
