/*
  Warnings:

  - You are about to alter the column `phoneNumber` on the `Leads` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "companyId" TEXT,
    CONSTRAINT "Leads_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Leads" ("companyId", "email", "id", "name", "phoneNumber") SELECT "companyId", "email", "id", "name", "phoneNumber" FROM "Leads";
DROP TABLE "Leads";
ALTER TABLE "new_Leads" RENAME TO "Leads";
CREATE UNIQUE INDEX "Leads_companyId_key" ON "Leads"("companyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
