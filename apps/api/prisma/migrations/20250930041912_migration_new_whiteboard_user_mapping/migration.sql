-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "device_info" TEXT,
    "expires_at" BIGINT NOT NULL,
    "issued_at" BIGINT NOT NULL,
    "ip_address" TEXT,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."whiteboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "whiteboard_code" TEXT NOT NULL,

    CONSTRAINT "whiteboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."whiteboard-user" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "whiteboard_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whiteboard-user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_jti_key" ON "public"."refresh_tokens"("jti");

-- CreateIndex
CREATE UNIQUE INDEX "whiteboard-user_user_id_whiteboard_id_key" ON "public"."whiteboard-user"("user_id", "whiteboard_id");

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."whiteboard-user" ADD CONSTRAINT "whiteboard-user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."whiteboard-user" ADD CONSTRAINT "whiteboard-user_whiteboard_id_fkey" FOREIGN KEY ("whiteboard_id") REFERENCES "public"."whiteboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
