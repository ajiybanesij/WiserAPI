-- CreateTable
CREATE TABLE "AirCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyType" TEXT NOT NULL,
    "foundedAt" TIMESTAMP(3) NOT NULL,
    "entityStatus" BOOLEAN NOT NULL DEFAULT true,
    "entityCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityUpdatedAt" TIMESTAMP(3),
    "entityDeletedAt" TIMESTAMP(3),

    CONSTRAINT "AirCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airplane" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "factorySerialNumber" TEXT NOT NULL,
    "numberOfFlights" INTEGER NOT NULL,
    "flightDistance" INTEGER NOT NULL,
    "fuelCapacity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "airCompanyId" TEXT NOT NULL,
    "entityStatus" BOOLEAN NOT NULL DEFAULT true,
    "entityCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityUpdatedAt" TIMESTAMP(3),
    "entityDeletedAt" TIMESTAMP(3),

    CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL,
    "flightStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "departureCountry" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "estimatedFlightTime" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "delayStartedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "airPlaneId" TEXT NOT NULL,
    "airCompanyId" TEXT NOT NULL,
    "entityStatus" BOOLEAN NOT NULL DEFAULT true,
    "entityCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityUpdatedAt" TIMESTAMP(3),
    "entityDeletedAt" TIMESTAMP(3),

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Airplane" ADD CONSTRAINT "Airplane_airCompanyId_fkey" FOREIGN KEY ("airCompanyId") REFERENCES "AirCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airCompanyId_fkey" FOREIGN KEY ("airCompanyId") REFERENCES "AirCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
