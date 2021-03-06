import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ERROR } from '@common/constant';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(ERROR.NO_DATA_SUBMITTED);
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(this.buildError(errors));
    }

    return value;
  }

  private buildError(errors: ValidationError[]): any {
    const details = errors.map(err => ({
      property: err.property,
      constraints: err.constraints,
    }));

    return {
      ...ERROR.VALIDATION_FAILED,
      details,
    };
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
