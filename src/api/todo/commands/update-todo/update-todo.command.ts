import { UpdateTodoDto } from '../../dto';

export class UpdateTodoCommand {
  constructor(
    public readonly id: string,
    public readonly props: UpdateTodoDto,
  ) {}
}
