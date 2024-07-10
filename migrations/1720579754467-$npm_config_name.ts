import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720579754467 implements MigrationInterface {
    name = ' $npmConfigName1720579754467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_4c9fb58de893725258746385e16"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    }

}
