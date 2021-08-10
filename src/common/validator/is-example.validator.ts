import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// @IsExample()

export function IsExample(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isExample',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // logic here
          return true;
        },
      },
    });
  };
}
