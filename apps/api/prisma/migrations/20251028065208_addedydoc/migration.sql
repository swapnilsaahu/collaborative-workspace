/*
  Warnings:

  - You are about to drop the column `coordinates` on the `whiteboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."whiteboard" DROP COLUMN "coordinates",
ADD COLUMN     "ydoc_encoded" BYTEA;
