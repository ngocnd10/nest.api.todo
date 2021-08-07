import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTodoTable1628327813349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE nest_service_todo.todo (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          "version" int4 NOT NULL,
          created_date timestamp NOT NULL DEFAULT now(),
          updated_date timestamp NOT NULL DEFAULT now(),
          created_by uuid NULL,
          updated_by uuid NULL,
          deleted_date timestamp NULL,
          title varchar NOT NULL,
          body varchar NULL,
          PRIMARY KEY (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE nest_service_todo.todo;
    `);
  }
}