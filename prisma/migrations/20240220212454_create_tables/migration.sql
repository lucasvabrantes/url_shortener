-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "newUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_key" ON "urls"("url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_newUrl_key" ON "urls"("newUrl");
