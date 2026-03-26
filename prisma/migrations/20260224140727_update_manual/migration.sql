/*
  Warnings:

  - You are about to drop the column `mdxPath` on the `Manual` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Manual` table. All the data in the column will be lost.
  - Added the required column `content` to the `Manual` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manual" DROP COLUMN "mdxPath",
DROP COLUMN "summary",
ADD COLUMN     "content" JSONB NOT NULL;
