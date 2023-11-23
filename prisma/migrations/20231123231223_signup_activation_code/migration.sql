-- CreateTable
CREATE TABLE "CustomerActivationCodesData" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "customerActivationCode" TEXT NOT NULL,
    "activationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerActivationCodesData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerActivationCodesData_id_key" ON "CustomerActivationCodesData"("id");

-- AddForeignKey
ALTER TABLE "CustomerActivationCodesData" ADD CONSTRAINT "CustomerActivationCodesData_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
