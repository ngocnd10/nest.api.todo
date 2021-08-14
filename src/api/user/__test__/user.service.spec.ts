import { Test } from '@nestjs/testing';
import { AppLog } from '@shared/app-log';
import { UserService } from '../user.service';
import { UserRepository } from '../repository';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockAppLog = () => ({
  setContextAndFileName: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository;
  let appLog: AppLog;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: AppLog, useFactory: mockAppLog },
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(UserRepository);
    appLog = module.get(AppLog);

    appLog.setContextAndFileName('UserService', 'user.service.ts');
  });

  describe('findByUsername', () => {
    it('calls UserRepository.findByUsername and returns the result', async () => {
      const mockUser = {
        id: 'someId',
        username: 'Ariel',
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await userService.findByUsername('Ariel');
      expect(result).toEqual(mockUser);
    });
  });
});
