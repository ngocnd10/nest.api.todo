import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1628326146270 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        SET search_path TO nest_service_todo;
        CREATE FUNCTION uuid_generate_v4() returns uuid
        AS $$ SELECT uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::cstring);SELECT uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::cstring) $$
            LANGUAGE SQL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        SET search_path TO nest_service_todo;
        DROP FUNCTION uuid_generate_v4();
    `);
  }
}
