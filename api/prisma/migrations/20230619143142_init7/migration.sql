/*
  Warnings:

  - You are about to drop the `smjestajnajedinicaticket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `n_sifra_smjetajne_jedininice` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `smjestajnajedinicaticket` DROP FOREIGN KEY `SmjestajnaJedinicaTicket_smjestajnaJedinicaId_fkey`;

-- DropForeignKey
ALTER TABLE `smjestajnajedinicaticket` DROP FOREIGN KEY `SmjestajnaJedinicaTicket_ticketId_fkey`;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `n_sifra_smjetajne_jedininice` JSON NOT NULL;

-- DropTable
DROP TABLE `smjestajnajedinicaticket`;

-- CreateTable
CREATE TABLE `_SmjestajnaJedinicaToTicket` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SmjestajnaJedinicaToTicket_AB_unique`(`A`, `B`),
    INDEX `_SmjestajnaJedinicaToTicket_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SmjestajnaJedinicaToTicket` ADD CONSTRAINT `_SmjestajnaJedinicaToTicket_A_fkey` FOREIGN KEY (`A`) REFERENCES `SmjestajnaJedinica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SmjestajnaJedinicaToTicket` ADD CONSTRAINT `_SmjestajnaJedinicaToTicket_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
