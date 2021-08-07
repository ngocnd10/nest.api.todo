import { BasePageable } from './base-pageable';

export class BaseResponse<T> {
  apiUrl: string;
  data: T | BasePageable<T>;
  environment: string;
  isSuccess: boolean;
  message: string;
  permissionCode: string;
  requestId: string;
  service: string;
  statusCode: number;
  version: string;
}
