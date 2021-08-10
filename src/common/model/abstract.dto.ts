import { Expose } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

export class AbstractDto {
  @ApiResponseProperty()
  @Expose()
  id: string;

  @ApiResponseProperty()
  @Expose()
  createdDate: Date;

  @ApiResponseProperty()
  @Expose()
  updatedDate: Date;
}
