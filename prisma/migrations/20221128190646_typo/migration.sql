-- DropForeignKey
ALTER TABLE "Airplane" DROP CONSTRAINT "Airplane_airCompanyId_fkey";

-- AlterTable
ALTER TABLE "Airplane" ALTER COLUMN "airCompanyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Airplane" ADD CONSTRAINT "Airplane_airCompanyId_fkey" FOREIGN KEY ("airCompanyId") REFERENCES "AirCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;
