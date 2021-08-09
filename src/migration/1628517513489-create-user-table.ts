import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1628517513489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        SET search_path TO nest_service_todo;
        CREATE TABLE "user" (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          username varchar NOT NULL,
          password varchar NOT NULL,
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
