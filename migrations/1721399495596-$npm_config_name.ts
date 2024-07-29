import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1721399495596 implements MigrationInterface {
    name = ' $npmConfigName1721399495596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "color"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" ADD "color" character varying(30) NOT NULL`);
    }

}
