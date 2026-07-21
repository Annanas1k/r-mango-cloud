-- CreateTable
CREATE TABLE "test1" (
    "id" UUID NOT NULL,
    "field" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test1_pkey" PRIMARY KEY ("id")
);
