import { BasePageable } from './base.pageable';
import { ApiProperty } from '@nestjs/swagger';

class ErrorInfo {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

export class BaseResponse<T> {
  @ApiProperty()
  apiUrl: string;

  data: T | BasePageable<T>;

  @ApiProperty()
  environment: string;

  @ApiProperty({ default: true })
  isSuccess: boolean;

  @ApiProperty({ default: 'Success' })
  message: string;

  @ApiProperty()
  permissionCode: string;

  @ApiProperty()
  requestId: string;

  @ApiProperty()
  service: string;

  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  version: string;

  @ApiProperty({ type: ErrorInfo })
  error: ErrorInfo;
}
