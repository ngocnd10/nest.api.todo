import { CreateUserDto } from '../../dto';

export class CreateUserCommand {
  constructor(public readonly props: CreateUserDto) {}
}
