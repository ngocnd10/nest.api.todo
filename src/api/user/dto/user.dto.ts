import { ApiProperty, ApiResponseProperty, PartialType } from '@nestjs/swagger';
import { AbstractDto, BasePageable, BaseResponse } from '@common/model';
import { Expose } from 'class-transformer';

export class UserDto extends PartialType(AbstractDto) {
  @ApiResponseProperty()
  @Expose()
  username: string;
}

export class UserDtoPageable extends BasePageable<UserDto> {
  @ApiProperty({
    isArray: true,
    type: UserDto,
  })
  items: UserDto[];
}

export class GetListUserDto extends BaseResponse<UserDtoPageable> {
  @ApiProperty({ type: UserDtoPageable })
  data: UserDtoPageable;
}

export class GetUserDto extends BaseResponse<UserDto> {
  @ApiProperty({ type: UserDto })
  data: UserDto;
}
