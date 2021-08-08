import { PartialType } from '@nestjs/swagger';
import { ListDto } from '../../../common';

export class ListTodoDto extends PartialType(ListDto) {}
