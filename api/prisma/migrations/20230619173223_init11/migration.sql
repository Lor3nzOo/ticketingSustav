/*
  Warnings:

  - You are about to drop the column `n_sifra_smjetajne_jedininice` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `n_sifra_smjestajne_jedinice` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `n_sifra_smjetajne_jedininice`,
    ADD COLUMN `n_sifra_smjestajne_jedinice` JSON NOT NULL;
