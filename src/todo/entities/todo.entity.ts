import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../commons/abstract.entity';

@Entity('todo')
export class Todo extends AbstractEntity {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  body: string;
}
