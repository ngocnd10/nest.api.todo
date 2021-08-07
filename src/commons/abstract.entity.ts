import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    name: 'created_date',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_date',
  })
  updatedDate: Date;

  @Column({
    name: 'created_by',
    nullable: true,
    type: 'uuid',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    nullable: true,
    type: 'uuid',
  })
  updatedBy: string;

  @DeleteDateColumn({
    name: 'deleted_date',
  })
  deletedDate: Date;
}
