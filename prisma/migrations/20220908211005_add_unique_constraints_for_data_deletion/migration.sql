/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,id]` on the table `Documents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,id]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,id]` on the table `Networks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,id]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Documents_ownerId_id_key" ON "Documents"("ownerId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_ownerId_id_key" ON "Credentials"("ownerId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Networks_ownerId_id_key" ON "Networks"("ownerId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_ownerId_id_key" ON "Notes"("ownerId", "id");
