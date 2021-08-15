export interface UpdateTodoCommandProps {
  id: string;
  title?: string;
  body?: string;
  updatedBy?: string;
}

export class UpdateTodoCommand {
  private constructor(readonly props: UpdateTodoCommandProps) {}

  static create(data: UpdateTodoCommandProps) {
    return new UpdateTodoCommand(data);
  }
}
