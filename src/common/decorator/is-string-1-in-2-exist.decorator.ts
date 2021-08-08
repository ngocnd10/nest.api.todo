import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsString1In2Exist(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsString1In2ExistConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isString1In2Exist' })
export class IsString1In2ExistConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (value && typeof value !== 'string') {
      return false;
    }
    if (relatedValue && typeof relatedValue !== 'string') {
      return false;
    }
    return value || relatedValue;
  }
}
