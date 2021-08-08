import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty()
  id: string;
}
