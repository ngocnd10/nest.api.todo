import { User } from '../entity';
import { UserRepository } from '../repository';

describe('UserRepository', () => {
  test('call this.save and returns the result', async () => {
    const repo = new UserRepository();
    const entity = new User();
    jest.spyOn(repo, 'create').mockReturnValue(entity);
    jest.spyOn(repo, 'save').mockResolvedValue(entity);
    const result = await repo.createUser({ username: 'Ariel' });
    expect(result).toBe(entity);
  });
});
