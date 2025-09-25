/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."refresh_tokens" DROP CONSTRAINT "refresh_tokens_id_fkey";

-- AlterTable
ALTER TABLE "public"."refresh_tokens" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "deviceInfo" SET DATA TYPE TEXT,
ALTER COLUMN "revoked" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_userId_key" ON "public"."refresh_tokens"("userId");

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
