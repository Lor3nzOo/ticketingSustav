-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sifra_kampa_fkey` FOREIGN KEY (`sifra_kampa`) REFERENCES `Kamp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
