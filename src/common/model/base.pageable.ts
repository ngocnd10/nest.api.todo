import { ApiProperty } from '@nestjs/swagger';

export class BasePageable<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  constructor(items: T[], page: number, limit: number, total: number) {
    this.items = items;
    this.page = page;
    this.limit = limit;
    this.total = total;
  }
}
