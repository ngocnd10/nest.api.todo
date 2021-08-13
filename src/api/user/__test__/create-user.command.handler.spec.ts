import { UserRepository } from '@api/user';
import { AppLog } from '@shared/app-log';
import { Test } from '@nestjs/testing';
import { CreateUserHandler } from '@api/user/command/create-user/create-user.command.handler';
import { CreateUserCommand } from '@api/user/command';
import { ConflictException } from '@nestjs/common';

const mockUserRepository = () => ({
  createUser: jest.fn(),
});

const mockAppLog = () => ({
  setContextAndFileName: jest.fn(),
});

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let userRepository;
  let appLog: AppLog;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: AppLog, useFactory: mockAppLog },
      ],
    }).compile();

    handler = module.get(CreateUserHandler);
    userRepository = module.get(UserRepository);
    appLog = module.get(AppLog);

    appLog.setContextAndFileName('UserService', 'user.service.ts');
  });

  describe('execute', () => {
    it('calls UserRepository.createUser and returns the result', async () => {
      const mockUser = {
        id: 'someId',
        username: 'Ariel',
      };

      userRepository.createUser.mockResolvedValue(mockUser);
      const command = new CreateUserCommand({ username: 'Ariel' });
      const result = await handler.execute(command);
      expect(result).toEqual(mockUser);
    });

    it('calls UserRepository.createUser and throw ConflictException', async () => {
      const mockError = {
        code: '23505',
      };

      userRepository.createUser.mockImplementation(() => {
        throw mockError;
      });
      const command = new CreateUserCommand({ username: 'Ariel' });
      try {
        await handler.execute(command);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('calls UserRepository.createUser and throw err', async () => {
      const mockError = {
        stack: 'err',
      };

      userRepository.createUser.mockImplementation(() => {
        throw mockError;
      });
      const command = new CreateUserCommand({ username: 'Ariel' });
      try {
        await handler.execute(command);
      } catch (error) {
        expect(error.stack).toEqual('err');
      }
    });
  });
});