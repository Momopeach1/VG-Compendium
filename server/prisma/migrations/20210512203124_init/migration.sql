/*
  Warnings:

  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterIndex
ALTER TABLE `_gametoprofile` RENAME INDEX `_GameToProfile_AB_unique` TO `_gametoprofile_AB_unique`;

-- AlterIndex
ALTER TABLE `_gametoprofile` RENAME INDEX `_GameToProfile_B_index` TO `_gametoprofile_B_index`;
