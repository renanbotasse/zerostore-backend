import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableStatus1719322268293 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.payment_status (
            status_id integer NOT NULL,
            name character varying NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (status_id)
        );

        CREATE SEQUENCE public.payment_status_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.payment_status_id_seq OWNED BY public.payment_status.status_id;

        ALTER TABLE ONLY public.payment_status ALTER COLUMN status_id SET DEFAULT nextval('public.payment_status_id_seq'::regclass);
    `);
}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.payment_status;
      `);
  }
}
