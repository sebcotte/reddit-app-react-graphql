# Migration `20200928084025-edit-post-model`

This migration has been generated by Sebastie, at 9/28/2020, 10:40:25 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "userId" INTEGER,
    "subredditId" INTEGER NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("subredditId") REFERENCES "Subreddit"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("id", "content", "createdAt", "url", "userId", "subredditId") SELECT "id", "content", "createdAt", "url", "userId", "subredditId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200928081010-edit-comments-model..20200928084025-edit-post-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 // Datasource
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 // Prisma Client
 generator client {
@@ -32,8 +32,9 @@
 }
 model Post {
   id          Int       @id @default(autoincrement())
+  title       String
   content     String   
   createdAt   DateTime  @default(now())
   url         String
   user        User?     @relation(fields: [userId], references: [id])
```


