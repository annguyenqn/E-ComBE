import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720588848000 implements MigrationInterface {
    name = ' $npmConfigName1720588848000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_category" ("products_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_dd76d7031ca0318eaa95f76d553" PRIMARY KEY ("products_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c63c0b92c1cb3d1d6bba172155" ON "product_category" ("products_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2df1f83329c00e6eadde0493e1" ON "product_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_c63c0b92c1cb3d1d6bba1721557" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_2df1f83329c00e6eadde0493e16" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_2df1f83329c00e6eadde0493e16"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_c63c0b92c1cb3d1d6bba1721557"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2df1f83329c00e6eadde0493e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c63c0b92c1cb3d1d6bba172155"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
    }

}
