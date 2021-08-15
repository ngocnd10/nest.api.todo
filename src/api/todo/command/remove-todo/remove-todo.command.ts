export interface RemoveTodoCommandProps {
  id: string;
}

export class RemoveTodoCommand {
  private constructor(readonly props: RemoveTodoCommandProps) {}

  static create(data: RemoveTodoCommandProps) {
    return new RemoveTodoCommand(data);
  }
}
