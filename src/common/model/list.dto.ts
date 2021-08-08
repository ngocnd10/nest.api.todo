import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListDto {
  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ default: 10 })
  @IsInt()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderBy: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  keyword: string;
}
