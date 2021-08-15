export interface CreateTodoCommandProps {
  title?: string;
  body?: string;
  createdBy?: string;
}

export class CreateTodoCommand {
  private constructor(readonly props: CreateTodoCommandProps) {}

  static create(data: CreateTodoCommandProps) {
    return new CreateTodoCommand(data);
  }
}
