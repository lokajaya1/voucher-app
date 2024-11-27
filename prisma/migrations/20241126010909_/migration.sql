/*
  Warnings:

  - A unique constraint covering the columns `[voucherId,userId]` on the table `Voucher_Claim` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Voucher_Claim_voucherId_userId_key` ON `Voucher_Claim`(`voucherId`, `userId`);
