-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_key" ON "urls"("url");
