import { CreateTodoDto } from '../../dto';

export class CreateTodoCommand {
  constructor(public readonly props: CreateTodoDto) {}
}
