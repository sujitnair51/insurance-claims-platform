-- CreateTable
CREATE TABLE "Claim" (
    "id" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "claimType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);
