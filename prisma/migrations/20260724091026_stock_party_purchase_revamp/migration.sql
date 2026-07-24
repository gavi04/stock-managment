/*
  Warnings:

  - You are about to drop the column `email` on the `parties` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `parties` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `parties` table. All the data in the column will be lost.
  - You are about to drop the column `barcode` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `track_batch` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `track_serial` on the `products` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "hsn_codes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_parties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "mobile" TEXT,
    "address" TEXT,
    "city" TEXT,
    "district" TEXT,
    "state" TEXT,
    "pin_code" TEXT,
    "gstin" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);
INSERT INTO "new_parties" ("address", "city", "code", "created_at", "deleted_at", "district", "gstin", "id", "mobile", "name", "pin_code", "state", "updated_at") SELECT "address", "city", "code", "created_at", "deleted_at", "district", "gstin", "id", "mobile", "name", "pin_code", "state", "updated_at" FROM "parties";
DROP TABLE "parties";
ALTER TABLE "new_parties" RENAME TO "parties";
CREATE UNIQUE INDEX "parties_code_key" ON "parties"("code");
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_id" INTEGER,
    "unit_id" INTEGER,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hsn" TEXT,
    "size" TEXT,
    "length" TEXT,
    "gst_rate" REAL NOT NULL DEFAULT 0,
    "sale_rate" REAL NOT NULL DEFAULT 0,
    "purchase_rate" REAL NOT NULL DEFAULT 0,
    "size_diff" REAL NOT NULL DEFAULT 0,
    "batch_no" TEXT,
    "description" TEXT,
    "opening_stock_date" TEXT,
    "unit_basis" TEXT NOT NULL DEFAULT 'quantity',
    "isi_mark" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "min_stock" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "products_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("category_id", "code", "created_at", "deleted_at", "id", "is_active", "min_stock", "name", "unit_id", "updated_at") SELECT "category_id", "code", "created_at", "deleted_at", "id", "is_active", "min_stock", "name", "unit_id", "updated_at" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");
CREATE INDEX "idx_products_code" ON "products"("code");
CREATE TABLE "new_purchase_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchase_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_name" TEXT,
    "hsn" TEXT,
    "pcs" REAL,
    "quantity" REAL NOT NULL DEFAULT 0,
    "base_rate" REAL NOT NULL,
    "size_diff" REAL NOT NULL DEFAULT 0,
    "net_rate" REAL NOT NULL,
    "taxable_value" REAL NOT NULL,
    "gst_rate" REAL NOT NULL DEFAULT 0,
    "gst_amount" REAL NOT NULL DEFAULT 0,
    "amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "purchase_items_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchase_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchase_items" ("amount", "base_rate", "created_at", "deleted_at", "gst_amount", "gst_rate", "hsn", "id", "net_rate", "pcs", "product_id", "purchase_id", "quantity", "size_diff", "taxable_value", "updated_at") SELECT "amount", "base_rate", "created_at", "deleted_at", "gst_amount", "gst_rate", "hsn", "id", "net_rate", "pcs", "product_id", "purchase_id", "quantity", "size_diff", "taxable_value", "updated_at" FROM "purchase_items";
DROP TABLE "purchase_items";
ALTER TABLE "new_purchase_items" RENAME TO "purchase_items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "hsn_codes_code_key" ON "hsn_codes"("code");
