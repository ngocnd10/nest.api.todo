import { Expose } from 'class-transformer';
import { ApiProperty, ApiResponseProperty, PartialType } from '@nestjs/swagger';
import { AbstractDto, BasePageable, BaseResponse } from '@common/model';

export class TodoDto extends PartialType(AbstractDto) {
  @ApiResponseProperty()
  @Expose()
  title: string;

  @ApiResponseProperty()
  @Expose()
  body: string;
}

export class TodoDtoPageable extends BasePageable<TodoDto> {
  @ApiProperty({
    isArray: true,
    type: TodoDto,
  })
  items: TodoDto[];
}

export class GetListTodoDto extends BaseResponse<TodoDtoPageable> {
  @ApiProperty({ type: TodoDtoPageable })
  data: TodoDtoPageable;
}

export class GetToDoDto extends BaseResponse<TodoDto> {
  @ApiProperty({ type: TodoDto })
  data: TodoDto;
}
