import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1628517513489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        SET search_path TO nest_service_todo;
        CREATE TABLE "user" (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          "version" int4 NOT NULL,
          created_date timestamp NOT NULL DEFAULT now(),
          updated_date timestamp NOT NULL DEFAULT now(),
          created_by uuid NULL,
          updated_by uuid NULL,
          deleted_date timestamp NULL,
          username varchar NOT NULL,
          password varchar NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (username)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        SET search_path TO nest_service_todo;
        DROP TABLE "user";
    `);
  }
}
