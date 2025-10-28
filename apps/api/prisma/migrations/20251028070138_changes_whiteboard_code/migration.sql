/*
  Warnings:

  - A unique constraint covering the columns `[whiteboard_code]` on the table `whiteboard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."whiteboard" ALTER COLUMN "whiteboard_code" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "whiteboard_whiteboard_code_key" ON "public"."whiteboard"("whiteboard_code");
