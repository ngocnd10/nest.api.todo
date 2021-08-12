import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity';
import { CreateUserDto } from '../dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const password = 'Abcd@1234';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username: username.toLowerCase(), password: hashedPassword });
    return await this.save(user);
  }
}
