-- CreateTable
CREATE TABLE `Recepcioner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Recepcioner_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kamp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naziv` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kamp_naziv_key`(`naziv`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naziv` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Status_naziv_key`(`naziv`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sifra_recepcionera` INTEGER NOT NULL,
    `datum_vrijeme` DATETIME(3) NOT NULL,
    `sifra_kampa` INTEGER NOT NULL,
    `status_ticketa` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SmjestajnaJedinica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naziv` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SmjestajnaJedinicaToTicket` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SmjestajnaJedinicaToTicket_AB_unique`(`A`, `B`),
    INDEX `_SmjestajnaJedinicaToTicket_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sifra_recepcionera_fkey` FOREIGN KEY (`sifra_recepcionera`) REFERENCES `Recepcioner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sifra_kampa_fkey` FOREIGN KEY (`sifra_kampa`) REFERENCES `Kamp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_status_ticketa_fkey` FOREIGN KEY (`status_ticketa`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SmjestajnaJedinicaToTicket` ADD CONSTRAINT `_SmjestajnaJedinicaToTicket_A_fkey` FOREIGN KEY (`A`) REFERENCES `SmjestajnaJedinica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SmjestajnaJedinicaToTicket` ADD CONSTRAINT `_SmjestajnaJedinicaToTicket_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
