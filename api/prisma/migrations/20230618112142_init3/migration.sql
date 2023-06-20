/*
  Warnings:

  - You are about to drop the `ticketsmjestajnejedinice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticketsmjestajnejedinice` DROP FOREIGN KEY `TicketSmjestajneJedinice_SmjestajnaJedinicaId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketsmjestajnejedinice` DROP FOREIGN KEY `TicketSmjestajneJedinice_ticketId_fkey`;

-- DropTable
DROP TABLE `ticketsmjestajnejedinice`;

-- CreateTable
CREATE TABLE `TicketSmjestajnaJedinica` (
    `ticketId` INTEGER NOT NULL,
    `smjestajnaJedinicaId` INTEGER NOT NULL,

    PRIMARY KEY (`ticketId`, `smjestajnaJedinicaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketSmjestajnaJedinica` ADD CONSTRAINT `TicketSmjestajnaJedinica_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketSmjestajnaJedinica` ADD CONSTRAINT `TicketSmjestajnaJedinica_smjestajnaJedinicaId_fkey` FOREIGN KEY (`smjestajnaJedinicaId`) REFERENCES `SmjestajnaJedinica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
