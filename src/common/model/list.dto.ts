import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListDto {
  @ApiPropertyOptional({ default: 0 })
  page: number;

  @ApiPropertyOptional({ default: 10 })
  limit: number;

  @ApiPropertyOptional()
  sortBy: string;

  @ApiPropertyOptional()
  orderBy: string;

  @ApiPropertyOptional()
  keyword: string;
}
