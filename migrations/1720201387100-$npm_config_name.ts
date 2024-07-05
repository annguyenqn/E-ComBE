import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720201387100 implements MigrationInterface {
    name = ' $npmConfigName1720201387100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "email" character varying, "password" character varying, "phone" character varying, "avatar" character varying, "hash_refresh_token" character varying, "hash_recovery_token" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
