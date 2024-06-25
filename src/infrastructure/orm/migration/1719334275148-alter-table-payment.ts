import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePayment1719334275148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                alter table public.payment alter column amount_payments drop not null;
            `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            `);
      }
}
