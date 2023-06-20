/*
  Warnings:

  - You are about to drop the `ticketsmjestajnajedinica` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_sifra_kampa_fkey`;

-- DropForeignKey
ALTER TABLE `ticketsmjestajnajedinica` DROP FOREIGN KEY `TicketSmjestajnaJedinica_smjestajnaJedinicaId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketsmjestajnajedinica` DROP FOREIGN KEY `TicketSmjestajnaJedinica_ticketId_fkey`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `datum_vrijeme` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `ticketsmjestajnajedinica`;

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
