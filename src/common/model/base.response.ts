import { BasePageable } from './base.pageable';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  apiUrl: string;
  data: T | BasePageable<T>;
  @ApiProperty()
  environment: string;
  @ApiProperty()
  isSuccess: boolean;
  @ApiProperty()
  message: string;
  @ApiProperty()
  permissionCode: string;
  @ApiProperty()
  requestId: string;
  @ApiProperty()
  service: string;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  version: string;
  error: any;
}
