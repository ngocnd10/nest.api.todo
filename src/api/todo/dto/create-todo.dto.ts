import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString1In2Exist } from '../../../common';

export class CreateTodoDto {
  @ApiPropertyOptional()
  @IsString1In2Exist('body', {
    message: 'There is no definition of properties',
  })
  title: string;

  @ApiPropertyOptional()
  @IsString1In2Exist('title', {
    message: 'There is no definition of properties',
  })
  body: string;
}
