import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListDto {
  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ default: 10 })
  @IsNumber()
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
