/*
  Warnings:

  - You are about to drop the column `CustomerActivationCodesData` on the `CustomerActivationCodesData` table. All the data in the column will be lost.
  - Added the required column `customerActivationCode` to the `CustomerActivationCodesData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerActivationCodesData" DROP COLUMN "CustomerActivationCodesData",
ADD COLUMN     "customerActivationCode" TEXT NOT NULL;
