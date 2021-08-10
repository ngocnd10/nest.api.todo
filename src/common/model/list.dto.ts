import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListDto {
  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ default: 10 })
  @IsInt()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ default: 'createdDate' })
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiPropertyOptional({ default: 1 })
  @IsInt()
  @Min(-1)
  @Max(1)
  @IsOptional()
  orderBy: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  keyword: string;
}
