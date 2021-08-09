import { PartialType } from '@nestjs/swagger';
import { ListDto } from '@common/model';

export class ListTodoDto extends PartialType(ListDto) {}
