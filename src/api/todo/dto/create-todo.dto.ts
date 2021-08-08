import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  body: string;
}
