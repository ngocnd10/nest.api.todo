import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty()
  @IsUUID()
  id: string;

  updatedBy: string;
}
