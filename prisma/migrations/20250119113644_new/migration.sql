/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Fields` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fields_companyId_key" ON "Fields"("companyId");
