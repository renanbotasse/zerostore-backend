import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1718973625959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS public.migrations (
      user_id SERIAL PRIMARY KEY,
      timestamp BIGINT NOT NULL,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE public.user (
      user_id SERIAL PRIMARY KEY,
      role VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      salt VARCHAR NOT NULL,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      fiscal_number VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL,
      updated_at TIMESTAMP DEFAULT now() NOT NULL,
      deleted_at TIMESTAMP DEFAULT NULL,
      cart JSONB DEFAULT '[]',
      orders_id TEXT[]
    );

    CREATE SEQUENCE IF NOT EXISTS public.user_id_seq
      AS INTEGER
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

    ALTER TABLE public.user
      ALTER COLUMN user_id SET DEFAULT nextval('public.user_id_seq');
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE IF EXISTS public.user;
  `);
  }
}
