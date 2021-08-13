import { User } from '../entity';
import { UserRepository } from '../repository';

describe('UserRepository', () => {
  test('call this.save and returns the result', async () => {
    const repo = new UserRepository();
    const mockUser = {
      id: 'someId',
      username: 'Ariel',
    } as User;
    jest.spyOn(repo, 'create').mockReturnValue(mockUser);
    jest.spyOn(repo, 'save').mockResolvedValue(mockUser);
    const result = await repo.createUser({ username: 'Ariel' });
    expect(result).toEqual(mockUser);
  });
});
