/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ImageProduct` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixEnKilo` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `ImageProduct` VARCHAR(191) NOT NULL,
    ADD COLUMN `prixEnKilo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `archives` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produit` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `taux` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Archives_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `user`(`name`);

-- AddForeignKey
ALTER TABLE `archives` ADD CONSTRAINT `Archives_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
