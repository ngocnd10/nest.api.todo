import { Expose } from 'class-transformer';

export class AbstractDto {
  @Expose()
  id: string;
}
