import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity';
import { AuthCredentialDto } from '../dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { password, username } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException({
          message: 'Username already exists',
          error: 'Conflict',
        });
      }
      throw error;
    }

    await this.save(user);
  }
}
