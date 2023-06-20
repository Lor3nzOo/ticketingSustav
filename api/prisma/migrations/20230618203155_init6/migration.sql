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
CREATE TABLE `SmjestajnaJedinicaTicket` (
    `smjestajnaJedinicaId` INTEGER NOT NULL,
    `ticketId` INTEGER NOT NULL,

    PRIMARY KEY (`smjestajnaJedinicaId`, `ticketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SmjestajnaJedinicaTicket` ADD CONSTRAINT `SmjestajnaJedinicaTicket_smjestajnaJedinicaId_fkey` FOREIGN KEY (`smjestajnaJedinicaId`) REFERENCES `SmjestajnaJedinica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SmjestajnaJedinicaTicket` ADD CONSTRAINT `SmjestajnaJedinicaTicket_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
