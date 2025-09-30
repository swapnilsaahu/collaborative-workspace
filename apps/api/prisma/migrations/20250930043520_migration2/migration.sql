/*
  Warnings:

  - The primary key for the `refresh_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `refresh_tokens` table. All the data in the column will be lost.
  - The primary key for the `whiteboard-user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `whiteboard-user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."refresh_tokens_jti_key";

-- DropIndex
DROP INDEX "public"."whiteboard-user_user_id_whiteboard_id_key";

-- AlterTable
ALTER TABLE "public"."refresh_tokens" DROP CONSTRAINT "refresh_tokens_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("jti");

-- AlterTable
ALTER TABLE "public"."whiteboard-user" DROP CONSTRAINT "whiteboard-user_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "whiteboard-user_pkey" PRIMARY KEY ("user_id", "whiteboard_id");
