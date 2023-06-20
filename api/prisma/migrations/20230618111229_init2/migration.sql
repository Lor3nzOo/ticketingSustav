/*
  Warnings:

  - You are about to drop the `_smjestajnajedinicatoticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_smjestajnajedinicatoticket` DROP FOREIGN KEY `_SmjestajnaJedinicaToTicket_A_fkey`;

-- DropForeignKey
ALTER TABLE `_smjestajnajedinicatoticket` DROP FOREIGN KEY `_SmjestajnaJedinicaToTicket_B_fkey`;

-- DropTable
DROP TABLE `_smjestajnajedinicatoticket`;

-- CreateTable
CREATE TABLE `TicketSmjestajneJedinice` (
    `ticketId` INTEGER NOT NULL,
    `SmjestajnaJedinicaId` INTEGER NOT NULL,

    PRIMARY KEY (`ticketId`, `SmjestajnaJedinicaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketSmjestajneJedinice` ADD CONSTRAINT `TicketSmjestajneJedinice_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketSmjestajneJedinice` ADD CONSTRAINT `TicketSmjestajneJedinice_SmjestajnaJedinicaId_fkey` FOREIGN KEY (`SmjestajnaJedinicaId`) REFERENCES `SmjestajnaJedinica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
