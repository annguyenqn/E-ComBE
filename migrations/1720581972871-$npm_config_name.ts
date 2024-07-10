import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720581972871 implements MigrationInterface {
    name = ' $npmConfigName1720581972871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "type" TO "gender"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parent_id" integer`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."products_gender_enum" AS ENUM('Male', 'Female', 'Unisex')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "gender" "public"."products_gender_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."products_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "gender" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "gender" TO "type"`);
    }

}
