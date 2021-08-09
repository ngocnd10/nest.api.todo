import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)) {
            return true;
          }
          throw new BadRequestException({
            message: 'Password is too weak',
            error: 'Bad Request',
          });
        },
      },
    });
  };
}
