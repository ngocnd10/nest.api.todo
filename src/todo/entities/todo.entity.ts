import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/model/abstract.entity';

@Entity('todo')
export class Todo extends AbstractEntity {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  body: string;
}
