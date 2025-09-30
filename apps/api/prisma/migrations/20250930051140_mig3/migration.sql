/*
  Warnings:

  - You are about to drop the `whiteboard-user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."whiteboard-user" DROP CONSTRAINT "whiteboard-user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."whiteboard-user" DROP CONSTRAINT "whiteboard-user_whiteboard_id_fkey";

-- DropTable
DROP TABLE "public"."whiteboard-user";

-- CreateTable
CREATE TABLE "public"."whiteboard_user" (
    "user_id" TEXT NOT NULL,
    "whiteboard_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whiteboard_user_pkey" PRIMARY KEY ("user_id","whiteboard_id")
);

-- AddForeignKey
ALTER TABLE "public"."whiteboard_user" ADD CONSTRAINT "whiteboard_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."whiteboard_user" ADD CONSTRAINT "whiteboard_user_whiteboard_id_fkey" FOREIGN KEY ("whiteboard_id") REFERENCES "public"."whiteboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
