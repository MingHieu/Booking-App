/*
  Warnings:

  - You are about to drop the `access_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "access_token" DROP CONSTRAINT "access_token_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token" TEXT;

-- DropTable
DROP TABLE "access_token";
