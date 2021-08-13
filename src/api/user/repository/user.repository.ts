import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity';
import { CreateUserDto } from '../dto';
import { HashHelper } from '@helper';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const password = 'Abcd@1234';
    const hashedPassword = await HashHelper.encrypt(password);
    const user = this.create({ username: username.toLowerCase(), password: hashedPassword });
    return await this.save(user);
  }
}
