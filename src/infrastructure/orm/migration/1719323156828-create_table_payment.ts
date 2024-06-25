import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePayment1719323156828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE public.payment (
            payment_id integer NOT NULL,
            status_id int NOT NULL,
            price double precision NOT NULL,
            discount double precision NOT NULL,
            final_price double precision NOT NULL,
            "type" character varying NOT NULL,
            amount_payments int NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (payment_id),
            FOREIGN KEY (status_id) REFERENCES public.payment_status(status_id)
          );
    
          CREATE SEQUENCE public.payment_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
    
          ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.payment_id;
    
          ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE public.payment;
        `);
    }
}
