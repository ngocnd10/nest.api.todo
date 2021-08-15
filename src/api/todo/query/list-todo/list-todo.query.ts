export interface ListTodoQueryProps {
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: number;
  keyword?: string;
}

export class ListTodoQuery {
  private constructor(readonly props: ListTodoQueryProps) {}

  static create(data: ListTodoQueryProps) {
    return new ListTodoQuery(data);
  }
}
