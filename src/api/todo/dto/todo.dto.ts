import { Expose } from 'class-transformer';
import { AbstractDto, BasePageable, BaseResponse } from '../../../common';
import { ApiProperty, ApiResponseProperty, PartialType } from '@nestjs/swagger';

export class TodoDto extends PartialType(AbstractDto) {
  @ApiResponseProperty()
  @Expose()
  title: string;

  @ApiResponseProperty()
  @Expose()
  body: string;
}

export class TodoPageable extends BasePageable<TodoDto> {
  @ApiProperty({
    isArray: true,
    type: TodoDto,
  })
  items: TodoDto[];
}

export class GetTodoPageableDto extends BaseResponse<TodoPageable> {
  @ApiProperty({ type: TodoPageable })
  data: TodoPageable;
}

export class GetToDoDto extends BaseResponse<TodoDto> {
  @ApiProperty({ type: TodoDto })
  data: TodoDto;
}
