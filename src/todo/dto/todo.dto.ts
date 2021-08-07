import { Expose } from 'class-transformer';
import { AbstractDto } from '../../common';

export class TodoDto extends AbstractDto {
  @Expose()
  title: string;

  @Expose()
  body: string;
}
