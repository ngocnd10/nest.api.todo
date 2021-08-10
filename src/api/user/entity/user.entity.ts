import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '@common/model';

@Entity('user')
export class User extends AbstractEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
