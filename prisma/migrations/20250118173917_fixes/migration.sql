/*
  Warnings:

  - Added the required column `companyId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "discover" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    CONSTRAINT "Company_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("companyName", "discover", "firstName", "id", "lastName", "logo", "subTitle", "template", "theme", "title") SELECT "companyName", "discover", "firstName", "id", "lastName", "logo", "subTitle", "template", "theme", "title" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_companyId_key" ON "Company"("companyId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'NEWUSER',
    "companyId" TEXT,
    "picture" TEXT NOT NULL,
    "hashedPassword" TEXT
);
INSERT INTO "new_User" ("companyId", "email", "hashedPassword", "id", "name", "picture", "role") SELECT "companyId", "email", "hashedPassword", "id", "name", "picture", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
