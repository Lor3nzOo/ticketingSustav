/*
  Warnings:

  - A unique constraint covering the columns `[session]` on the table `Recepcioner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session` to the `Recepcioner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recepcioner` ADD COLUMN `session` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Recepcioner_session_key` ON `Recepcioner`(`session`);
