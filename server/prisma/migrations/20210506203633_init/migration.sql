-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191),
    ADD COLUMN `photoURL` VARCHAR(191),
    ADD COLUMN `socketId` VARCHAR(191);

-- CreateTable
CREATE TABLE `_GameToProfile` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GameToProfile_AB_unique`(`A`, `B`),
    INDEX `_GameToProfile_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GameToProfile` ADD FOREIGN KEY (`A`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToProfile` ADD FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
