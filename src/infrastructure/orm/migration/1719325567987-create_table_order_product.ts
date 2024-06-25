import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOrderProduct1719325567987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE public.order_products (
            order_products_id serial PRIMARY KEY,
            order_id int NOT NULL,
            product_ref int NOT NULL,
            quantity int NOT NULL,
            price int NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            FOREIGN KEY (order_id) REFERENCES public.order(order_id)
          );
    
          CREATE SEQUENCE public.order_products_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
    
          ALTER SEQUENCE public.order_products_id_seq OWNED BY public.order_products.order_products_id;
    
          ALTER TABLE ONLY public.order_products ALTER COLUMN order_id SET DEFAULT nextval('public.order_products_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE public.order_products;
        `);
    }
}
