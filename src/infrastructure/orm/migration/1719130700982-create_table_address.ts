import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1719130700982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.address (
        address_id integer NOT NULL,
        user_id integer NOT NULL,
        street character varying,
        complement character varying,
        number integer NOT NULL,
        zip_code character varying NOT NULL,
        city character varying NOT NULL,
        state character varying NOT NULL,
        country character varying NOT NULL,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL,
        deleted_at TIMESTAMP DEFAULT NULL,
        primary key (address_id),
        FOREIGN KEY (user_id) REFERENCES public.user(user_id)
      );

      CREATE SEQUENCE public.address_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;

      ALTER SEQUENCE public.address_id_seq OWNED BY public.address.address_id;

      ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.address;
    `);
  }
}
