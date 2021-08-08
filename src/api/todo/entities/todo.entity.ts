import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common';

@Entity('todo')
export class Todo extends AbstractEntity {
  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  body: string;
}
