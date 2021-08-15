export interface GetTodoQueryProps {
  id: string;
}

export class GetTodoQuery {
  private constructor(readonly props: GetTodoQueryProps) {}

  static create(data: GetTodoQueryProps) {
    return new GetTodoQuery(data);
  }
}
