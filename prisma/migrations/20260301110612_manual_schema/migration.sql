/*
  Warnings:

  - Added the required column `authorId` to the `Manual` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manual" ADD COLUMN     "authorId" UUID NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Manual" ADD CONSTRAINT "Manual_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
