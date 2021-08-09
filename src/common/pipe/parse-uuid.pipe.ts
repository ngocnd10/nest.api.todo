import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (!isUUID(value)) {
      throw new BadRequestException({
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
      });
    }
    return value;
  }
}
