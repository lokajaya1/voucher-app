/*
  Warnings:

  - Added the required column `id_user` to the `Voucher_Claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Voucher_Claim` ADD COLUMN `id_user` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'claimed';

-- AddForeignKey
ALTER TABLE `Voucher_Claim` ADD CONSTRAINT `Voucher_Claim_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
