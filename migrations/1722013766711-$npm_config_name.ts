import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1722013766711 implements MigrationInterface {
    name = ' $npmConfigName1722013766711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_bd35868062b335687154b58ed37"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "count"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "is_in_stock"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "quantity" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "is_in_stock" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "status" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_bd35868062b335687154b58ed37" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
