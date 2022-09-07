-- DropForeignKey
ALTER TABLE "Credentials" DROP CONSTRAINT "Credentials_ownerId_fkey";

-- AlterTable
ALTER TABLE "Credentials" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
