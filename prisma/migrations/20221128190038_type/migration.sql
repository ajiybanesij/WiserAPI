/*
  Warnings:

  - Made the column `createdAt` on table `Flight` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Flight" ALTER COLUMN "startedAt" DROP NOT NULL,
ALTER COLUMN "endedAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;
