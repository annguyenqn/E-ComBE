import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720261859661 implements MigrationInterface {
    name = ' $npmConfigName1720261859661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "product_id" integer NOT NULL, "user_id" integer NOT NULL, "rating" integer, "comment" text, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "order_id" integer NOT NULL, "inventory_id" integer NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "order_id" integer NOT NULL, "amount" numeric(10,2) NOT NULL, "payment_method" character varying(50), "payment_status" character varying(50), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "order_id" integer NOT NULL, "shipping_address" text NOT NULL, "shipping_date" TIMESTAMP, "delivery_date" TIMESTAMP, "shipping_status" character varying(50), "tracking_number" character varying(50), "carrier" character varying(50), CONSTRAINT "PK_0dc6ac92ee9cbc2c1611d77804c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_history" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "order_id" integer NOT NULL, "status" character varying(50), CONSTRAINT "PK_cc71513680d03ecb01b96655b0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "status" character varying(10) NOT NULL, "total" numeric(10,2) NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "email" character varying, "password" character varying, "phone" character varying, "avatar" character varying, "hash_refresh_token" character varying, "hash_recovery_token" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "cart_id" integer NOT NULL, "inventory_id" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "product_id" integer NOT NULL, "color" character varying(30) NOT NULL, "sex" character varying(10) NOT NULL, "size" character varying(10) NOT NULL, "price" numeric(10,2) NOT NULL, "count" integer NOT NULL DEFAULT '0', "status" character varying(10) NOT NULL, "is_in_stock" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "product_code" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, "description" text, CONSTRAINT "UQ_70b3f77ca8de13149b7f08d725c" UNIQUE ("product_code"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("products_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_dd76d7031ca0318eaa95f76d553" PRIMARY KEY ("products_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c63c0b92c1cb3d1d6bba172155" ON "product_category" ("products_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2df1f83329c00e6eadde0493e1" ON "product_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_512bf776587ad5fc4f804277d76" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_16f64e06715ce4fea8257cc42c5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_bd35868062b335687154b58ed37" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f5221735ace059250daac9d9803" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "FK_a37456893780ce2dfe0a7484c22" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_history" ADD CONSTRAINT "FK_3e8ecdec907bbf6d4cceb3ab2a4" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b8b731410007312e41556497858" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_c63c0b92c1cb3d1d6bba1721557" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_2df1f83329c00e6eadde0493e16" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_2df1f83329c00e6eadde0493e16"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_c63c0b92c1cb3d1d6bba1721557"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_b8b731410007312e41556497858"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_history" DROP CONSTRAINT "FK_3e8ecdec907bbf6d4cceb3ab2a4"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "FK_a37456893780ce2dfe0a7484c22"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f5221735ace059250daac9d9803"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_bd35868062b335687154b58ed37"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_16f64e06715ce4fea8257cc42c5"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_512bf776587ad5fc4f804277d76"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2df1f83329c00e6eadde0493e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c63c0b92c1cb3d1d6bba172155"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_history"`);
        await queryRunner.query(`DROP TABLE "shipping"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
