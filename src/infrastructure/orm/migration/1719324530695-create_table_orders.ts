import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOrder1719324530695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE public.order (
            order_id serial PRIMARY KEY,
            user_id int NOT NULL,
            address_id int NOT NULL,
            payment_id int NOT NULL,
            "date" timestamp without time zone DEFAULT now() NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            FOREIGN KEY (user_id) REFERENCES public.user(user_id),
            FOREIGN KEY (address_id) REFERENCES public.address(address_id),
            FOREIGN KEY (payment_id) REFERENCES public.payment(payment_id)
          );
    
          CREATE SEQUENCE public.order_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
    
          ALTER SEQUENCE public.order_id_seq OWNED BY public.payment.payment_id;
    
          ALTER TABLE ONLY public.order ALTER COLUMN order_id SET DEFAULT nextval('public.order_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE public.order;
        `);
    }
}
