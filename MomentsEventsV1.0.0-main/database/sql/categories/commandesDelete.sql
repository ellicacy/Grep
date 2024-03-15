-- 1. Truncate the table
-- DELETE FROM categorie;

-- 2. Drop the existing primary key constraint
-- ALTER TABLE categorie DROP COLUMN id;

-- 3. Add a new primary key constraint with autoincrement starting at 1
-- ALTER TABLE categorie ADD COLUMN id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL DEFAULT 1;