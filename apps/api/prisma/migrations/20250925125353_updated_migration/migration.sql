-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" SERIAL NOT NULL,
    "jti" TEXT NOT NULL,
    "deviceInfo" JSONB,
    "expiresAt" INTEGER NOT NULL,
    "issuedAt" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "revoked" BOOLEAN NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_jti_key" ON "public"."refresh_tokens"("jti");

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
