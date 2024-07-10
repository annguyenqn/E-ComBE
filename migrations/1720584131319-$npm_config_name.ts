import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720584131319 implements MigrationInterface {
    name = ' $npmConfigName1720584131319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "parent_id" integer`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parent_id"`);
    }

}
