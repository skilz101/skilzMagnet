-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'NEWUSER',
    "companyId" TEXT,
    "picture" TEXT,
    "hashedPassword" TEXT
);
INSERT INTO "new_User" ("companyId", "email", "hashedPassword", "id", "name", "picture", "role") SELECT "companyId", "email", "hashedPassword", "id", "name", "picture", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
