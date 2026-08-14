-- CreateEnum
CREATE TYPE "StoragePlan" AS ENUM ('FREE', 'BASIC', 'PRO', 'BUSINESS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "storagePlan" "StoragePlan" NOT NULL DEFAULT 'FREE';
