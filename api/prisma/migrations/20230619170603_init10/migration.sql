-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_sifra_kampa_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_sifra_recepcionera_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_status_ticketa_fkey`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `sifra_recepcionera` INTEGER NULL,
    MODIFY `sifra_kampa` INTEGER NULL,
    MODIFY `status_ticketa` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sifra_recepcionera_fkey` FOREIGN KEY (`sifra_recepcionera`) REFERENCES `Recepcioner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_status_ticketa_fkey` FOREIGN KEY (`status_ticketa`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sifra_kampa_fkey` FOREIGN KEY (`sifra_kampa`) REFERENCES `Kamp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
