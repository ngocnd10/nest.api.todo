import { UserController } from '@api/user';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateUserDto, UserDto } from '@api/user/dto';

const mockUser = {
  id: 'someId',
  username: 'Ariel',
};

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: async () => mockUser as UserDto,
          },
        },
      ],
    }).compile();

    userController = module.get(UserController);
  });

  describe('create', () => {
    it('execute CreateUserCommand and returns the result', async () => {
      const dto = { username: 'Ariel' } as CreateUserDto;
      const result = await userController.create(dto);
      expect(result).toEqual(mockUser);
    });
  });
});
