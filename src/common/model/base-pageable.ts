interface IProps<T> {
  items: T[];
}

export class BasePageable<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;

  constructor(props: IProps<T>) {
    this.items = props.items;
  }
}
