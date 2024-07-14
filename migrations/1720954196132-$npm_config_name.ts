import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720954196132 implements MigrationInterface {
    name = ' $npmConfigName1720954196132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_tags_tags" ("products_id" integer NOT NULL, "tags_id" integer NOT NULL, CONSTRAINT "PK_579a736c980c9f83139c8aeea18" PRIMARY KEY ("products_id", "tags_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_74a110a383fa6af0134b42b025" ON "products_tags_tags" ("products_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_140153f61375624311da8ba281" ON "products_tags_tags" ("tags_id") `);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "sex"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_70b3f77ca8de13149b7f08d725c"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_code"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."products_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sku" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku")`);
        await queryRunner.query(`ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_74a110a383fa6af0134b42b0250" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_140153f61375624311da8ba2816" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_tags_tags" DROP CONSTRAINT "FK_140153f61375624311da8ba2816"`);
        await queryRunner.query(`ALTER TABLE "products_tags_tags" DROP CONSTRAINT "FK_74a110a383fa6af0134b42b0250"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
        await queryRunner.query(`CREATE TYPE "public"."products_gender_enum" AS ENUM('Male', 'Female', 'Unisex')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "gender" "public"."products_gender_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_code" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_70b3f77ca8de13149b7f08d725c" UNIQUE ("product_code")`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "sex" character varying(10) NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_140153f61375624311da8ba281"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74a110a383fa6af0134b42b025"`);
        await queryRunner.query(`DROP TABLE "products_tags_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
