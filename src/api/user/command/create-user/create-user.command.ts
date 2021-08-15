export interface CreateUserCommandProps {
  username: string;
}

export class CreateUserCommand {
  private constructor(readonly props: CreateUserCommandProps) {}

  static create(data: CreateUserCommandProps) {
    return new CreateUserCommand(data);
  }
}
