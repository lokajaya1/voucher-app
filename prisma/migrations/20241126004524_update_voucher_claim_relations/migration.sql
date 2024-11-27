/*
  Warnings:

  - You are about to drop the column `created_at` on the `Voucher_Claim` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Voucher_Claim` table. All the data in the column will be lost.
  - You are about to drop the column `id_voucher` on the `Voucher_Claim` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_claim` on the `Voucher_Claim` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Voucher_Claim` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Voucher_Claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Voucher_Claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `Voucher_Claim` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Voucher_Claim` DROP FOREIGN KEY `Voucher_Claim_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `Voucher_Claim` DROP FOREIGN KEY `Voucher_Claim_id_voucher_fkey`;

-- AlterTable
ALTER TABLE `Voucher_Claim` DROP COLUMN `created_at`,
    DROP COLUMN `id_user`,
    DROP COLUMN `id_voucher`,
    DROP COLUMN `tanggal_claim`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `tanggalClaim` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `voucherId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Voucher_Claim` ADD CONSTRAINT `Voucher_Claim_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher_Claim` ADD CONSTRAINT `Voucher_Claim_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
