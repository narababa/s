-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `images` VARCHAR(191) NULL;
