/*
  Warnings:

  - A unique constraint covering the columns `[naziv]` on the table `SmjestajnaJedinica` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `SmjestajnaJedinica_naziv_key` ON `SmjestajnaJedinica`(`naziv`);
