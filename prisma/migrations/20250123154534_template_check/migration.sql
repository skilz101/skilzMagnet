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
    "template" TEXT,
    "theme" TEXT,
    "logo" TEXT,
    "title" TEXT,
    "subTitle" TEXT,
    "usage" TEXT NOT NULL,
    "hasTemplate" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Company_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("companyId", "companyName", "discover", "firstName", "id", "lastName", "logo", "subTitle", "template", "theme", "title", "usage") SELECT "companyId", "companyName", "discover", "firstName", "id", "lastName", "logo", "subTitle", "template", "theme", "title", "usage" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_companyId_key" ON "Company"("companyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
