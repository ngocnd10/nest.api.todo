export class BasePageable<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
