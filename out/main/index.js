"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const electron = require("electron");
const path = require("node:path");
const adapterBetterSqlite3 = require("@prisma/adapter-better-sqlite3");
const node_url = require("node:url");
const runtime = require("@prisma/client/runtime/client");
const fs = require("node:fs");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const zod = require("zod");
const ExcelJS = require("exceljs");
const sync = require("csv-stringify/sync");
const PDFDocument = require("pdfkit");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const runtime__namespace = /* @__PURE__ */ _interopNamespaceDefault(runtime);
const config = {
  "previewFeatures": [],
  "clientVersion": "7.9.0",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "sqlite",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "sqlite"\n}\n\nenum StockTransactionType {\n  purchase\n  sale\n  sale_return\n  purchase_return\n  production_in\n  production_out\n  adjustment_in\n  adjustment_out\n  transfer_in\n  transfer_out\n  opening_balance\n}\n\nmodel Role {\n  id              Int       @id @default(autoincrement())\n  name            String    @unique\n  code            String    @unique\n  permissionsJson String    @default("[]") @map("permissions_json")\n  createdAt       DateTime  @default(now()) @map("created_at")\n  updatedAt       DateTime  @updatedAt @map("updated_at")\n  deletedAt       DateTime? @map("deleted_at")\n\n  users User[]\n\n  @@map("roles")\n}\n\nmodel User {\n  id           Int       @id @default(autoincrement())\n  fullName     String    @map("full_name")\n  username     String    @unique\n  passwordHash String    @map("password_hash")\n  roleId       Int       @map("role_id")\n  status       String    @default("active")\n  lastLoginAt  DateTime? @map("last_login_at")\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  role      Role       @relation(fields: [roleId], references: [id])\n  auditLogs AuditLog[]\n\n  @@map("users")\n}\n\nmodel Setting {\n  id                     Int      @id\n  companyName            String   @default("StockOps") @map("company_name")\n  allowDuplicateBarcodes Boolean  @default(false) @map("allow_duplicate_barcodes")\n  allowNegativeStock     Boolean  @default(false) @map("allow_negative_stock")\n  enableAutoBackup       Boolean  @default(true) @map("enable_auto_backup")\n  backupIntervalHours    Int      @default(24) @map("backup_interval_hours")\n  productionSettingsJson String   @default("{}") @map("production_settings_json")\n  createdAt              DateTime @default(now()) @map("created_at")\n  updatedAt              DateTime @updatedAt @map("updated_at")\n\n  @@map("settings")\n}\n\nmodel Category {\n  id          Int       @id @default(autoincrement())\n  name        String    @unique\n  code        String    @unique\n  description String?\n  createdAt   DateTime  @default(now()) @map("created_at")\n  updatedAt   DateTime  @updatedAt @map("updated_at")\n  deletedAt   DateTime? @map("deleted_at")\n\n  products Product[]\n\n  @@map("categories")\n}\n\nmodel Unit {\n  id        Int       @id @default(autoincrement())\n  name      String    @unique\n  code      String    @unique\n  symbol    String?\n  createdAt DateTime  @default(now()) @map("created_at")\n  updatedAt DateTime  @updatedAt @map("updated_at")\n  deletedAt DateTime? @map("deleted_at")\n\n  products Product[]\n\n  @@map("units")\n}\n\nmodel Hsn {\n  id          Int       @id @default(autoincrement())\n  code        String    @unique\n  description String?\n  createdAt   DateTime  @default(now()) @map("created_at")\n  updatedAt   DateTime  @updatedAt @map("updated_at")\n  deletedAt   DateTime? @map("deleted_at")\n\n  @@map("hsn_codes")\n}\n\nmodel Warehouse {\n  id        Int       @id @default(autoincrement())\n  name      String    @unique\n  code      String    @unique\n  location  String?\n  isDefault Boolean   @default(false) @map("is_default")\n  createdAt DateTime  @default(now()) @map("created_at")\n  updatedAt DateTime  @updatedAt @map("updated_at")\n  deletedAt DateTime? @map("deleted_at")\n\n  purchases         Purchase[]\n  sales             Sale[]\n  saleReturns       SaleReturn[]\n  purchaseReturns   PurchaseReturn[]\n  productions       Production[]\n  stockTransactions StockTransaction[]\n\n  @@map("warehouses")\n}\n\nmodel Party {\n  id        Int       @id @default(autoincrement())\n  name      String\n  code      String    @unique\n  mobile    String?\n  address   String?\n  city      String?\n  district  String?\n  state     String?\n  pinCode   String?   @map("pin_code")\n  gstin     String?\n  createdAt DateTime  @default(now()) @map("created_at")\n  updatedAt DateTime  @updatedAt @map("updated_at")\n  deletedAt DateTime? @map("deleted_at")\n\n  purchasesAsSupplier       Purchase[]         @relation("PurchaseSupplier")\n  salesAsCustomer           Sale[]             @relation("SaleCustomer")\n  saleReturnsAsCustomer     SaleReturn[]       @relation("SaleReturnCustomer")\n  purchaseReturnsAsSupplier PurchaseReturn[]   @relation("PurchaseReturnSupplier")\n  stockTransactions         StockTransaction[]\n\n  @@map("parties")\n}\n\nmodel Product {\n  id               Int       @id @default(autoincrement())\n  categoryId       Int?      @map("category_id")\n  unitId           Int?      @map("unit_id")\n  name             String\n  code             String    @unique\n  hsn              String?\n  size             String?\n  length           String?\n  gstRate          Float     @default(0) @map("gst_rate")\n  saleRate         Float     @default(0) @map("sale_rate")\n  purchaseRate     Float     @default(0) @map("purchase_rate")\n  sizeDiff         Float     @default(0) @map("size_diff")\n  batchNo          String?   @map("batch_no")\n  description      String?\n  openingStockDate String?   @map("opening_stock_date")\n  unitBasis        String    @default("quantity") @map("unit_basis")\n  isiMark          Boolean   @default(false) @map("isi_mark")\n  isActive         Boolean   @default(true) @map("is_active")\n  minStock         Float     @default(0) @map("min_stock")\n  createdAt        DateTime  @default(now()) @map("created_at")\n  updatedAt        DateTime  @updatedAt @map("updated_at")\n  deletedAt        DateTime? @map("deleted_at")\n\n  category            Category?            @relation(fields: [categoryId], references: [id])\n  unit                Unit?                @relation(fields: [unitId], references: [id])\n  purchaseItems       PurchaseItem[]\n  saleItems           SaleItem[]\n  saleReturnItems     SaleReturnItem[]\n  purchaseReturnItems PurchaseReturnItem[]\n  productionItems     ProductionItem[]\n  stockTransactions   StockTransaction[]\n\n  @@index([code], map: "idx_products_code")\n  @@map("products")\n}\n\nmodel Purchase {\n  id           Int       @id @default(autoincrement())\n  voucherNo    String    @unique @map("voucher_no")\n  invoiceNo    String?   @map("invoice_no")\n  supplierId   Int?      @map("supplier_id")\n  warehouseId  Int       @map("warehouse_id")\n  purchaseDate String    @map("purchase_date")\n  batchNo      String?   @map("batch_no")\n  expiryDate   String?   @map("expiry_date")\n  vehicleNo    String?   @map("vehicle_no")\n  biltyNo      String?   @map("bilty_no")\n  broker       String?\n  remarks      String?\n  status       String    @default("posted")\n  taxableValue Float     @default(0) @map("taxable_value")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  totalAmount  Float     @default(0) @map("total_amount")\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  supplier  Party?         @relation("PurchaseSupplier", fields: [supplierId], references: [id])\n  warehouse Warehouse      @relation(fields: [warehouseId], references: [id])\n  items     PurchaseItem[]\n\n  @@map("purchases")\n}\n\nmodel PurchaseItem {\n  id           Int       @id @default(autoincrement())\n  purchaseId   Int       @map("purchase_id")\n  productId    Int       @map("product_id")\n  productName  String?   @map("product_name")\n  hsn          String?\n  pcs          Float?\n  quantity     Float     @default(0)\n  baseRate     Float     @map("base_rate")\n  sizeDiff     Float     @default(0) @map("size_diff")\n  netRate      Float     @map("net_rate")\n  taxableValue Float     @map("taxable_value")\n  gstRate      Float     @default(0) @map("gst_rate")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  amount       Float\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  purchase Purchase @relation(fields: [purchaseId], references: [id])\n  product  Product  @relation(fields: [productId], references: [id])\n\n  @@map("purchase_items")\n}\n\nmodel Sale {\n  id           Int       @id @default(autoincrement())\n  voucherNo    String    @unique @map("voucher_no")\n  invoiceNo    String?   @map("invoice_no")\n  customerId   Int?      @map("customer_id")\n  warehouseId  Int       @map("warehouse_id")\n  saleDate     String    @map("sale_date")\n  batchNo      String?   @map("batch_no")\n  expiryDate   String?   @map("expiry_date")\n  vehicleNo    String?   @map("vehicle_no")\n  biltyNo      String?   @map("bilty_no")\n  broker       String?\n  remarks      String?\n  status       String    @default("posted")\n  taxableValue Float     @default(0) @map("taxable_value")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  totalAmount  Float     @default(0) @map("total_amount")\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  customer  Party?     @relation("SaleCustomer", fields: [customerId], references: [id])\n  warehouse Warehouse  @relation(fields: [warehouseId], references: [id])\n  items     SaleItem[]\n\n  @@map("sales")\n}\n\nmodel SaleItem {\n  id           Int       @id @default(autoincrement())\n  saleId       Int       @map("sale_id")\n  productId    Int       @map("product_id")\n  hsn          String?\n  pcs          Float?\n  quantity     Float\n  baseRate     Float     @map("base_rate")\n  sizeDiff     Float     @default(0) @map("size_diff")\n  netRate      Float     @map("net_rate")\n  taxableValue Float     @map("taxable_value")\n  gstRate      Float     @default(0) @map("gst_rate")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  amount       Float\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  sale    Sale    @relation(fields: [saleId], references: [id])\n  product Product @relation(fields: [productId], references: [id])\n\n  @@map("sale_items")\n}\n\nmodel SaleReturn {\n  id           Int       @id @default(autoincrement())\n  voucherNo    String    @unique @map("voucher_no")\n  invoiceNo    String?   @map("invoice_no")\n  customerId   Int?      @map("customer_id")\n  warehouseId  Int       @map("warehouse_id")\n  returnDate   String    @map("return_date")\n  batchNo      String?   @map("batch_no")\n  expiryDate   String?   @map("expiry_date")\n  vehicleNo    String?   @map("vehicle_no")\n  biltyNo      String?   @map("bilty_no")\n  broker       String?\n  remarks      String?\n  status       String    @default("posted")\n  taxableValue Float     @default(0) @map("taxable_value")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  totalAmount  Float     @default(0) @map("total_amount")\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  customer  Party?           @relation("SaleReturnCustomer", fields: [customerId], references: [id])\n  warehouse Warehouse        @relation(fields: [warehouseId], references: [id])\n  items     SaleReturnItem[]\n\n  @@map("sale_returns")\n}\n\nmodel SaleReturnItem {\n  id           Int       @id @default(autoincrement())\n  saleReturnId Int       @map("sale_return_id")\n  productId    Int       @map("product_id")\n  hsn          String?\n  pcs          Float?\n  quantity     Float\n  baseRate     Float     @map("base_rate")\n  sizeDiff     Float     @default(0) @map("size_diff")\n  netRate      Float     @map("net_rate")\n  taxableValue Float     @map("taxable_value")\n  gstRate      Float     @default(0) @map("gst_rate")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  amount       Float\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  saleReturn SaleReturn @relation(fields: [saleReturnId], references: [id])\n  product    Product    @relation(fields: [productId], references: [id])\n\n  @@map("sale_return_items")\n}\n\nmodel PurchaseReturn {\n  id           Int       @id @default(autoincrement())\n  voucherNo    String    @unique @map("voucher_no")\n  invoiceNo    String?   @map("invoice_no")\n  supplierId   Int?      @map("supplier_id")\n  warehouseId  Int       @map("warehouse_id")\n  returnDate   String    @map("return_date")\n  batchNo      String?   @map("batch_no")\n  expiryDate   String?   @map("expiry_date")\n  vehicleNo    String?   @map("vehicle_no")\n  biltyNo      String?   @map("bilty_no")\n  broker       String?\n  remarks      String?\n  status       String    @default("posted")\n  taxableValue Float     @default(0) @map("taxable_value")\n  gstAmount    Float     @default(0) @map("gst_amount")\n  totalAmount  Float     @default(0) @map("total_amount")\n  createdAt    DateTime  @default(now()) @map("created_at")\n  updatedAt    DateTime  @updatedAt @map("updated_at")\n  deletedAt    DateTime? @map("deleted_at")\n\n  supplier  Party?               @relation("PurchaseReturnSupplier", fields: [supplierId], references: [id])\n  warehouse Warehouse            @relation(fields: [warehouseId], references: [id])\n  items     PurchaseReturnItem[]\n\n  @@map("purchase_returns")\n}\n\nmodel PurchaseReturnItem {\n  id               Int       @id @default(autoincrement())\n  purchaseReturnId Int       @map("purchase_return_id")\n  productId        Int       @map("product_id")\n  hsn              String?\n  pcs              Float?\n  quantity         Float\n  baseRate         Float     @map("base_rate")\n  sizeDiff         Float     @default(0) @map("size_diff")\n  netRate          Float     @map("net_rate")\n  taxableValue     Float     @map("taxable_value")\n  gstRate          Float     @default(0) @map("gst_rate")\n  gstAmount        Float     @default(0) @map("gst_amount")\n  amount           Float\n  createdAt        DateTime  @default(now()) @map("created_at")\n  updatedAt        DateTime  @updatedAt @map("updated_at")\n  deletedAt        DateTime? @map("deleted_at")\n\n  purchaseReturn PurchaseReturn @relation(fields: [purchaseReturnId], references: [id])\n  product        Product        @relation(fields: [productId], references: [id])\n\n  @@map("purchase_return_items")\n}\n\nmodel Production {\n  id             Int       @id @default(autoincrement())\n  voucherNo      String    @unique @map("voucher_no")\n  warehouseId    Int       @map("warehouse_id")\n  productionDate String    @map("production_date")\n  isRecurring    Boolean   @default(false) @map("is_recurring")\n  status         String    @default("posted")\n  remarks        String?\n  createdAt      DateTime  @default(now()) @map("created_at")\n  updatedAt      DateTime  @updatedAt @map("updated_at")\n  deletedAt      DateTime? @map("deleted_at")\n\n  warehouse Warehouse        @relation(fields: [warehouseId], references: [id])\n  items     ProductionItem[]\n\n  @@map("production")\n}\n\nmodel ProductionItem {\n  id            Int       @id @default(autoincrement())\n  productionId  Int       @map("production_id")\n  productId     Int       @map("product_id")\n  batchNo       String?   @map("batch_no")\n  issuedQty     Float     @default(0) @map("issued_qty")\n  issuedPcs     Float     @default(0) @map("issued_pcs")\n  productionQty Float     @default(0) @map("production_qty")\n  productionPcs Float     @default(0) @map("production_pcs")\n  createdAt     DateTime  @default(now()) @map("created_at")\n  updatedAt     DateTime  @updatedAt @map("updated_at")\n  deletedAt     DateTime? @map("deleted_at")\n\n  production Production @relation(fields: [productionId], references: [id])\n  product    Product    @relation(fields: [productId], references: [id])\n\n  @@map("production_items")\n}\n\nmodel StockTransaction {\n  id              Int                  @id @default(autoincrement())\n  transactionNo   String               @unique @map("transaction_no")\n  sourceType      String               @map("source_type")\n  sourceId        Int?                 @map("source_id")\n  transactionType StockTransactionType @map("transaction_type")\n  productId       Int                  @map("product_id")\n  warehouseId     Int                  @map("warehouse_id")\n  partyId         Int?                 @map("party_id")\n  quantity        Float\n  rate            Float                @default(0)\n  amount          Float                @default(0)\n  referenceNo     String?              @map("reference_no")\n  notes           String?\n  createdAt       DateTime             @default(now()) @map("created_at")\n  updatedAt       DateTime             @updatedAt @map("updated_at")\n  deletedAt       DateTime?            @map("deleted_at")\n\n  product   Product   @relation(fields: [productId], references: [id])\n  warehouse Warehouse @relation(fields: [warehouseId], references: [id])\n  party     Party?    @relation(fields: [partyId], references: [id])\n\n  @@index([productId, warehouseId, transactionType, createdAt], map: "idx_stock_transactions_lookup")\n  @@map("stock_transactions")\n}\n\nmodel AuditLog {\n  id          Int      @id @default(autoincrement())\n  actorUserId Int?     @map("actor_user_id")\n  action      String\n  entityType  String   @map("entity_type")\n  entityId    Int?     @map("entity_id")\n  payloadJson String   @default("{}") @map("payload_json")\n  ipAddress   String?  @map("ip_address")\n  userAgent   String?  @map("user_agent")\n  createdAt   DateTime @default(now()) @map("created_at")\n\n  actor User? @relation(fields: [actorUserId], references: [id])\n\n  @@index([createdAt], map: "idx_audit_logs_created_at")\n  @@map("audit_logs")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Role":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"permissionsJson","kind":"scalar","type":"String","dbName":"permissions_json"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"users","kind":"object","type":"User","relationName":"RoleToUser"}],"dbName":"roles"},"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"fullName","kind":"scalar","type":"String","dbName":"full_name"},{"name":"username","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String","dbName":"password_hash"},{"name":"roleId","kind":"scalar","type":"Int","dbName":"role_id"},{"name":"status","kind":"scalar","type":"String"},{"name":"lastLoginAt","kind":"scalar","type":"DateTime","dbName":"last_login_at"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"role","kind":"object","type":"Role","relationName":"RoleToUser"},{"name":"auditLogs","kind":"object","type":"AuditLog","relationName":"AuditLogToUser"}],"dbName":"users"},"Setting":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"companyName","kind":"scalar","type":"String","dbName":"company_name"},{"name":"allowDuplicateBarcodes","kind":"scalar","type":"Boolean","dbName":"allow_duplicate_barcodes"},{"name":"allowNegativeStock","kind":"scalar","type":"Boolean","dbName":"allow_negative_stock"},{"name":"enableAutoBackup","kind":"scalar","type":"Boolean","dbName":"enable_auto_backup"},{"name":"backupIntervalHours","kind":"scalar","type":"Int","dbName":"backup_interval_hours"},{"name":"productionSettingsJson","kind":"scalar","type":"String","dbName":"production_settings_json"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"settings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"}],"dbName":"categories"},"Unit":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"symbol","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"products","kind":"object","type":"Product","relationName":"ProductToUnit"}],"dbName":"units"},"Hsn":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"code","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"}],"dbName":"hsn_codes"},"Warehouse":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"isDefault","kind":"scalar","type":"Boolean","dbName":"is_default"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"purchases","kind":"object","type":"Purchase","relationName":"PurchaseToWarehouse"},{"name":"sales","kind":"object","type":"Sale","relationName":"SaleToWarehouse"},{"name":"saleReturns","kind":"object","type":"SaleReturn","relationName":"SaleReturnToWarehouse"},{"name":"purchaseReturns","kind":"object","type":"PurchaseReturn","relationName":"PurchaseReturnToWarehouse"},{"name":"productions","kind":"object","type":"Production","relationName":"ProductionToWarehouse"},{"name":"stockTransactions","kind":"object","type":"StockTransaction","relationName":"StockTransactionToWarehouse"}],"dbName":"warehouses"},"Party":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"mobile","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"state","kind":"scalar","type":"String"},{"name":"pinCode","kind":"scalar","type":"String","dbName":"pin_code"},{"name":"gstin","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"purchasesAsSupplier","kind":"object","type":"Purchase","relationName":"PurchaseSupplier"},{"name":"salesAsCustomer","kind":"object","type":"Sale","relationName":"SaleCustomer"},{"name":"saleReturnsAsCustomer","kind":"object","type":"SaleReturn","relationName":"SaleReturnCustomer"},{"name":"purchaseReturnsAsSupplier","kind":"object","type":"PurchaseReturn","relationName":"PurchaseReturnSupplier"},{"name":"stockTransactions","kind":"object","type":"StockTransaction","relationName":"PartyToStockTransaction"}],"dbName":"parties"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"categoryId","kind":"scalar","type":"Int","dbName":"category_id"},{"name":"unitId","kind":"scalar","type":"Int","dbName":"unit_id"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"hsn","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"String"},{"name":"length","kind":"scalar","type":"String"},{"name":"gstRate","kind":"scalar","type":"Float","dbName":"gst_rate"},{"name":"saleRate","kind":"scalar","type":"Float","dbName":"sale_rate"},{"name":"purchaseRate","kind":"scalar","type":"Float","dbName":"purchase_rate"},{"name":"sizeDiff","kind":"scalar","type":"Float","dbName":"size_diff"},{"name":"batchNo","kind":"scalar","type":"String","dbName":"batch_no"},{"name":"description","kind":"scalar","type":"String"},{"name":"openingStockDate","kind":"scalar","type":"String","dbName":"opening_stock_date"},{"name":"unitBasis","kind":"scalar","type":"String","dbName":"unit_basis"},{"name":"isiMark","kind":"scalar","type":"Boolean","dbName":"isi_mark"},{"name":"isActive","kind":"scalar","type":"Boolean","dbName":"is_active"},{"name":"minStock","kind":"scalar","type":"Float","dbName":"min_stock"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"unit","kind":"object","type":"Unit","relationName":"ProductToUnit"},{"name":"purchaseItems","kind":"object","type":"PurchaseItem","relationName":"ProductToPurchaseItem"},{"name":"saleItems","kind":"object","type":"SaleItem","relationName":"ProductToSaleItem"},{"name":"saleReturnItems","kind":"object","type":"SaleReturnItem","relationName":"ProductToSaleReturnItem"},{"name":"purchaseReturnItems","kind":"object","type":"PurchaseReturnItem","relationName":"ProductToPurchaseReturnItem"},{"name":"productionItems","kind":"object","type":"ProductionItem","relationName":"ProductToProductionItem"},{"name":"stockTransactions","kind":"object","type":"StockTransaction","relationName":"ProductToStockTransaction"}],"dbName":"products"},"Purchase":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"voucherNo","kind":"scalar","type":"String","dbName":"voucher_no"},{"name":"invoiceNo","kind":"scalar","type":"String","dbName":"invoice_no"},{"name":"supplierId","kind":"scalar","type":"Int","dbName":"supplier_id"},{"name":"warehouseId","kind":"scalar","type":"Int","dbName":"warehouse_id"},{"name":"purchaseDate","kind":"scalar","type":"String","dbName":"purchase_date"},{"name":"batchNo","kind":"scalar","type":"String","dbName":"batch_no"},{"name":"expiryDate","kind":"scalar","type":"String","dbName":"expiry_date"},{"name":"vehicleNo","kind":"scalar","type":"String","dbName":"vehicle_no"},{"name":"biltyNo","kind":"scalar","type":"String","dbName":"bilty_no"},{"name":"broker","kind":"scalar","type":"String"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"totalAmount","kind":"scalar","type":"Float","dbName":"total_amount"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"supplier","kind":"object","type":"Party","relationName":"PurchaseSupplier"},{"name":"warehouse","kind":"object","type":"Warehouse","relationName":"PurchaseToWarehouse"},{"name":"items","kind":"object","type":"PurchaseItem","relationName":"PurchaseToPurchaseItem"}],"dbName":"purchases"},"PurchaseItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"purchaseId","kind":"scalar","type":"Int","dbName":"purchase_id"},{"name":"productId","kind":"scalar","type":"Int","dbName":"product_id"},{"name":"productName","kind":"scalar","type":"String","dbName":"product_name"},{"name":"hsn","kind":"scalar","type":"String"},{"name":"pcs","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Float"},{"name":"baseRate","kind":"scalar","type":"Float","dbName":"base_rate"},{"name":"sizeDiff","kind":"scalar","type":"Float","dbName":"size_diff"},{"name":"netRate","kind":"scalar","type":"Float","dbName":"net_rate"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstRate","kind":"scalar","type":"Float","dbName":"gst_rate"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"purchase","kind":"object","type":"Purchase","relationName":"PurchaseToPurchaseItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToPurchaseItem"}],"dbName":"purchase_items"},"Sale":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"voucherNo","kind":"scalar","type":"String","dbName":"voucher_no"},{"name":"invoiceNo","kind":"scalar","type":"String","dbName":"invoice_no"},{"name":"customerId","kind":"scalar","type":"Int","dbName":"customer_id"},{"name":"warehouseId","kind":"scalar","type":"Int","dbName":"warehouse_id"},{"name":"saleDate","kind":"scalar","type":"String","dbName":"sale_date"},{"name":"batchNo","kind":"scalar","type":"String","dbName":"batch_no"},{"name":"expiryDate","kind":"scalar","type":"String","dbName":"expiry_date"},{"name":"vehicleNo","kind":"scalar","type":"String","dbName":"vehicle_no"},{"name":"biltyNo","kind":"scalar","type":"String","dbName":"bilty_no"},{"name":"broker","kind":"scalar","type":"String"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"totalAmount","kind":"scalar","type":"Float","dbName":"total_amount"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"customer","kind":"object","type":"Party","relationName":"SaleCustomer"},{"name":"warehouse","kind":"object","type":"Warehouse","relationName":"SaleToWarehouse"},{"name":"items","kind":"object","type":"SaleItem","relationName":"SaleToSaleItem"}],"dbName":"sales"},"SaleItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"saleId","kind":"scalar","type":"Int","dbName":"sale_id"},{"name":"productId","kind":"scalar","type":"Int","dbName":"product_id"},{"name":"hsn","kind":"scalar","type":"String"},{"name":"pcs","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Float"},{"name":"baseRate","kind":"scalar","type":"Float","dbName":"base_rate"},{"name":"sizeDiff","kind":"scalar","type":"Float","dbName":"size_diff"},{"name":"netRate","kind":"scalar","type":"Float","dbName":"net_rate"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstRate","kind":"scalar","type":"Float","dbName":"gst_rate"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"sale","kind":"object","type":"Sale","relationName":"SaleToSaleItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToSaleItem"}],"dbName":"sale_items"},"SaleReturn":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"voucherNo","kind":"scalar","type":"String","dbName":"voucher_no"},{"name":"invoiceNo","kind":"scalar","type":"String","dbName":"invoice_no"},{"name":"customerId","kind":"scalar","type":"Int","dbName":"customer_id"},{"name":"warehouseId","kind":"scalar","type":"Int","dbName":"warehouse_id"},{"name":"returnDate","kind":"scalar","type":"String","dbName":"return_date"},{"name":"batchNo","kind":"scalar","type":"String","dbName":"batch_no"},{"name":"expiryDate","kind":"scalar","type":"String","dbName":"expiry_date"},{"name":"vehicleNo","kind":"scalar","type":"String","dbName":"vehicle_no"},{"name":"biltyNo","kind":"scalar","type":"String","dbName":"bilty_no"},{"name":"broker","kind":"scalar","type":"String"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"totalAmount","kind":"scalar","type":"Float","dbName":"total_amount"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"customer","kind":"object","type":"Party","relationName":"SaleReturnCustomer"},{"name":"warehouse","kind":"object","type":"Warehouse","relationName":"SaleReturnToWarehouse"},{"name":"items","kind":"object","type":"SaleReturnItem","relationName":"SaleReturnToSaleReturnItem"}],"dbName":"sale_returns"},"SaleReturnItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"saleReturnId","kind":"scalar","type":"Int","dbName":"sale_return_id"},{"name":"productId","kind":"scalar","type":"Int","dbName":"product_id"},{"name":"hsn","kind":"scalar","type":"String"},{"name":"pcs","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Float"},{"name":"baseRate","kind":"scalar","type":"Float","dbName":"base_rate"},{"name":"sizeDiff","kind":"scalar","type":"Float","dbName":"size_diff"},{"name":"netRate","kind":"scalar","type":"Float","dbName":"net_rate"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstRate","kind":"scalar","type":"Float","dbName":"gst_rate"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"saleReturn","kind":"object","type":"SaleReturn","relationName":"SaleReturnToSaleReturnItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToSaleReturnItem"}],"dbName":"sale_return_items"},"PurchaseReturn":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"voucherNo","kind":"scalar","type":"String","dbName":"voucher_no"},{"name":"invoiceNo","kind":"scalar","type":"String","dbName":"invoice_no"},{"name":"supplierId","kind":"scalar","type":"Int","dbName":"supplier_id"},{"name":"warehouseId","kind":"scalar","type":"Int","dbName":"warehouse_id"},{"name":"returnDate","kind":"scalar","type":"String","dbName":"return_date"},{"name":"batchNo","kind":"scalar","type":"String","dbName":"batch_no"},{"name":"expiryDate","kind":"scalar","type":"String","dbName":"expiry_date"},{"name":"vehicleNo","kind":"scalar","type":"String","dbName":"vehicle_no"},{"name":"biltyNo","kind":"scalar","type":"String","dbName":"bilty_no"},{"name":"broker","kind":"scalar","type":"String"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"totalAmount","kind":"scalar","type":"Float","dbName":"total_amount"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"supplier","kind":"object","type":"Party","relationName":"PurchaseReturnSupplier"},{"name":"warehouse","kind":"object","type":"Warehouse","relationName":"PurchaseReturnToWarehouse"},{"name":"items","kind":"object","type":"PurchaseReturnItem","relationName":"PurchaseReturnToPurchaseReturnItem"}],"dbName":"purchase_returns"},"PurchaseReturnItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"purchaseReturnId","kind":"scalar","type":"Int","dbName":"purchase_return_id"},{"name":"productId","kind":"scalar","type":"Int","dbName":"product_id"},{"name":"hsn","kind":"scalar","type":"String"},{"name":"pcs","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Float"},{"name":"baseRate","kind":"scalar","type":"Float","dbName":"base_rate"},{"name":"sizeDiff","kind":"scalar","type":"Float","dbName":"size_diff"},{"name":"netRate","kind":"scalar","type":"Float","dbName":"net_rate"},{"name":"taxableValue","kind":"scalar","type":"Float","dbName":"taxable_value"},{"name":"gstRate","kind":"scalar","type":"Float","dbName":"gst_rate"},{"name":"gstAmount","kind":"scalar","type":"Float","dbName":"gst_amount"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"purchaseReturn","kind":"object","type":"PurchaseReturn","relationName":"PurchaseReturnToPurchaseReturnItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToPurchaseReturnItem"}],"dbName":"purchase_return_items"},"Production":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"voucherNo","kind":"scalar","type":"String","dbName":"voucher_no"},{"name":"warehouseId","kind":"scalar","type":"Int","dbName":"warehouse_id"},{"name":"productionDate","kind":"scalar","type":"String","dbName":"production_date"},{"name":"isRecurring","kind":"scalar","type":"Boolean","dbName":"is_recurring"},{"name":"status","kind":"scalar","type":"String"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"warehouse","kind":"object","type":"Warehouse","relationName":"ProductionToWarehouse"},{"name":"items","kind":"object","type":"ProductionItem","relationName":"ProductionToProductionItem"}],"dbName":"production"},"ProductionItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"productionId","kind":"scalar","type":"Int","dbName":"production_id"},{"name":"productId","kind":"scalar","type":"Int","dbName":"product_id"},{"name":"batchNo","kind":"scalar","type":"String","dbName":"batch_no"},{"name":"issuedQty","kind":"scalar","type":"Float","dbName":"issued_qty"},{"name":"issuedPcs","kind":"scalar","type":"Float","dbName":"issued_pcs"},{"name":"productionQty","kind":"scalar","type":"Float","dbName":"production_qty"},{"name":"productionPcs","kind":"scalar","type":"Float","dbName":"production_pcs"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"production","kind":"object","type":"Production","relationName":"ProductionToProductionItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToProductionItem"}],"dbName":"production_items"},"StockTransaction":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"transactionNo","kind":"scalar","type":"String","dbName":"transaction_no"},{"name":"sourceType","kind":"scalar","type":"String","dbName":"source_type"},{"name":"sourceId","kind":"scalar","type":"Int","dbName":"source_id"},{"name":"transactionType","kind":"enum","type":"StockTransactionType","dbName":"transaction_type"},{"name":"productId","kind":"scalar","type":"Int","dbName":"product_id"},{"name":"warehouseId","kind":"scalar","type":"Int","dbName":"warehouse_id"},{"name":"partyId","kind":"scalar","type":"Int","dbName":"party_id"},{"name":"quantity","kind":"scalar","type":"Float"},{"name":"rate","kind":"scalar","type":"Float"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"referenceNo","kind":"scalar","type":"String","dbName":"reference_no"},{"name":"notes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deletedAt","kind":"scalar","type":"DateTime","dbName":"deleted_at"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToStockTransaction"},{"name":"warehouse","kind":"object","type":"Warehouse","relationName":"StockTransactionToWarehouse"},{"name":"party","kind":"object","type":"Party","relationName":"PartyToStockTransaction"}],"dbName":"stock_transactions"},"AuditLog":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"actorUserId","kind":"scalar","type":"Int","dbName":"actor_user_id"},{"name":"action","kind":"scalar","type":"String"},{"name":"entityType","kind":"scalar","type":"String","dbName":"entity_type"},{"name":"entityId","kind":"scalar","type":"Int","dbName":"entity_id"},{"name":"payloadJson","kind":"scalar","type":"String","dbName":"payload_json"},{"name":"ipAddress","kind":"scalar","type":"String","dbName":"ip_address"},{"name":"userAgent","kind":"scalar","type":"String","dbName":"user_agent"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"actor","kind":"object","type":"User","relationName":"AuditLogToUser"}],"dbName":"audit_logs"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","role","actor","auditLogs","_count","users","Role.findUnique","Role.findUniqueOrThrow","Role.findFirst","Role.findFirstOrThrow","Role.findMany","data","Role.createOne","Role.createMany","Role.createManyAndReturn","Role.updateOne","Role.updateMany","Role.updateManyAndReturn","create","update","Role.upsertOne","Role.deleteOne","Role.deleteMany","having","_avg","_sum","_min","_max","Role.groupBy","Role.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Setting.findUnique","Setting.findUniqueOrThrow","Setting.findFirst","Setting.findFirstOrThrow","Setting.findMany","Setting.createOne","Setting.createMany","Setting.createManyAndReturn","Setting.updateOne","Setting.updateMany","Setting.updateManyAndReturn","Setting.upsertOne","Setting.deleteOne","Setting.deleteMany","Setting.groupBy","Setting.aggregate","category","products","unit","purchasesAsSupplier","customer","purchases","sales","warehouse","saleReturn","product","items","saleReturns","supplier","purchaseReturn","purchaseReturns","production","productions","party","stockTransactions","sale","salesAsCustomer","saleReturnsAsCustomer","purchaseReturnsAsSupplier","purchase","purchaseItems","saleItems","saleReturnItems","purchaseReturnItems","productionItems","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Unit.findUnique","Unit.findUniqueOrThrow","Unit.findFirst","Unit.findFirstOrThrow","Unit.findMany","Unit.createOne","Unit.createMany","Unit.createManyAndReturn","Unit.updateOne","Unit.updateMany","Unit.updateManyAndReturn","Unit.upsertOne","Unit.deleteOne","Unit.deleteMany","Unit.groupBy","Unit.aggregate","Hsn.findUnique","Hsn.findUniqueOrThrow","Hsn.findFirst","Hsn.findFirstOrThrow","Hsn.findMany","Hsn.createOne","Hsn.createMany","Hsn.createManyAndReturn","Hsn.updateOne","Hsn.updateMany","Hsn.updateManyAndReturn","Hsn.upsertOne","Hsn.deleteOne","Hsn.deleteMany","Hsn.groupBy","Hsn.aggregate","Warehouse.findUnique","Warehouse.findUniqueOrThrow","Warehouse.findFirst","Warehouse.findFirstOrThrow","Warehouse.findMany","Warehouse.createOne","Warehouse.createMany","Warehouse.createManyAndReturn","Warehouse.updateOne","Warehouse.updateMany","Warehouse.updateManyAndReturn","Warehouse.upsertOne","Warehouse.deleteOne","Warehouse.deleteMany","Warehouse.groupBy","Warehouse.aggregate","Party.findUnique","Party.findUniqueOrThrow","Party.findFirst","Party.findFirstOrThrow","Party.findMany","Party.createOne","Party.createMany","Party.createManyAndReturn","Party.updateOne","Party.updateMany","Party.updateManyAndReturn","Party.upsertOne","Party.deleteOne","Party.deleteMany","Party.groupBy","Party.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","Purchase.findUnique","Purchase.findUniqueOrThrow","Purchase.findFirst","Purchase.findFirstOrThrow","Purchase.findMany","Purchase.createOne","Purchase.createMany","Purchase.createManyAndReturn","Purchase.updateOne","Purchase.updateMany","Purchase.updateManyAndReturn","Purchase.upsertOne","Purchase.deleteOne","Purchase.deleteMany","Purchase.groupBy","Purchase.aggregate","PurchaseItem.findUnique","PurchaseItem.findUniqueOrThrow","PurchaseItem.findFirst","PurchaseItem.findFirstOrThrow","PurchaseItem.findMany","PurchaseItem.createOne","PurchaseItem.createMany","PurchaseItem.createManyAndReturn","PurchaseItem.updateOne","PurchaseItem.updateMany","PurchaseItem.updateManyAndReturn","PurchaseItem.upsertOne","PurchaseItem.deleteOne","PurchaseItem.deleteMany","PurchaseItem.groupBy","PurchaseItem.aggregate","Sale.findUnique","Sale.findUniqueOrThrow","Sale.findFirst","Sale.findFirstOrThrow","Sale.findMany","Sale.createOne","Sale.createMany","Sale.createManyAndReturn","Sale.updateOne","Sale.updateMany","Sale.updateManyAndReturn","Sale.upsertOne","Sale.deleteOne","Sale.deleteMany","Sale.groupBy","Sale.aggregate","SaleItem.findUnique","SaleItem.findUniqueOrThrow","SaleItem.findFirst","SaleItem.findFirstOrThrow","SaleItem.findMany","SaleItem.createOne","SaleItem.createMany","SaleItem.createManyAndReturn","SaleItem.updateOne","SaleItem.updateMany","SaleItem.updateManyAndReturn","SaleItem.upsertOne","SaleItem.deleteOne","SaleItem.deleteMany","SaleItem.groupBy","SaleItem.aggregate","SaleReturn.findUnique","SaleReturn.findUniqueOrThrow","SaleReturn.findFirst","SaleReturn.findFirstOrThrow","SaleReturn.findMany","SaleReturn.createOne","SaleReturn.createMany","SaleReturn.createManyAndReturn","SaleReturn.updateOne","SaleReturn.updateMany","SaleReturn.updateManyAndReturn","SaleReturn.upsertOne","SaleReturn.deleteOne","SaleReturn.deleteMany","SaleReturn.groupBy","SaleReturn.aggregate","SaleReturnItem.findUnique","SaleReturnItem.findUniqueOrThrow","SaleReturnItem.findFirst","SaleReturnItem.findFirstOrThrow","SaleReturnItem.findMany","SaleReturnItem.createOne","SaleReturnItem.createMany","SaleReturnItem.createManyAndReturn","SaleReturnItem.updateOne","SaleReturnItem.updateMany","SaleReturnItem.updateManyAndReturn","SaleReturnItem.upsertOne","SaleReturnItem.deleteOne","SaleReturnItem.deleteMany","SaleReturnItem.groupBy","SaleReturnItem.aggregate","PurchaseReturn.findUnique","PurchaseReturn.findUniqueOrThrow","PurchaseReturn.findFirst","PurchaseReturn.findFirstOrThrow","PurchaseReturn.findMany","PurchaseReturn.createOne","PurchaseReturn.createMany","PurchaseReturn.createManyAndReturn","PurchaseReturn.updateOne","PurchaseReturn.updateMany","PurchaseReturn.updateManyAndReturn","PurchaseReturn.upsertOne","PurchaseReturn.deleteOne","PurchaseReturn.deleteMany","PurchaseReturn.groupBy","PurchaseReturn.aggregate","PurchaseReturnItem.findUnique","PurchaseReturnItem.findUniqueOrThrow","PurchaseReturnItem.findFirst","PurchaseReturnItem.findFirstOrThrow","PurchaseReturnItem.findMany","PurchaseReturnItem.createOne","PurchaseReturnItem.createMany","PurchaseReturnItem.createManyAndReturn","PurchaseReturnItem.updateOne","PurchaseReturnItem.updateMany","PurchaseReturnItem.updateManyAndReturn","PurchaseReturnItem.upsertOne","PurchaseReturnItem.deleteOne","PurchaseReturnItem.deleteMany","PurchaseReturnItem.groupBy","PurchaseReturnItem.aggregate","Production.findUnique","Production.findUniqueOrThrow","Production.findFirst","Production.findFirstOrThrow","Production.findMany","Production.createOne","Production.createMany","Production.createManyAndReturn","Production.updateOne","Production.updateMany","Production.updateManyAndReturn","Production.upsertOne","Production.deleteOne","Production.deleteMany","Production.groupBy","Production.aggregate","ProductionItem.findUnique","ProductionItem.findUniqueOrThrow","ProductionItem.findFirst","ProductionItem.findFirstOrThrow","ProductionItem.findMany","ProductionItem.createOne","ProductionItem.createMany","ProductionItem.createManyAndReturn","ProductionItem.updateOne","ProductionItem.updateMany","ProductionItem.updateManyAndReturn","ProductionItem.upsertOne","ProductionItem.deleteOne","ProductionItem.deleteMany","ProductionItem.groupBy","ProductionItem.aggregate","StockTransaction.findUnique","StockTransaction.findUniqueOrThrow","StockTransaction.findFirst","StockTransaction.findFirstOrThrow","StockTransaction.findMany","StockTransaction.createOne","StockTransaction.createMany","StockTransaction.createManyAndReturn","StockTransaction.updateOne","StockTransaction.updateMany","StockTransaction.updateManyAndReturn","StockTransaction.upsertOne","StockTransaction.deleteOne","StockTransaction.deleteMany","StockTransaction.groupBy","StockTransaction.aggregate","AuditLog.findUnique","AuditLog.findUniqueOrThrow","AuditLog.findFirst","AuditLog.findFirstOrThrow","AuditLog.findMany","AuditLog.createOne","AuditLog.createMany","AuditLog.createManyAndReturn","AuditLog.updateOne","AuditLog.updateMany","AuditLog.updateManyAndReturn","AuditLog.upsertOne","AuditLog.deleteOne","AuditLog.deleteMany","AuditLog.groupBy","AuditLog.aggregate","AND","OR","NOT","id","actorUserId","action","entityType","entityId","payloadJson","ipAddress","userAgent","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","transactionNo","sourceType","sourceId","StockTransactionType","transactionType","productId","warehouseId","partyId","quantity","rate","amount","referenceNo","notes","updatedAt","deletedAt","productionId","batchNo","issuedQty","issuedPcs","productionQty","productionPcs","voucherNo","productionDate","isRecurring","status","remarks","purchaseReturnId","hsn","pcs","baseRate","sizeDiff","netRate","taxableValue","gstRate","gstAmount","invoiceNo","supplierId","returnDate","expiryDate","vehicleNo","biltyNo","broker","totalAmount","saleReturnId","customerId","saleId","saleDate","purchaseId","productName","purchaseDate","categoryId","unitId","name","code","size","length","saleRate","purchaseRate","description","openingStockDate","unitBasis","isiMark","isActive","minStock","mobile","address","city","district","state","pinCode","gstin","every","some","none","location","isDefault","symbol","companyName","allowDuplicateBarcodes","allowNegativeStock","enableAutoBackup","backupIntervalHours","productionSettingsJson","fullName","username","passwordHash","roleId","lastLoginAt","permissionsJson","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "6wrfAdACCwcAAMAFACD9AgAAvwUAMP4CAAAPABD_AgAAvwUAMIADAgAAAAGIA0AAiQUAIaEDQACJBQAhogNAAIoFACHIAwEAAAAByQMBAAAAAewDAQCHBQAhAQAAAAEAIA8DAADEBQAgBQAAxQUAIP0CAADDBQAw_gIAAAMAEP8CAADDBQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAhogNAAIoFACGsAwEAhwUAIecDAQCHBQAh6AMBAIcFACHpAwEAhwUAIeoDAgCSBQAh6wNAAIoFACEEAwAAzgkAIAUAAM8JACCiAwAAxgUAIOsDAADGBQAgDwMAAMQFACAFAADFBQAg_QIAAMMFADD-AgAAAwAQ_wIAAMMFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIaIDQACKBQAhrAMBAIcFACHnAwEAhwUAIegDAQAAAAHpAwEAhwUAIeoDAgCSBQAh6wNAAIoFACEDAAAAAwAgAQAABAAwAgAABQAgDQQAAMIFACD9AgAAwQUAMP4CAAAHABD_AgAAwQUAMIADAgCSBQAhgQMCAKEFACGCAwEAhwUAIYMDAQCHBQAhhAMCAKEFACGFAwEAhwUAIYYDAQCIBQAhhwMBAIgFACGIA0AAiQUAIQUEAADNCQAggQMAAMYFACCEAwAAxgUAIIYDAADGBQAghwMAAMYFACANBAAAwgUAIP0CAADBBQAw_gIAAAcAEP8CAADBBQAwgAMCAAAAAYEDAgChBQAhggMBAIcFACGDAwEAhwUAIYQDAgChBQAhhQMBAIcFACGGAwEAiAUAIYcDAQCIBQAhiANAAIkFACEDAAAABwAgAQAACAAwAgAACQAgAQAAAAMAIAEAAAAHACABAAAAAwAgAQAAAAEAIAsHAADABQAg_QIAAL8FADD-AgAADwAQ_wIAAL8FADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHsAwEAhwUAIQIHAADMCQAgogMAAMYFACADAAAADwAgAQAAEAAwAgAAAQAgAwAAAA8AIAEAABAAMAIAAAEAIAMAAAAPACABAAAQADACAAABACAIBwAAywkAIIADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAHIAwEAAAAByQMBAAAAAewDAQAAAAEBDQAAFAAgB4ADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAHIAwEAAAAByQMBAAAAAewDAQAAAAEBDQAAFgAwAQ0AABYAMAgHAAC-CQAggAMCANAFACGIA0AAzwUAIaEDQADPBQAhogNAANoFACHIAwEAzAUAIckDAQDMBQAh7AMBAMwFACECAAAAAQAgDQAAGQAgB4ADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyAMBAMwFACHJAwEAzAUAIewDAQDMBQAhAgAAAA8AIA0AABsAIAIAAAAPACANAAAbACADAAAAAQAgFAAAFAAgFQAAGQAgAQAAAAEAIAEAAAAPACAGBgAAuQkAIBoAALoJACAbAAC9CQAgHAAAvAkAIB0AALsJACCiAwAAxgUAIAr9AgAAvgUAMP4CAAAiABD_AgAAvgUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhyAMBAN0EACHJAwEA3QQAIewDAQDdBAAhAwAAAA8AIAEAACEAMBkAACIAIAMAAAAPACABAAAQADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAwDAAC3CQAgBQAAuAkAIIADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAGsAwEAAAAB5wMBAAAAAegDAQAAAAHpAwEAAAAB6gMCAAAAAesDQAAAAAEBDQAAKgAgCoADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAGsAwEAAAAB5wMBAAAAAegDAQAAAAHpAwEAAAAB6gMCAAAAAesDQAAAAAEBDQAALAAwAQ0AACwAMAwDAACpCQAgBQAAqgkAIIADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhrAMBAMwFACHnAwEAzAUAIegDAQDMBQAh6QMBAMwFACHqAwIA0AUAIesDQADaBQAhAgAAAAUAIA0AAC8AIAqAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIawDAQDMBQAh5wMBAMwFACHoAwEAzAUAIekDAQDMBQAh6gMCANAFACHrA0AA2gUAIQIAAAADACANAAAxACACAAAAAwAgDQAAMQAgAwAAAAUAIBQAACoAIBUAAC8AIAEAAAAFACABAAAAAwAgBwYAAKQJACAaAAClCQAgGwAAqAkAIBwAAKcJACAdAACmCQAgogMAAMYFACDrAwAAxgUAIA39AgAAvQUAMP4CAAA4ABD_AgAAvQUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhrAMBAN0EACHnAwEA3QQAIegDAQDdBAAh6QMBAN0EACHqAwIA2wQAIesDQADvBAAhAwAAAAMAIAEAADcAMBkAADgAIAMAAAADACABAAAEADACAAAFACAM_QIAALwFADD-AgAAPgAQ_wIAALwFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIeEDAQCHBQAh4gMgAJMFACHjAyAAkwUAIeQDIACTBQAh5QMCAJIFACHmAwEAhwUAIQEAAAA7ACABAAAAOwAgDP0CAAC8BQAw_gIAAD4AEP8CAAC8BQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAh4QMBAIcFACHiAyAAkwUAIeMDIACTBQAh5AMgAJMFACHlAwIAkgUAIeYDAQCHBQAhAAMAAAA-ACABAAA_ADACAAA7ACADAAAAPgAgAQAAPwAwAgAAOwAgAwAAAD4AIAEAAD8AMAIAADsAIAmAAwIAAAABiANAAAAAAaEDQAAAAAHhAwEAAAAB4gMgAAAAAeMDIAAAAAHkAyAAAAAB5QMCAAAAAeYDAQAAAAEBDQAAQwAgCYADAgAAAAGIA0AAAAABoQNAAAAAAeEDAQAAAAHiAyAAAAAB4wMgAAAAAeQDIAAAAAHlAwIAAAAB5gMBAAAAAQENAABFADABDQAARQAwCYADAgDQBQAhiANAAM8FACGhA0AAzwUAIeEDAQDMBQAh4gMgAO8FACHjAyAA7wUAIeQDIADvBQAh5QMCANAFACHmAwEAzAUAIQIAAAA7ACANAABIACAJgAMCANAFACGIA0AAzwUAIaEDQADPBQAh4QMBAMwFACHiAyAA7wUAIeMDIADvBQAh5AMgAO8FACHlAwIA0AUAIeYDAQDMBQAhAgAAAD4AIA0AAEoAIAIAAAA-ACANAABKACADAAAAOwAgFAAAQwAgFQAASAAgAQAAADsAIAEAAAA-ACAFBgAAnwkAIBoAAKAJACAbAACjCQAgHAAAogkAIB0AAKEJACAM_QIAALsFADD-AgAAUQAQ_wIAALsFADCAAwIA2wQAIYgDQADfBAAhoQNAAN8EACHhAwEA3QQAIeIDIAD3BAAh4wMgAPcEACHkAyAA9wQAIeUDAgDbBAAh5gMBAN0EACEDAAAAPgAgAQAAUAAwGQAAUQAgAwAAAD4AIAEAAD8AMAIAADsAIAtBAACZBQAg_QIAALcFADD-AgAAWgAQ_wIAALcFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyAMBAAAAAckDAQAAAAHOAwEAiAUAIQEAAABUACAhQAAAuQUAIEIAALoFACBSAACPBQAgWAAAtAUAIFkAALIFACBaAACwBQAgWwAArAUAIFwAAKgFACD9AgAAuAUAMP4CAABWABD_AgAAuAUAMIADAgCSBQAhiANAAIkFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGvAwEAiAUAIbIDCACdBQAhtQMIAJ0FACHGAwIAoQUAIccDAgChBQAhyAMBAIcFACHJAwEAhwUAIcoDAQCIBQAhywMBAIgFACHMAwgAnQUAIc0DCACdBQAhzgMBAIgFACHPAwEAiAUAIdADAQCHBQAh0QMgAJMFACHSAyAAkwUAIdMDCACdBQAhEUAAAJ0JACBCAACeCQAgUgAAmwgAIFgAAJsJACBZAACaCQAgWgAAmQkAIFsAAJcJACBcAACVCQAgogMAAMYFACCkAwAAxgUAIK8DAADGBQAgxgMAAMYFACDHAwAAxgUAIMoDAADGBQAgywMAAMYFACDOAwAAxgUAIM8DAADGBQAgIUAAALkFACBCAAC6BQAgUgAAjwUAIFgAALQFACBZAACyBQAgWgAAsAUAIFsAAKwFACBcAACoBQAg_QIAALgFADD-AgAAVgAQ_wIAALgFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGvAwEAiAUAIbIDCACdBQAhtQMIAJ0FACHGAwIAoQUAIccDAgChBQAhyAMBAIcFACHJAwEAAAABygMBAIgFACHLAwEAiAUAIcwDCACdBQAhzQMIAJ0FACHOAwEAiAUAIc8DAQCIBQAh0AMBAIcFACHRAyAAkwUAIdIDIACTBQAh0wMIAJ0FACEDAAAAVgAgAQAAVwAwAgAAWAAgC0EAAJkFACD9AgAAtwUAMP4CAABaABD_AgAAtwUAMIADAgCSBQAhiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyAMBAIcFACHJAwEAhwUAIc4DAQCIBQAhAQAAAFoAIAtBAACZBQAg_QIAAJgFADD-AgAAXAAQ_wIAAJgFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHgAwEAiAUAIQEAAABcACADAAAAVgAgAQAAVwAwAgAAWAAgAQAAAFYAIBZJAACfBQAgVwAAtgUAIP0CAAC1BQAw_gIAAGAAEP8CAAC1BQAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhwwMCAJIFACHEAwEAiAUAIQZJAACRCQAgVwAAnAkAIKIDAADGBQAgrwMAAMYFACCwAwAAxgUAIMQDAADGBQAgFkkAAJ8FACBXAAC2BQAg_QIAALUFADD-AgAAYAAQ_wIAALUFADCAAwIAAAABiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrwMBAIgFACGwAwgAnAUAIbEDCACdBQAhsgMIAJ0FACGzAwgAnQUAIbQDCACdBQAhtQMIAJ0FACG2AwgAnQUAIcMDAgCSBQAhxAMBAIgFACEDAAAAYAAgAQAAYQAwAgAAYgAgFUMAAIsFACBSAACPBQAgVAAAjAUAIFUAAI0FACBWAACOBQAg_QIAAIYFADD-AgAAZAAQ_wIAAIYFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHUAwEAiAUAIdUDAQCIBQAh1gMBAIgFACHXAwEAiAUAIdgDAQCIBQAh2QMBAIgFACHaAwEAiAUAIQEAAABkACAZRwAAowUAIEoAALQFACBMAACkBQAg_QIAALMFADD-AgAAZgAQ_wIAALMFADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAhwUAIawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG4AwIAoQUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHFAwEAhwUAIQxHAACSCQAgSgAAmwkAIEwAAJMJACCiAwAAxgUAIKQDAADGBQAgrQMAAMYFACC3AwAAxgUAILgDAADGBQAgugMAAMYFACC7AwAAxgUAILwDAADGBQAgvQMAAMYFACAZRwAAowUAIEoAALQFACBMAACkBQAg_QIAALMFADD-AgAAZgAQ_wIAALMFADCAAwIAAAABiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQAAAAGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuAMCAKEFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhxQMBAIcFACEDAAAAZgAgAQAAZwAwAgAAaAAgGUQAAKQFACBHAACjBQAgSgAAsgUAIP0CAACxBQAw_gIAAGoAEP8CAACxBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcADAgChBQAhwgMBAIcFACEMRAAAkwkAIEcAAJIJACBKAACaCQAgogMAAMYFACCkAwAAxgUAIK0DAADGBQAgtwMAAMYFACC6AwAAxgUAILsDAADGBQAgvAMAAMYFACC9AwAAxgUAIMADAADGBQAgGUQAAKQFACBHAACjBQAgSgAAsgUAIP0CAACxBQAw_gIAAGoAEP8CAACxBQAwgAMCAAAAAYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAAAABrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHAAwIAoQUAIcIDAQCHBQAhAwAAAGoAIAEAAGsAMAIAAGwAIAEAAABkACADAAAAZgAgAQAAZwAwAgAAaAAgAwAAAGoAIAEAAGsAMAIAAGwAIBlEAACkBQAgRwAAowUAIEoAALAFACD9AgAArwUAMP4CAABxABD_AgAArwUAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQCHBQAhrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbkDAQCHBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcADAgChBQAhDEQAAJMJACBHAACSCQAgSgAAmQkAIKIDAADGBQAgpAMAAMYFACCtAwAAxgUAILcDAADGBQAgugMAAMYFACC7AwAAxgUAILwDAADGBQAgvQMAAMYFACDAAwAAxgUAIBlEAACkBQAgRwAAowUAIEoAALAFACD9AgAArwUAMP4CAABxABD_AgAArwUAMIADAgAAAAGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAAAAAawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG5AwEAhwUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHAAwIAoQUAIQMAAABxACABAAByADACAABzACABAAAAZAAgFUgAAK4FACBJAACfBQAg_QIAAK0FADD-AgAAdgAQ_wIAAK0FADCAAwIAkgUAIYgDQACJBQAhmQMCAJIFACGcAwgAnQUAIZ4DCACdBQAhoQNAAIkFACGiA0AAigUAIa8DAQCIBQAhsAMIAJwFACGxAwgAnQUAIbIDCACdBQAhswMIAJ0FACG0AwgAnQUAIbUDCACdBQAhtgMIAJ0FACG_AwIAkgUAIQVIAACYCQAgSQAAkQkAIKIDAADGBQAgrwMAAMYFACCwAwAAxgUAIBVIAACuBQAgSQAAnwUAIP0CAACtBQAw_gIAAHYAEP8CAACtBQAwgAMCAAAAAYgDQACJBQAhmQMCAJIFACGcAwgAnQUAIZ4DCACdBQAhoQNAAIkFACGiA0AAigUAIa8DAQCIBQAhsAMIAJwFACGxAwgAnQUAIbIDCACdBQAhswMIAJ0FACG0AwgAnQUAIbUDCACdBQAhtgMIAJ0FACG_AwIAkgUAIQMAAAB2ACABAAB3ADACAAB4ACABAAAAdgAgGUcAAKMFACBKAACsBQAgTAAApAUAIP0CAACrBQAw_gIAAHsAEP8CAACrBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuAMCAKEFACG5AwEAhwUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACEMRwAAkgkAIEoAAJcJACBMAACTCQAgogMAAMYFACCkAwAAxgUAIK0DAADGBQAgtwMAAMYFACC4AwAAxgUAILoDAADGBQAguwMAAMYFACC8AwAAxgUAIL0DAADGBQAgGUcAAKMFACBKAACsBQAgTAAApAUAIP0CAACrBQAw_gIAAHsAEP8CAACrBQAwgAMCAAAAAYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAAAABrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbgDAgChBQAhuQMBAIcFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhAwAAAHsAIAEAAHwAMAIAAH0AIAEAAABkACAVSQAAnwUAIE0AAKoFACD9AgAAqQUAMP4CAACAAQAQ_wIAAKkFADCAAwIAkgUAIYgDQACJBQAhmQMCAJIFACGcAwgAnQUAIZ4DCACdBQAhoQNAAIkFACGiA0AAigUAIa4DAgCSBQAhrwMBAIgFACGwAwgAnAUAIbEDCACdBQAhsgMIAJ0FACGzAwgAnQUAIbQDCACdBQAhtQMIAJ0FACG2AwgAnQUAIQVJAACRCQAgTQAAlgkAIKIDAADGBQAgrwMAAMYFACCwAwAAxgUAIBVJAACfBQAgTQAAqgUAIP0CAACpBQAw_gIAAIABABD_AgAAqQUAMIADAgAAAAGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGuAwIAkgUAIa8DAQCIBQAhsAMIAJwFACGxAwgAnQUAIbIDCACdBQAhswMIAJ0FACG0AwgAnQUAIbUDCACdBQAhtgMIAJ0FACEDAAAAgAEAIAEAAIEBADACAACCAQAgAQAAAIABACAPRwAAowUAIEoAAKgFACD9AgAApwUAMP4CAACFAQAQ_wIAAKcFADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhqQMBAIcFACGqAwEAhwUAIasDIACTBQAhrAMBAIcFACGtAwEAiAUAIQRHAACSCQAgSgAAlQkAIKIDAADGBQAgrQMAAMYFACAPRwAAowUAIEoAAKgFACD9AgAApwUAMP4CAACFAQAQ_wIAAKcFADCAAwIAAAABiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGpAwEAAAABqgMBAIcFACGrAyAAkwUAIawDAQCHBQAhrQMBAIgFACEDAAAAhQEAIAEAAIYBADACAACHAQAgEEkAAJ8FACBPAACmBQAg_QIAAKUFADD-AgAAiQEAEP8CAAClBQAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhoQNAAIkFACGiA0AAigUAIaMDAgCSBQAhpAMBAIgFACGlAwgAnQUAIaYDCACdBQAhpwMIAJ0FACGoAwgAnQUAIQRJAACRCQAgTwAAlAkAIKIDAADGBQAgpAMAAMYFACAQSQAAnwUAIE8AAKYFACD9AgAApQUAMP4CAACJAQAQ_wIAAKUFADCAAwIAAAABiANAAIkFACGZAwIAkgUAIaEDQACJBQAhogNAAIoFACGjAwIAkgUAIaQDAQCIBQAhpQMIAJ0FACGmAwgAnQUAIacDCACdBQAhqAMIAJ0FACEDAAAAiQEAIAEAAIoBADACAACLAQAgAQAAAIkBACAWRwAAowUAIEkAAJ8FACBRAACkBQAg_QIAAKAFADD-AgAAjgEAEP8CAACgBQAwgAMCAJIFACGIA0AAiQUAIZQDAQCHBQAhlQMBAIcFACGWAwIAoQUAIZgDAACiBZgDIpkDAgCSBQAhmgMCAJIFACGbAwIAoQUAIZwDCACdBQAhnQMIAJ0FACGeAwgAnQUAIZ8DAQCIBQAhoAMBAIgFACGhA0AAiQUAIaIDQACKBQAhCEcAAJIJACBJAACRCQAgUQAAkwkAIJYDAADGBQAgmwMAAMYFACCfAwAAxgUAIKADAADGBQAgogMAAMYFACAWRwAAowUAIEkAAJ8FACBRAACkBQAg_QIAAKAFADD-AgAAjgEAEP8CAACgBQAwgAMCAAAAAYgDQACJBQAhlAMBAAAAAZUDAQCHBQAhlgMCAKEFACGYAwAAogWYAyKZAwIAkgUAIZoDAgCSBQAhmwMCAKEFACGcAwgAnQUAIZ0DCACdBQAhngMIAJ0FACGfAwEAiAUAIaADAQCIBQAhoQNAAIkFACGiA0AAigUAIQMAAACOAQAgAQAAjwEAMAIAAJABACABAAAAZAAgAQAAAGYAIAEAAABqACABAAAAcQAgAQAAAHsAIAEAAACFAQAgAQAAAI4BACAVSQAAnwUAIFMAAJ4FACD9AgAAmwUAMP4CAACZAQAQ_wIAAJsFADCAAwIAkgUAIYgDQACJBQAhmQMCAJIFACGcAwgAnQUAIZ4DCACdBQAhoQNAAIkFACGiA0AAigUAIa8DAQCIBQAhsAMIAJwFACGxAwgAnQUAIbIDCACdBQAhswMIAJ0FACG0AwgAnQUAIbUDCACdBQAhtgMIAJ0FACHBAwIAkgUAIQVJAACRCQAgUwAAkAkAIKIDAADGBQAgrwMAAMYFACCwAwAAxgUAIBVJAACfBQAgUwAAngUAIP0CAACbBQAw_gIAAJkBABD_AgAAmwUAMIADAgAAAAGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhwQMCAJIFACEDAAAAmQEAIAEAAJoBADACAACbAQAgAQAAAJkBACADAAAAcQAgAQAAcgAwAgAAcwAgAwAAAHsAIAEAAHwAMAIAAH0AIAMAAACOAQAgAQAAjwEAMAIAAJABACABAAAAZgAgAQAAAGoAIAEAAABxACABAAAAewAgAQAAAI4BACADAAAAYAAgAQAAYQAwAgAAYgAgAQAAAGAAIAMAAACZAQAgAQAAmgEAMAIAAJsBACADAAAAdgAgAQAAdwAwAgAAeAAgAwAAAIABACABAACBAQAwAgAAggEAIAMAAACJAQAgAQAAigEAMAIAAIsBACADAAAAjgEAIAEAAI8BADACAACQAQAgAQAAAGAAIAEAAACZAQAgAQAAAHYAIAEAAACAAQAgAQAAAIkBACABAAAAjgEAIAEAAABWACABAAAAVAAgA0EAAP8IACCiAwAAxgUAIM4DAADGBQAgAwAAAFoAIAEAALUBADACAABUACADAAAAWgAgAQAAtQEAMAIAAFQAIAMAAABaACABAAC1AQAwAgAAVAAgCEEAAI8JACCAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAAByAMBAAAAAckDAQAAAAHOAwEAAAABAQ0AALkBACAHgAMCAAAAAYgDQAAAAAGhA0AAAAABogNAAAAAAcgDAQAAAAHJAwEAAAABzgMBAAAAAQENAAC7AQAwAQ0AALsBADAIQQAAhQkAIIADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyAMBAMwFACHJAwEAzAUAIc4DAQDOBQAhAgAAAFQAIA0AAL4BACAHgAMCANAFACGIA0AAzwUAIaEDQADPBQAhogNAANoFACHIAwEAzAUAIckDAQDMBQAhzgMBAM4FACECAAAAWgAgDQAAwAEAIAIAAABaACANAADAAQAgAwAAAFQAIBQAALkBACAVAAC-AQAgAQAAAFQAIAEAAABaACAHBgAAgAkAIBoAAIEJACAbAACECQAgHAAAgwkAIB0AAIIJACCiAwAAxgUAIM4DAADGBQAgCv0CAACaBQAw_gIAAMcBABD_AgAAmgUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhyAMBAN0EACHJAwEA3QQAIc4DAQDeBAAhAwAAAFoAIAEAAMYBADAZAADHAQAgAwAAAFoAIAEAALUBADACAABUACALQQAAmQUAIP0CAACYBQAw_gIAAFwAEP8CAACYBQAwgAMCAAAAAYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQAAAAHJAwEAAAAB4AMBAIgFACEBAAAAygEAIAEAAADKAQAgA0EAAP8IACCiAwAAxgUAIOADAADGBQAgAwAAAFwAIAEAAM0BADACAADKAQAgAwAAAFwAIAEAAM0BADACAADKAQAgAwAAAFwAIAEAAM0BADACAADKAQAgCEEAAP4IACCAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAAByAMBAAAAAckDAQAAAAHgAwEAAAABAQ0AANEBACAHgAMCAAAAAYgDQAAAAAGhA0AAAAABogNAAAAAAcgDAQAAAAHJAwEAAAAB4AMBAAAAAQENAADTAQAwAQ0AANMBADAIQQAA8QgAIIADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyAMBAMwFACHJAwEAzAUAIeADAQDOBQAhAgAAAMoBACANAADWAQAgB4ADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyAMBAMwFACHJAwEAzAUAIeADAQDOBQAhAgAAAFwAIA0AANgBACACAAAAXAAgDQAA2AEAIAMAAADKAQAgFAAA0QEAIBUAANYBACABAAAAygEAIAEAAABcACAHBgAA7AgAIBoAAO0IACAbAADwCAAgHAAA7wgAIB0AAO4IACCiAwAAxgUAIOADAADGBQAgCv0CAACXBQAw_gIAAN8BABD_AgAAlwUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhyAMBAN0EACHJAwEA3QQAIeADAQDeBAAhAwAAAFwAIAEAAN4BADAZAADfAQAgAwAAAFwAIAEAAM0BADACAADKAQAgCf0CAACWBQAw_gIAAOUBABD_AgAAlgUAMIADAgAAAAGIA0AAiQUAIaEDQACJBQAhogNAAIoFACHJAwEAAAABzgMBAIgFACEBAAAA4gEAIAEAAADiAQAgCf0CAACWBQAw_gIAAOUBABD_AgAAlgUAMIADAgCSBQAhiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyQMBAIcFACHOAwEAiAUAIQKiAwAAxgUAIM4DAADGBQAgAwAAAOUBACABAADmAQAwAgAA4gEAIAMAAADlAQAgAQAA5gEAMAIAAOIBACADAAAA5QEAIAEAAOYBADACAADiAQAgBoADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAHJAwEAAAABzgMBAAAAAQENAADqAQAgBoADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAHJAwEAAAABzgMBAAAAAQENAADsAQAwAQ0AAOwBADAGgAMCANAFACGIA0AAzwUAIaEDQADPBQAhogNAANoFACHJAwEAzAUAIc4DAQDOBQAhAgAAAOIBACANAADvAQAgBoADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyQMBAMwFACHOAwEAzgUAIQIAAADlAQAgDQAA8QEAIAIAAADlAQAgDQAA8QEAIAMAAADiAQAgFAAA6gEAIBUAAO8BACABAAAA4gEAIAEAAADlAQAgBwYAAOcIACAaAADoCAAgGwAA6wgAIBwAAOoIACAdAADpCAAgogMAAMYFACDOAwAAxgUAIAn9AgAAlQUAMP4CAAD4AQAQ_wIAAJUFADCAAwIA2wQAIYgDQADfBAAhoQNAAN8EACGiA0AA7wQAIckDAQDdBAAhzgMBAN4EACEDAAAA5QEAIAEAAPcBADAZAAD4AQAgAwAAAOUBACABAADmAQAwAgAA4gEAIBFFAACLBQAgRgAAjAUAIEsAAI0FACBOAACOBQAgUAAAlAUAIFIAAI8FACD9AgAAkQUAMP4CAAD-AQAQ_wIAAJEFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyAMBAAAAAckDAQAAAAHeAwEAiAUAId8DIACTBQAhAQAAAPsBACABAAAA-wEAIBFFAACLBQAgRgAAjAUAIEsAAI0FACBOAACOBQAgUAAAlAUAIFIAAI8FACD9AgAAkQUAMP4CAAD-AQAQ_wIAAJEFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHeAwEAiAUAId8DIACTBQAhCEUAAJcIACBGAACYCAAgSwAAmQgAIE4AAJoIACBQAADmCAAgUgAAmwgAIKIDAADGBQAg3gMAAMYFACADAAAA_gEAIAEAAP8BADACAAD7AQAgAwAAAP4BACABAAD_AQAwAgAA-wEAIAMAAAD-AQAgAQAA_wEAMAIAAPsBACAORQAA4AgAIEYAAOEIACBLAADiCAAgTgAA4wgAIFAAAOQIACBSAADlCAAggAMCAAAAAYgDQAAAAAGhA0AAAAABogNAAAAAAcgDAQAAAAHJAwEAAAAB3gMBAAAAAd8DIAAAAAEBDQAAgwIAIAiAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAAByAMBAAAAAckDAQAAAAHeAwEAAAAB3wMgAAAAAQENAACFAgAwAQ0AAIUCADAORQAAoQgAIEYAAKIIACBLAACjCAAgTgAApAgAIFAAAKUIACBSAACmCAAggAMCANAFACGIA0AAzwUAIaEDQADPBQAhogNAANoFACHIAwEAzAUAIckDAQDMBQAh3gMBAM4FACHfAyAA7wUAIQIAAAD7AQAgDQAAiAIAIAiAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIcgDAQDMBQAhyQMBAMwFACHeAwEAzgUAId8DIADvBQAhAgAAAP4BACANAACKAgAgAgAAAP4BACANAACKAgAgAwAAAPsBACAUAACDAgAgFQAAiAIAIAEAAAD7AQAgAQAAAP4BACAHBgAAnAgAIBoAAJ0IACAbAACgCAAgHAAAnwgAIB0AAJ4IACCiAwAAxgUAIN4DAADGBQAgC_0CAACQBQAw_gIAAJECABD_AgAAkAUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhyAMBAN0EACHJAwEA3QQAId4DAQDeBAAh3wMgAPcEACEDAAAA_gEAIAEAAJACADAZAACRAgAgAwAAAP4BACABAAD_AQAwAgAA-wEAIBVDAACLBQAgUgAAjwUAIFQAAIwFACBVAACNBQAgVgAAjgUAIP0CAACGBQAw_gIAAGQAEP8CAACGBQAwgAMCAAAAAYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAAAAAdQDAQCIBQAh1QMBAIgFACHWAwEAiAUAIdcDAQCIBQAh2AMBAIgFACHZAwEAiAUAIdoDAQCIBQAhAQAAAJQCACABAAAAlAIAIA1DAACXCAAgUgAAmwgAIFQAAJgIACBVAACZCAAgVgAAmggAIKIDAADGBQAg1AMAAMYFACDVAwAAxgUAINYDAADGBQAg1wMAAMYFACDYAwAAxgUAINkDAADGBQAg2gMAAMYFACADAAAAZAAgAQAAlwIAMAIAAJQCACADAAAAZAAgAQAAlwIAMAIAAJQCACADAAAAZAAgAQAAlwIAMAIAAJQCACASQwAAkggAIFIAAJYIACBUAACTCAAgVQAAlAgAIFYAAJUIACCAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAAByAMBAAAAAckDAQAAAAHUAwEAAAAB1QMBAAAAAdYDAQAAAAHXAwEAAAAB2AMBAAAAAdkDAQAAAAHaAwEAAAABAQ0AAJsCACANgAMCAAAAAYgDQAAAAAGhA0AAAAABogNAAAAAAcgDAQAAAAHJAwEAAAAB1AMBAAAAAdUDAQAAAAHWAwEAAAAB1wMBAAAAAdgDAQAAAAHZAwEAAAAB2gMBAAAAAQENAACdAgAwAQ0AAJ0CADASQwAA1AcAIFIAANgHACBUAADVBwAgVQAA1gcAIFYAANcHACCAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIcgDAQDMBQAhyQMBAMwFACHUAwEAzgUAIdUDAQDOBQAh1gMBAM4FACHXAwEAzgUAIdgDAQDOBQAh2QMBAM4FACHaAwEAzgUAIQIAAACUAgAgDQAAoAIAIA2AAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIcgDAQDMBQAhyQMBAMwFACHUAwEAzgUAIdUDAQDOBQAh1gMBAM4FACHXAwEAzgUAIdgDAQDOBQAh2QMBAM4FACHaAwEAzgUAIQIAAABkACANAACiAgAgAgAAAGQAIA0AAKICACADAAAAlAIAIBQAAJsCACAVAACgAgAgAQAAAJQCACABAAAAZAAgDQYAAM8HACAaAADQBwAgGwAA0wcAIBwAANIHACAdAADRBwAgogMAAMYFACDUAwAAxgUAINUDAADGBQAg1gMAAMYFACDXAwAAxgUAINgDAADGBQAg2QMAAMYFACDaAwAAxgUAIBD9AgAAhQUAMP4CAACpAgAQ_wIAAIUFADCAAwIA2wQAIYgDQADfBAAhoQNAAN8EACGiA0AA7wQAIcgDAQDdBAAhyQMBAN0EACHUAwEA3gQAIdUDAQDeBAAh1gMBAN4EACHXAwEA3gQAIdgDAQDeBAAh2QMBAN4EACHaAwEA3gQAIQMAAABkACABAACoAgAwGQAAqQIAIAMAAABkACABAACXAgAwAgAAlAIAIAEAAABYACABAAAAWAAgAwAAAFYAIAEAAFcAMAIAAFgAIAMAAABWACABAABXADACAABYACADAAAAVgAgAQAAVwAwAgAAWAAgHkAAAMcHACBCAADIBwAgUgAAzgcAIFgAAMkHACBZAADKBwAgWgAAywcAIFsAAMwHACBcAADNBwAggAMCAAAAAYgDQAAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGvAwEAAAABsgMIAAAAAbUDCAAAAAHGAwIAAAABxwMCAAAAAcgDAQAAAAHJAwEAAAABygMBAAAAAcsDAQAAAAHMAwgAAAABzQMIAAAAAc4DAQAAAAHPAwEAAAAB0AMBAAAAAdEDIAAAAAHSAyAAAAAB0wMIAAAAAQENAACxAgAgFoADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABrwMBAAAAAbIDCAAAAAG1AwgAAAABxgMCAAAAAccDAgAAAAHIAwEAAAAByQMBAAAAAcoDAQAAAAHLAwEAAAABzAMIAAAAAc0DCAAAAAHOAwEAAAABzwMBAAAAAdADAQAAAAHRAyAAAAAB0gMgAAAAAdMDCAAAAAEBDQAAswIAMAENAACzAgAwAQAAAFoAIAEAAABcACAeQAAAhgcAIEIAAIcHACBSAACNBwAgWAAAiAcAIFkAAIkHACBaAACKBwAgWwAAiwcAIFwAAIwHACCAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhrwMBAM4FACGyAwgA2QUAIbUDCADZBQAhxgMCAM0FACHHAwIAzQUAIcgDAQDMBQAhyQMBAMwFACHKAwEAzgUAIcsDAQDOBQAhzAMIANkFACHNAwgA2QUAIc4DAQDOBQAhzwMBAM4FACHQAwEAzAUAIdEDIADvBQAh0gMgAO8FACHTAwgA2QUAIQIAAABYACANAAC4AgAgFoADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGvAwEAzgUAIbIDCADZBQAhtQMIANkFACHGAwIAzQUAIccDAgDNBQAhyAMBAMwFACHJAwEAzAUAIcoDAQDOBQAhywMBAM4FACHMAwgA2QUAIc0DCADZBQAhzgMBAM4FACHPAwEAzgUAIdADAQDMBQAh0QMgAO8FACHSAyAA7wUAIdMDCADZBQAhAgAAAFYAIA0AALoCACACAAAAVgAgDQAAugIAIAEAAABaACABAAAAXAAgAwAAAFgAIBQAALECACAVAAC4AgAgAQAAAFgAIAEAAABWACAOBgAAgQcAIBoAAIIHACAbAACFBwAgHAAAhAcAIB0AAIMHACCiAwAAxgUAIKQDAADGBQAgrwMAAMYFACDGAwAAxgUAIMcDAADGBQAgygMAAMYFACDLAwAAxgUAIM4DAADGBQAgzwMAAMYFACAZ_QIAAIQFADD-AgAAwwIAEP8CAACEBQAwgAMCANsEACGIA0AA3wQAIaEDQADfBAAhogNAAO8EACGkAwEA3gQAIa8DAQDeBAAhsgMIAO4EACG1AwgA7gQAIcYDAgDcBAAhxwMCANwEACHIAwEA3QQAIckDAQDdBAAhygMBAN4EACHLAwEA3gQAIcwDCADuBAAhzQMIAO4EACHOAwEA3gQAIc8DAQDeBAAh0AMBAN0EACHRAyAA9wQAIdIDIAD3BAAh0wMIAO4EACEDAAAAVgAgAQAAwgIAMBkAAMMCACADAAAAVgAgAQAAVwAwAgAAWAAgAQAAAGgAIAEAAABoACADAAAAZgAgAQAAZwAwAgAAaAAgAwAAAGYAIAEAAGcAMAIAAGgAIAMAAABmACABAABnADACAABoACAWRwAA_wYAIEoAAIAHACBMAAD-BgAggAMCAAAAAYgDQAAAAAGaAwIAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABqQMBAAAAAawDAQAAAAGtAwEAAAABtAMIAAAAAbYDCAAAAAG3AwEAAAABuAMCAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwgAAAABxQMBAAAAAQENAADLAgAgE4ADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAbgDAgAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAAcUDAQAAAAEBDQAAzQIAMAENAADNAgAwAQAAAGQAIBZHAADwBgAgSgAA8QYAIEwAAO8GACCAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGpAwEAzAUAIawDAQDMBQAhrQMBAM4FACG0AwgA2QUAIbYDCADZBQAhtwMBAM4FACG4AwIAzQUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACHFAwEAzAUAIQIAAABoACANAADRAgAgE4ADAgDQBQAhiANAAM8FACGaAwIA0AUAIaEDQADPBQAhogNAANoFACGkAwEAzgUAIakDAQDMBQAhrAMBAMwFACGtAwEAzgUAIbQDCADZBQAhtgMIANkFACG3AwEAzgUAIbgDAgDNBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIcUDAQDMBQAhAgAAAGYAIA0AANMCACACAAAAZgAgDQAA0wIAIAEAAABkACADAAAAaAAgFAAAywIAIBUAANECACABAAAAaAAgAQAAAGYAIA4GAADqBgAgGgAA6wYAIBsAAO4GACAcAADtBgAgHQAA7AYAIKIDAADGBQAgpAMAAMYFACCtAwAAxgUAILcDAADGBQAguAMAAMYFACC6AwAAxgUAILsDAADGBQAgvAMAAMYFACC9AwAAxgUAIBb9AgAAgwUAMP4CAADbAgAQ_wIAAIMFADCAAwIA2wQAIYgDQADfBAAhmgMCANsEACGhA0AA3wQAIaIDQADvBAAhpAMBAN4EACGpAwEA3QQAIawDAQDdBAAhrQMBAN4EACG0AwgA7gQAIbYDCADuBAAhtwMBAN4EACG4AwIA3AQAIboDAQDeBAAhuwMBAN4EACG8AwEA3gQAIb0DAQDeBAAhvgMIAO4EACHFAwEA3QQAIQMAAABmACABAADaAgAwGQAA2wIAIAMAAABmACABAABnADACAABoACABAAAAYgAgAQAAAGIAIAMAAABgACABAABhADACAABiACADAAAAYAAgAQAAYQAwAgAAYgAgAwAAAGAAIAEAAGEAMAIAAGIAIBNJAADpBgAgVwAA6AYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGvAwEAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAAAAAbQDCAAAAAG1AwgAAAABtgMIAAAAAcMDAgAAAAHEAwEAAAABAQ0AAOMCACARgAMCAAAAAYgDQAAAAAGZAwIAAAABnAMIAAAAAZ4DCAAAAAGhA0AAAAABogNAAAAAAa8DAQAAAAGwAwgAAAABsQMIAAAAAbIDCAAAAAGzAwgAAAABtAMIAAAAAbUDCAAAAAG2AwgAAAABwwMCAAAAAcQDAQAAAAEBDQAA5QIAMAENAADlAgAwE0kAAOcGACBXAADmBgAggAMCANAFACGIA0AAzwUAIZkDAgDQBQAhnAMIANkFACGeAwgA2QUAIaEDQADPBQAhogNAANoFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhwwMCANAFACHEAwEAzgUAIQIAAABiACANAADoAgAgEYADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrwMBAM4FACGwAwgAhQYAIbEDCADZBQAhsgMIANkFACGzAwgA2QUAIbQDCADZBQAhtQMIANkFACG2AwgA2QUAIcMDAgDQBQAhxAMBAM4FACECAAAAYAAgDQAA6gIAIAIAAABgACANAADqAgAgAwAAAGIAIBQAAOMCACAVAADoAgAgAQAAAGIAIAEAAABgACAJBgAA4QYAIBoAAOIGACAbAADlBgAgHAAA5AYAIB0AAOMGACCiAwAAxgUAIK8DAADGBQAgsAMAAMYFACDEAwAAxgUAIBT9AgAAggUAMP4CAADxAgAQ_wIAAIIFADCAAwIA2wQAIYgDQADfBAAhmQMCANsEACGcAwgA7gQAIZ4DCADuBAAhoQNAAN8EACGiA0AA7wQAIa8DAQDeBAAhsAMIAPsEACGxAwgA7gQAIbIDCADuBAAhswMIAO4EACG0AwgA7gQAIbUDCADuBAAhtgMIAO4EACHDAwIA2wQAIcQDAQDeBAAhAwAAAGAAIAEAAPACADAZAADxAgAgAwAAAGAAIAEAAGEAMAIAAGIAIAEAAABsACABAAAAbAAgAwAAAGoAIAEAAGsAMAIAAGwAIAMAAABqACABAABrADACAABsACADAAAAagAgAQAAawAwAgAAbAAgFkQAAN4GACBHAADfBgAgSgAA4AYAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwgAAAABwAMCAAAAAcIDAQAAAAEBDQAA-QIAIBOAAwIAAAABiANAAAAAAZoDAgAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGpAwEAAAABrAMBAAAAAa0DAQAAAAG0AwgAAAABtgMIAAAAAbcDAQAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAAcADAgAAAAHCAwEAAAABAQ0AAPsCADABDQAA-wIAMAEAAABkACAWRAAAzwYAIEcAANAGACBKAADRBgAggAMCANAFACGIA0AAzwUAIZoDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhqQMBAMwFACGsAwEAzAUAIa0DAQDOBQAhtAMIANkFACG2AwgA2QUAIbcDAQDOBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIcADAgDNBQAhwgMBAMwFACECAAAAbAAgDQAA_wIAIBOAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGpAwEAzAUAIawDAQDMBQAhrQMBAM4FACG0AwgA2QUAIbYDCADZBQAhtwMBAM4FACG6AwEAzgUAIbsDAQDOBQAhvAMBAM4FACG9AwEAzgUAIb4DCADZBQAhwAMCAM0FACHCAwEAzAUAIQIAAABqACANAACBAwAgAgAAAGoAIA0AAIEDACABAAAAZAAgAwAAAGwAIBQAAPkCACAVAAD_AgAgAQAAAGwAIAEAAABqACAOBgAAygYAIBoAAMsGACAbAADOBgAgHAAAzQYAIB0AAMwGACCiAwAAxgUAIKQDAADGBQAgrQMAAMYFACC3AwAAxgUAILoDAADGBQAguwMAAMYFACC8AwAAxgUAIL0DAADGBQAgwAMAAMYFACAW_QIAAIEFADD-AgAAiQMAEP8CAACBBQAwgAMCANsEACGIA0AA3wQAIZoDAgDbBAAhoQNAAN8EACGiA0AA7wQAIaQDAQDeBAAhqQMBAN0EACGsAwEA3QQAIa0DAQDeBAAhtAMIAO4EACG2AwgA7gQAIbcDAQDeBAAhugMBAN4EACG7AwEA3gQAIbwDAQDeBAAhvQMBAN4EACG-AwgA7gQAIcADAgDcBAAhwgMBAN0EACEDAAAAagAgAQAAiAMAMBkAAIkDACADAAAAagAgAQAAawAwAgAAbAAgAQAAAJsBACABAAAAmwEAIAMAAACZAQAgAQAAmgEAMAIAAJsBACADAAAAmQEAIAEAAJoBADACAACbAQAgAwAAAJkBACABAACaAQAwAgAAmwEAIBJJAADJBgAgUwAAyAYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGvAwEAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAAAAAbQDCAAAAAG1AwgAAAABtgMIAAAAAcEDAgAAAAEBDQAAkQMAIBCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAHBAwIAAAABAQ0AAJMDADABDQAAkwMAMBJJAADHBgAgUwAAxgYAIIADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrwMBAM4FACGwAwgAhQYAIbEDCADZBQAhsgMIANkFACGzAwgA2QUAIbQDCADZBQAhtQMIANkFACG2AwgA2QUAIcEDAgDQBQAhAgAAAJsBACANAACWAwAgEIADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrwMBAM4FACGwAwgAhQYAIbEDCADZBQAhsgMIANkFACGzAwgA2QUAIbQDCADZBQAhtQMIANkFACG2AwgA2QUAIcEDAgDQBQAhAgAAAJkBACANAACYAwAgAgAAAJkBACANAACYAwAgAwAAAJsBACAUAACRAwAgFQAAlgMAIAEAAACbAQAgAQAAAJkBACAIBgAAwQYAIBoAAMIGACAbAADFBgAgHAAAxAYAIB0AAMMGACCiAwAAxgUAIK8DAADGBQAgsAMAAMYFACAT_QIAAIAFADD-AgAAnwMAEP8CAACABQAwgAMCANsEACGIA0AA3wQAIZkDAgDbBAAhnAMIAO4EACGeAwgA7gQAIaEDQADfBAAhogNAAO8EACGvAwEA3gQAIbADCAD7BAAhsQMIAO4EACGyAwgA7gQAIbMDCADuBAAhtAMIAO4EACG1AwgA7gQAIbYDCADuBAAhwQMCANsEACEDAAAAmQEAIAEAAJ4DADAZAACfAwAgAwAAAJkBACABAACaAQAwAgAAmwEAIAEAAABzACABAAAAcwAgAwAAAHEAIAEAAHIAMAIAAHMAIAMAAABxACABAAByADACAABzACADAAAAcQAgAQAAcgAwAgAAcwAgFkQAAL4GACBHAAC_BgAgSgAAwAYAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAbkDAQAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAAcADAgAAAAEBDQAApwMAIBOAAwIAAAABiANAAAAAAZoDAgAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGpAwEAAAABrAMBAAAAAa0DAQAAAAG0AwgAAAABtgMIAAAAAbcDAQAAAAG5AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DCAAAAAHAAwIAAAABAQ0AAKkDADABDQAAqQMAMAEAAABkACAWRAAArwYAIEcAALAGACBKAACxBgAggAMCANAFACGIA0AAzwUAIZoDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhqQMBAMwFACGsAwEAzAUAIa0DAQDOBQAhtAMIANkFACG2AwgA2QUAIbcDAQDOBQAhuQMBAMwFACG6AwEAzgUAIbsDAQDOBQAhvAMBAM4FACG9AwEAzgUAIb4DCADZBQAhwAMCAM0FACECAAAAcwAgDQAArQMAIBOAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGpAwEAzAUAIawDAQDMBQAhrQMBAM4FACG0AwgA2QUAIbYDCADZBQAhtwMBAM4FACG5AwEAzAUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACHAAwIAzQUAIQIAAABxACANAACvAwAgAgAAAHEAIA0AAK8DACABAAAAZAAgAwAAAHMAIBQAAKcDACAVAACtAwAgAQAAAHMAIAEAAABxACAOBgAAqgYAIBoAAKsGACAbAACuBgAgHAAArQYAIB0AAKwGACCiAwAAxgUAIKQDAADGBQAgrQMAAMYFACC3AwAAxgUAILoDAADGBQAguwMAAMYFACC8AwAAxgUAIL0DAADGBQAgwAMAAMYFACAW_QIAAP8EADD-AgAAtwMAEP8CAAD_BAAwgAMCANsEACGIA0AA3wQAIZoDAgDbBAAhoQNAAN8EACGiA0AA7wQAIaQDAQDeBAAhqQMBAN0EACGsAwEA3QQAIa0DAQDeBAAhtAMIAO4EACG2AwgA7gQAIbcDAQDeBAAhuQMBAN0EACG6AwEA3gQAIbsDAQDeBAAhvAMBAN4EACG9AwEA3gQAIb4DCADuBAAhwAMCANwEACEDAAAAcQAgAQAAtgMAMBkAALcDACADAAAAcQAgAQAAcgAwAgAAcwAgAQAAAHgAIAEAAAB4ACADAAAAdgAgAQAAdwAwAgAAeAAgAwAAAHYAIAEAAHcAMAIAAHgAIAMAAAB2ACABAAB3ADACAAB4ACASSAAAqAYAIEkAAKkGACCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAG_AwIAAAABAQ0AAL8DACAQgAMCAAAAAYgDQAAAAAGZAwIAAAABnAMIAAAAAZ4DCAAAAAGhA0AAAAABogNAAAAAAa8DAQAAAAGwAwgAAAABsQMIAAAAAbIDCAAAAAGzAwgAAAABtAMIAAAAAbUDCAAAAAG2AwgAAAABvwMCAAAAAQENAADBAwAwAQ0AAMEDADASSAAApgYAIEkAAKcGACCAAwIA0AUAIYgDQADPBQAhmQMCANAFACGcAwgA2QUAIZ4DCADZBQAhoQNAAM8FACGiA0AA2gUAIa8DAQDOBQAhsAMIAIUGACGxAwgA2QUAIbIDCADZBQAhswMIANkFACG0AwgA2QUAIbUDCADZBQAhtgMIANkFACG_AwIA0AUAIQIAAAB4ACANAADEAwAgEIADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrwMBAM4FACGwAwgAhQYAIbEDCADZBQAhsgMIANkFACGzAwgA2QUAIbQDCADZBQAhtQMIANkFACG2AwgA2QUAIb8DAgDQBQAhAgAAAHYAIA0AAMYDACACAAAAdgAgDQAAxgMAIAMAAAB4ACAUAAC_AwAgFQAAxAMAIAEAAAB4ACABAAAAdgAgCAYAAKEGACAaAACiBgAgGwAApQYAIBwAAKQGACAdAACjBgAgogMAAMYFACCvAwAAxgUAILADAADGBQAgE_0CAAD-BAAw_gIAAM0DABD_AgAA_gQAMIADAgDbBAAhiANAAN8EACGZAwIA2wQAIZwDCADuBAAhngMIAO4EACGhA0AA3wQAIaIDQADvBAAhrwMBAN4EACGwAwgA-wQAIbEDCADuBAAhsgMIAO4EACGzAwgA7gQAIbQDCADuBAAhtQMIAO4EACG2AwgA7gQAIb8DAgDbBAAhAwAAAHYAIAEAAMwDADAZAADNAwAgAwAAAHYAIAEAAHcAMAIAAHgAIAEAAAB9ACABAAAAfQAgAwAAAHsAIAEAAHwAMAIAAH0AIAMAAAB7ACABAAB8ADACAAB9ACADAAAAewAgAQAAfAAwAgAAfQAgFkcAAJ8GACBKAACgBgAgTAAAngYAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAbgDAgAAAAG5AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DCAAAAAEBDQAA1QMAIBOAAwIAAAABiANAAAAAAZoDAgAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGpAwEAAAABrAMBAAAAAa0DAQAAAAG0AwgAAAABtgMIAAAAAbcDAQAAAAG4AwIAAAABuQMBAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwgAAAABAQ0AANcDADABDQAA1wMAMAEAAABkACAWRwAAkAYAIEoAAJEGACBMAACPBgAggAMCANAFACGIA0AAzwUAIZoDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhqQMBAMwFACGsAwEAzAUAIa0DAQDOBQAhtAMIANkFACG2AwgA2QUAIbcDAQDOBQAhuAMCAM0FACG5AwEAzAUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACECAAAAfQAgDQAA2wMAIBOAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGpAwEAzAUAIawDAQDMBQAhrQMBAM4FACG0AwgA2QUAIbYDCADZBQAhtwMBAM4FACG4AwIAzQUAIbkDAQDMBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIQIAAAB7ACANAADdAwAgAgAAAHsAIA0AAN0DACABAAAAZAAgAwAAAH0AIBQAANUDACAVAADbAwAgAQAAAH0AIAEAAAB7ACAOBgAAigYAIBoAAIsGACAbAACOBgAgHAAAjQYAIB0AAIwGACCiAwAAxgUAIKQDAADGBQAgrQMAAMYFACC3AwAAxgUAILgDAADGBQAgugMAAMYFACC7AwAAxgUAILwDAADGBQAgvQMAAMYFACAW_QIAAP0EADD-AgAA5QMAEP8CAAD9BAAwgAMCANsEACGIA0AA3wQAIZoDAgDbBAAhoQNAAN8EACGiA0AA7wQAIaQDAQDeBAAhqQMBAN0EACGsAwEA3QQAIa0DAQDeBAAhtAMIAO4EACG2AwgA7gQAIbcDAQDeBAAhuAMCANwEACG5AwEA3QQAIboDAQDeBAAhuwMBAN4EACG8AwEA3gQAIb0DAQDeBAAhvgMIAO4EACEDAAAAewAgAQAA5AMAMBkAAOUDACADAAAAewAgAQAAfAAwAgAAfQAgAQAAAIIBACABAAAAggEAIAMAAACAAQAgAQAAgQEAMAIAAIIBACADAAAAgAEAIAEAAIEBADACAACCAQAgAwAAAIABACABAACBAQAwAgAAggEAIBJJAACJBgAgTQAAiAYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGuAwIAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAEBDQAA7QMAIBCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrgMCAAAAAa8DAQAAAAGwAwgAAAABsQMIAAAAAbIDCAAAAAGzAwgAAAABtAMIAAAAAbUDCAAAAAG2AwgAAAABAQ0AAO8DADABDQAA7wMAMBJJAACHBgAgTQAAhgYAIIADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrgMCANAFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhAgAAAIIBACANAADyAwAgEIADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrgMCANAFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhAgAAAIABACANAAD0AwAgAgAAAIABACANAAD0AwAgAwAAAIIBACAUAADtAwAgFQAA8gMAIAEAAACCAQAgAQAAAIABACAIBgAAgAYAIBoAAIEGACAbAACEBgAgHAAAgwYAIB0AAIIGACCiAwAAxgUAIK8DAADGBQAgsAMAAMYFACAT_QIAAPoEADD-AgAA-wMAEP8CAAD6BAAwgAMCANsEACGIA0AA3wQAIZkDAgDbBAAhnAMIAO4EACGeAwgA7gQAIaEDQADfBAAhogNAAO8EACGuAwIA2wQAIa8DAQDeBAAhsAMIAPsEACGxAwgA7gQAIbIDCADuBAAhswMIAO4EACG0AwgA7gQAIbUDCADuBAAhtgMIAO4EACEDAAAAgAEAIAEAAPoDADAZAAD7AwAgAwAAAIABACABAACBAQAwAgAAggEAIAEAAACHAQAgAQAAAIcBACADAAAAhQEAIAEAAIYBADACAACHAQAgAwAAAIUBACABAACGAQAwAgAAhwEAIAMAAACFAQAgAQAAhgEAMAIAAIcBACAMRwAA_gUAIEoAAP8FACCAAwIAAAABiANAAAAAAZoDAgAAAAGhA0AAAAABogNAAAAAAakDAQAAAAGqAwEAAAABqwMgAAAAAawDAQAAAAGtAwEAAAABAQ0AAIMEACAKgAMCAAAAAYgDQAAAAAGaAwIAAAABoQNAAAAAAaIDQAAAAAGpAwEAAAABqgMBAAAAAasDIAAAAAGsAwEAAAABrQMBAAAAAQENAACFBAAwAQ0AAIUEADAMRwAA8AUAIEoAAPEFACCAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhqQMBAMwFACGqAwEAzAUAIasDIADvBQAhrAMBAMwFACGtAwEAzgUAIQIAAACHAQAgDQAAiAQAIAqAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhqQMBAMwFACGqAwEAzAUAIasDIADvBQAhrAMBAMwFACGtAwEAzgUAIQIAAACFAQAgDQAAigQAIAIAAACFAQAgDQAAigQAIAMAAACHAQAgFAAAgwQAIBUAAIgEACABAAAAhwEAIAEAAACFAQAgBwYAAOoFACAaAADrBQAgGwAA7gUAIBwAAO0FACAdAADsBQAgogMAAMYFACCtAwAAxgUAIA39AgAA9gQAMP4CAACRBAAQ_wIAAPYEADCAAwIA2wQAIYgDQADfBAAhmgMCANsEACGhA0AA3wQAIaIDQADvBAAhqQMBAN0EACGqAwEA3QQAIasDIAD3BAAhrAMBAN0EACGtAwEA3gQAIQMAAACFAQAgAQAAkAQAMBkAAJEEACADAAAAhQEAIAEAAIYBADACAACHAQAgAQAAAIsBACABAAAAiwEAIAMAAACJAQAgAQAAigEAMAIAAIsBACADAAAAiQEAIAEAAIoBADACAACLAQAgAwAAAIkBACABAACKAQAwAgAAiwEAIA1JAADpBQAgTwAA6AUAIIADAgAAAAGIA0AAAAABmQMCAAAAAaEDQAAAAAGiA0AAAAABowMCAAAAAaQDAQAAAAGlAwgAAAABpgMIAAAAAacDCAAAAAGoAwgAAAABAQ0AAJkEACALgAMCAAAAAYgDQAAAAAGZAwIAAAABoQNAAAAAAaIDQAAAAAGjAwIAAAABpAMBAAAAAaUDCAAAAAGmAwgAAAABpwMIAAAAAagDCAAAAAEBDQAAmwQAMAENAACbBAAwDUkAAOcFACBPAADmBQAggAMCANAFACGIA0AAzwUAIZkDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaMDAgDQBQAhpAMBAM4FACGlAwgA2QUAIaYDCADZBQAhpwMIANkFACGoAwgA2QUAIQIAAACLAQAgDQAAngQAIAuAAwIA0AUAIYgDQADPBQAhmQMCANAFACGhA0AAzwUAIaIDQADaBQAhowMCANAFACGkAwEAzgUAIaUDCADZBQAhpgMIANkFACGnAwgA2QUAIagDCADZBQAhAgAAAIkBACANAACgBAAgAgAAAIkBACANAACgBAAgAwAAAIsBACAUAACZBAAgFQAAngQAIAEAAACLAQAgAQAAAIkBACAHBgAA4QUAIBoAAOIFACAbAADlBQAgHAAA5AUAIB0AAOMFACCiAwAAxgUAIKQDAADGBQAgDv0CAAD1BAAw_gIAAKcEABD_AgAA9QQAMIADAgDbBAAhiANAAN8EACGZAwIA2wQAIaEDQADfBAAhogNAAO8EACGjAwIA2wQAIaQDAQDeBAAhpQMIAO4EACGmAwgA7gQAIacDCADuBAAhqAMIAO4EACEDAAAAiQEAIAEAAKYEADAZAACnBAAgAwAAAIkBACABAACKAQAwAgAAiwEAIAEAAACQAQAgAQAAAJABACADAAAAjgEAIAEAAI8BADACAACQAQAgAwAAAI4BACABAACPAQAwAgAAkAEAIAMAAACOAQAgAQAAjwEAMAIAAJABACATRwAA3wUAIEkAAN4FACBRAADgBQAggAMCAAAAAYgDQAAAAAGUAwEAAAABlQMBAAAAAZYDAgAAAAGYAwAAAJgDApkDAgAAAAGaAwIAAAABmwMCAAAAAZwDCAAAAAGdAwgAAAABngMIAAAAAZ8DAQAAAAGgAwEAAAABoQNAAAAAAaIDQAAAAAEBDQAArwQAIBCAAwIAAAABiANAAAAAAZQDAQAAAAGVAwEAAAABlgMCAAAAAZgDAAAAmAMCmQMCAAAAAZoDAgAAAAGbAwIAAAABnAMIAAAAAZ0DCAAAAAGeAwgAAAABnwMBAAAAAaADAQAAAAGhA0AAAAABogNAAAAAAQENAACxBAAwAQ0AALEEADABAAAAZAAgE0cAANwFACBJAADbBQAgUQAA3QUAIIADAgDQBQAhiANAAM8FACGUAwEAzAUAIZUDAQDMBQAhlgMCAM0FACGYAwAA2AWYAyKZAwIA0AUAIZoDAgDQBQAhmwMCAM0FACGcAwgA2QUAIZ0DCADZBQAhngMIANkFACGfAwEAzgUAIaADAQDOBQAhoQNAAM8FACGiA0AA2gUAIQIAAACQAQAgDQAAtQQAIBCAAwIA0AUAIYgDQADPBQAhlAMBAMwFACGVAwEAzAUAIZYDAgDNBQAhmAMAANgFmAMimQMCANAFACGaAwIA0AUAIZsDAgDNBQAhnAMIANkFACGdAwgA2QUAIZ4DCADZBQAhnwMBAM4FACGgAwEAzgUAIaEDQADPBQAhogNAANoFACECAAAAjgEAIA0AALcEACACAAAAjgEAIA0AALcEACABAAAAZAAgAwAAAJABACAUAACvBAAgFQAAtQQAIAEAAACQAQAgAQAAAI4BACAKBgAA0wUAIBoAANQFACAbAADXBQAgHAAA1gUAIB0AANUFACCWAwAAxgUAIJsDAADGBQAgnwMAAMYFACCgAwAAxgUAIKIDAADGBQAgE_0CAADsBAAw_gIAAL8EABD_AgAA7AQAMIADAgDbBAAhiANAAN8EACGUAwEA3QQAIZUDAQDdBAAhlgMCANwEACGYAwAA7QSYAyKZAwIA2wQAIZoDAgDbBAAhmwMCANwEACGcAwgA7gQAIZ0DCADuBAAhngMIAO4EACGfAwEA3gQAIaADAQDeBAAhoQNAAN8EACGiA0AA7wQAIQMAAACOAQAgAQAAvgQAMBkAAL8EACADAAAAjgEAIAEAAI8BADACAACQAQAgAQAAAAkAIAEAAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACAKBAAA0gUAIIADAgAAAAGBAwIAAAABggMBAAAAAYMDAQAAAAGEAwIAAAABhQMBAAAAAYYDAQAAAAGHAwEAAAABiANAAAAAAQENAADHBAAgCYADAgAAAAGBAwIAAAABggMBAAAAAYMDAQAAAAGEAwIAAAABhQMBAAAAAYYDAQAAAAGHAwEAAAABiANAAAAAAQENAADJBAAwAQ0AAMkEADABAAAAAwAgCgQAANEFACCAAwIA0AUAIYEDAgDNBQAhggMBAMwFACGDAwEAzAUAIYQDAgDNBQAhhQMBAMwFACGGAwEAzgUAIYcDAQDOBQAhiANAAM8FACECAAAACQAgDQAAzQQAIAmAAwIA0AUAIYEDAgDNBQAhggMBAMwFACGDAwEAzAUAIYQDAgDNBQAhhQMBAMwFACGGAwEAzgUAIYcDAQDOBQAhiANAAM8FACECAAAABwAgDQAAzwQAIAIAAAAHACANAADPBAAgAQAAAAMAIAMAAAAJACAUAADHBAAgFQAAzQQAIAEAAAAJACABAAAABwAgCQYAAMcFACAaAADIBQAgGwAAywUAIBwAAMoFACAdAADJBQAggQMAAMYFACCEAwAAxgUAIIYDAADGBQAghwMAAMYFACAM_QIAANoEADD-AgAA1wQAEP8CAADaBAAwgAMCANsEACGBAwIA3AQAIYIDAQDdBAAhgwMBAN0EACGEAwIA3AQAIYUDAQDdBAAhhgMBAN4EACGHAwEA3gQAIYgDQADfBAAhAwAAAAcAIAEAANYEADAZAADXBAAgAwAAAAcAIAEAAAgAMAIAAAkAIAz9AgAA2gQAMP4CAADXBAAQ_wIAANoEADCAAwIA2wQAIYEDAgDcBAAhggMBAN0EACGDAwEA3QQAIYQDAgDcBAAhhQMBAN0EACGGAwEA3gQAIYcDAQDeBAAhiANAAN8EACENBgAA4QQAIBoAAOsEACAbAADhBAAgHAAA4QQAIB0AAOEEACCJAwIAAAABigMCAAAABIsDAgAAAASMAwIAAAABjQMCAAAAAY4DAgAAAAGPAwIAAAABkAMCAOoEACENBgAA5AQAIBoAAOkEACAbAADkBAAgHAAA5AQAIB0AAOQEACCJAwIAAAABigMCAAAABYsDAgAAAAWMAwIAAAABjQMCAAAAAY4DAgAAAAGPAwIAAAABkAMCAOgEACEOBgAA4QQAIBwAAOcEACAdAADnBAAgiQMBAAAAAYoDAQAAAASLAwEAAAAEjAMBAAAAAY0DAQAAAAGOAwEAAAABjwMBAAAAAZADAQDmBAAhkQMBAAAAAZIDAQAAAAGTAwEAAAABDgYAAOQEACAcAADlBAAgHQAA5QQAIIkDAQAAAAGKAwEAAAAFiwMBAAAABYwDAQAAAAGNAwEAAAABjgMBAAAAAY8DAQAAAAGQAwEA4wQAIZEDAQAAAAGSAwEAAAABkwMBAAAAAQsGAADhBAAgHAAA4gQAIB0AAOIEACCJA0AAAAABigNAAAAABIsDQAAAAASMA0AAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkANAAOAEACELBgAA4QQAIBwAAOIEACAdAADiBAAgiQNAAAAAAYoDQAAAAASLA0AAAAAEjANAAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADQADgBAAhCIkDAgAAAAGKAwIAAAAEiwMCAAAABIwDAgAAAAGNAwIAAAABjgMCAAAAAY8DAgAAAAGQAwIA4QQAIQiJA0AAAAABigNAAAAABIsDQAAAAASMA0AAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkANAAOIEACEOBgAA5AQAIBwAAOUEACAdAADlBAAgiQMBAAAAAYoDAQAAAAWLAwEAAAAFjAMBAAAAAY0DAQAAAAGOAwEAAAABjwMBAAAAAZADAQDjBAAhkQMBAAAAAZIDAQAAAAGTAwEAAAABCIkDAgAAAAGKAwIAAAAFiwMCAAAABYwDAgAAAAGNAwIAAAABjgMCAAAAAY8DAgAAAAGQAwIA5AQAIQuJAwEAAAABigMBAAAABYsDAQAAAAWMAwEAAAABjQMBAAAAAY4DAQAAAAGPAwEAAAABkAMBAOUEACGRAwEAAAABkgMBAAAAAZMDAQAAAAEOBgAA4QQAIBwAAOcEACAdAADnBAAgiQMBAAAAAYoDAQAAAASLAwEAAAAEjAMBAAAAAY0DAQAAAAGOAwEAAAABjwMBAAAAAZADAQDmBAAhkQMBAAAAAZIDAQAAAAGTAwEAAAABC4kDAQAAAAGKAwEAAAAEiwMBAAAABIwDAQAAAAGNAwEAAAABjgMBAAAAAY8DAQAAAAGQAwEA5wQAIZEDAQAAAAGSAwEAAAABkwMBAAAAAQ0GAADkBAAgGgAA6QQAIBsAAOQEACAcAADkBAAgHQAA5AQAIIkDAgAAAAGKAwIAAAAFiwMCAAAABYwDAgAAAAGNAwIAAAABjgMCAAAAAY8DAgAAAAGQAwIA6AQAIQiJAwgAAAABigMIAAAABYsDCAAAAAWMAwgAAAABjQMIAAAAAY4DCAAAAAGPAwgAAAABkAMIAOkEACENBgAA4QQAIBoAAOsEACAbAADhBAAgHAAA4QQAIB0AAOEEACCJAwIAAAABigMCAAAABIsDAgAAAASMAwIAAAABjQMCAAAAAY4DAgAAAAGPAwIAAAABkAMCAOoEACEIiQMIAAAAAYoDCAAAAASLAwgAAAAEjAMIAAAAAY0DCAAAAAGOAwgAAAABjwMIAAAAAZADCADrBAAhE_0CAADsBAAw_gIAAL8EABD_AgAA7AQAMIADAgDbBAAhiANAAN8EACGUAwEA3QQAIZUDAQDdBAAhlgMCANwEACGYAwAA7QSYAyKZAwIA2wQAIZoDAgDbBAAhmwMCANwEACGcAwgA7gQAIZ0DCADuBAAhngMIAO4EACGfAwEA3gQAIaADAQDeBAAhoQNAAN8EACGiA0AA7wQAIQcGAADhBAAgHAAA9AQAIB0AAPQEACCJAwAAAJgDAooDAAAAmAMIiwMAAACYAwiQAwAA8wSYAyINBgAA4QQAIBoAAOsEACAbAADrBAAgHAAA6wQAIB0AAOsEACCJAwgAAAABigMIAAAABIsDCAAAAASMAwgAAAABjQMIAAAAAY4DCAAAAAGPAwgAAAABkAMIAPIEACELBgAA5AQAIBwAAPEEACAdAADxBAAgiQNAAAAAAYoDQAAAAAWLA0AAAAAFjANAAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADQADwBAAhCwYAAOQEACAcAADxBAAgHQAA8QQAIIkDQAAAAAGKA0AAAAAFiwNAAAAABYwDQAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQA0AA8AQAIQiJA0AAAAABigNAAAAABYsDQAAAAAWMA0AAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkANAAPEEACENBgAA4QQAIBoAAOsEACAbAADrBAAgHAAA6wQAIB0AAOsEACCJAwgAAAABigMIAAAABIsDCAAAAASMAwgAAAABjQMIAAAAAY4DCAAAAAGPAwgAAAABkAMIAPIEACEHBgAA4QQAIBwAAPQEACAdAAD0BAAgiQMAAACYAwKKAwAAAJgDCIsDAAAAmAMIkAMAAPMEmAMiBIkDAAAAmAMCigMAAACYAwiLAwAAAJgDCJADAAD0BJgDIg79AgAA9QQAMP4CAACnBAAQ_wIAAPUEADCAAwIA2wQAIYgDQADfBAAhmQMCANsEACGhA0AA3wQAIaIDQADvBAAhowMCANsEACGkAwEA3gQAIaUDCADuBAAhpgMIAO4EACGnAwgA7gQAIagDCADuBAAhDf0CAAD2BAAw_gIAAJEEABD_AgAA9gQAMIADAgDbBAAhiANAAN8EACGaAwIA2wQAIaEDQADfBAAhogNAAO8EACGpAwEA3QQAIaoDAQDdBAAhqwMgAPcEACGsAwEA3QQAIa0DAQDeBAAhBQYAAOEEACAcAAD5BAAgHQAA-QQAIIkDIAAAAAGQAyAA-AQAIQUGAADhBAAgHAAA-QQAIB0AAPkEACCJAyAAAAABkAMgAPgEACECiQMgAAAAAZADIAD5BAAhE_0CAAD6BAAw_gIAAPsDABD_AgAA-gQAMIADAgDbBAAhiANAAN8EACGZAwIA2wQAIZwDCADuBAAhngMIAO4EACGhA0AA3wQAIaIDQADvBAAhrgMCANsEACGvAwEA3gQAIbADCAD7BAAhsQMIAO4EACGyAwgA7gQAIbMDCADuBAAhtAMIAO4EACG1AwgA7gQAIbYDCADuBAAhDQYAAOQEACAaAADpBAAgGwAA6QQAIBwAAOkEACAdAADpBAAgiQMIAAAAAYoDCAAAAAWLAwgAAAAFjAMIAAAAAY0DCAAAAAGOAwgAAAABjwMIAAAAAZADCAD8BAAhDQYAAOQEACAaAADpBAAgGwAA6QQAIBwAAOkEACAdAADpBAAgiQMIAAAAAYoDCAAAAAWLAwgAAAAFjAMIAAAAAY0DCAAAAAGOAwgAAAABjwMIAAAAAZADCAD8BAAhFv0CAAD9BAAw_gIAAOUDABD_AgAA_QQAMIADAgDbBAAhiANAAN8EACGaAwIA2wQAIaEDQADfBAAhogNAAO8EACGkAwEA3gQAIakDAQDdBAAhrAMBAN0EACGtAwEA3gQAIbQDCADuBAAhtgMIAO4EACG3AwEA3gQAIbgDAgDcBAAhuQMBAN0EACG6AwEA3gQAIbsDAQDeBAAhvAMBAN4EACG9AwEA3gQAIb4DCADuBAAhE_0CAAD-BAAw_gIAAM0DABD_AgAA_gQAMIADAgDbBAAhiANAAN8EACGZAwIA2wQAIZwDCADuBAAhngMIAO4EACGhA0AA3wQAIaIDQADvBAAhrwMBAN4EACGwAwgA-wQAIbEDCADuBAAhsgMIAO4EACGzAwgA7gQAIbQDCADuBAAhtQMIAO4EACG2AwgA7gQAIb8DAgDbBAAhFv0CAAD_BAAw_gIAALcDABD_AgAA_wQAMIADAgDbBAAhiANAAN8EACGaAwIA2wQAIaEDQADfBAAhogNAAO8EACGkAwEA3gQAIakDAQDdBAAhrAMBAN0EACGtAwEA3gQAIbQDCADuBAAhtgMIAO4EACG3AwEA3gQAIbkDAQDdBAAhugMBAN4EACG7AwEA3gQAIbwDAQDeBAAhvQMBAN4EACG-AwgA7gQAIcADAgDcBAAhE_0CAACABQAw_gIAAJ8DABD_AgAAgAUAMIADAgDbBAAhiANAAN8EACGZAwIA2wQAIZwDCADuBAAhngMIAO4EACGhA0AA3wQAIaIDQADvBAAhrwMBAN4EACGwAwgA-wQAIbEDCADuBAAhsgMIAO4EACGzAwgA7gQAIbQDCADuBAAhtQMIAO4EACG2AwgA7gQAIcEDAgDbBAAhFv0CAACBBQAw_gIAAIkDABD_AgAAgQUAMIADAgDbBAAhiANAAN8EACGaAwIA2wQAIaEDQADfBAAhogNAAO8EACGkAwEA3gQAIakDAQDdBAAhrAMBAN0EACGtAwEA3gQAIbQDCADuBAAhtgMIAO4EACG3AwEA3gQAIboDAQDeBAAhuwMBAN4EACG8AwEA3gQAIb0DAQDeBAAhvgMIAO4EACHAAwIA3AQAIcIDAQDdBAAhFP0CAACCBQAw_gIAAPECABD_AgAAggUAMIADAgDbBAAhiANAAN8EACGZAwIA2wQAIZwDCADuBAAhngMIAO4EACGhA0AA3wQAIaIDQADvBAAhrwMBAN4EACGwAwgA-wQAIbEDCADuBAAhsgMIAO4EACGzAwgA7gQAIbQDCADuBAAhtQMIAO4EACG2AwgA7gQAIcMDAgDbBAAhxAMBAN4EACEW_QIAAIMFADD-AgAA2wIAEP8CAACDBQAwgAMCANsEACGIA0AA3wQAIZoDAgDbBAAhoQNAAN8EACGiA0AA7wQAIaQDAQDeBAAhqQMBAN0EACGsAwEA3QQAIa0DAQDeBAAhtAMIAO4EACG2AwgA7gQAIbcDAQDeBAAhuAMCANwEACG6AwEA3gQAIbsDAQDeBAAhvAMBAN4EACG9AwEA3gQAIb4DCADuBAAhxQMBAN0EACEZ_QIAAIQFADD-AgAAwwIAEP8CAACEBQAwgAMCANsEACGIA0AA3wQAIaEDQADfBAAhogNAAO8EACGkAwEA3gQAIa8DAQDeBAAhsgMIAO4EACG1AwgA7gQAIcYDAgDcBAAhxwMCANwEACHIAwEA3QQAIckDAQDdBAAhygMBAN4EACHLAwEA3gQAIcwDCADuBAAhzQMIAO4EACHOAwEA3gQAIc8DAQDeBAAh0AMBAN0EACHRAyAA9wQAIdIDIAD3BAAh0wMIAO4EACEQ_QIAAIUFADD-AgAAqQIAEP8CAACFBQAwgAMCANsEACGIA0AA3wQAIaEDQADfBAAhogNAAO8EACHIAwEA3QQAIckDAQDdBAAh1AMBAN4EACHVAwEA3gQAIdYDAQDeBAAh1wMBAN4EACHYAwEA3gQAIdkDAQDeBAAh2gMBAN4EACEVQwAAiwUAIFIAAI8FACBUAACMBQAgVQAAjQUAIFYAAI4FACD9AgAAhgUAMP4CAABkABD_AgAAhgUAMIADAgCSBQAhiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyAMBAIcFACHJAwEAhwUAIdQDAQCIBQAh1QMBAIgFACHWAwEAiAUAIdcDAQCIBQAh2AMBAIgFACHZAwEAiAUAIdoDAQCIBQAhC4kDAQAAAAGKAwEAAAAEiwMBAAAABIwDAQAAAAGNAwEAAAABjgMBAAAAAY8DAQAAAAGQAwEA5wQAIZEDAQAAAAGSAwEAAAABkwMBAAAAAQuJAwEAAAABigMBAAAABYsDAQAAAAWMAwEAAAABjQMBAAAAAY4DAQAAAAGPAwEAAAABkAMBAOUEACGRAwEAAAABkgMBAAAAAZMDAQAAAAEIiQNAAAAAAYoDQAAAAASLA0AAAAAEjANAAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADQADiBAAhCIkDQAAAAAGKA0AAAAAFiwNAAAAABYwDQAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQA0AA8QQAIQPbAwAAZgAg3AMAAGYAIN0DAABmACAD2wMAAGoAINwDAABqACDdAwAAagAgA9sDAABxACDcAwAAcQAg3QMAAHEAIAPbAwAAewAg3AMAAHsAIN0DAAB7ACAD2wMAAI4BACDcAwAAjgEAIN0DAACOAQAgC_0CAACQBQAw_gIAAJECABD_AgAAkAUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhyAMBAN0EACHJAwEA3QQAId4DAQDeBAAh3wMgAPcEACERRQAAiwUAIEYAAIwFACBLAACNBQAgTgAAjgUAIFAAAJQFACBSAACPBQAg_QIAAJEFADD-AgAA_gEAEP8CAACRBQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAhogNAAIoFACHIAwEAhwUAIckDAQCHBQAh3gMBAIgFACHfAyAAkwUAIQiJAwIAAAABigMCAAAABIsDAgAAAASMAwIAAAABjQMCAAAAAY4DAgAAAAGPAwIAAAABkAMCAOEEACECiQMgAAAAAZADIAD5BAAhA9sDAACFAQAg3AMAAIUBACDdAwAAhQEAIAn9AgAAlQUAMP4CAAD4AQAQ_wIAAJUFADCAAwIA2wQAIYgDQADfBAAhoQNAAN8EACGiA0AA7wQAIckDAQDdBAAhzgMBAN4EACEJ_QIAAJYFADD-AgAA5QEAEP8CAACWBQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAhogNAAIoFACHJAwEAhwUAIc4DAQCIBQAhCv0CAACXBQAw_gIAAN8BABD_AgAAlwUAMIADAgDbBAAhiANAAN8EACGhA0AA3wQAIaIDQADvBAAhyAMBAN0EACHJAwEA3QQAIeADAQDeBAAhC0EAAJkFACD9AgAAmAUAMP4CAABcABD_AgAAmAUAMIADAgCSBQAhiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyAMBAIcFACHJAwEAhwUAIeADAQCIBQAhA9sDAABWACDcAwAAVgAg3QMAAFYAIAr9AgAAmgUAMP4CAADHAQAQ_wIAAJoFADCAAwIA2wQAIYgDQADfBAAhoQNAAN8EACGiA0AA7wQAIcgDAQDdBAAhyQMBAN0EACHOAwEA3gQAIRVJAACfBQAgUwAAngUAIP0CAACbBQAw_gIAAJkBABD_AgAAmwUAMIADAgCSBQAhiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrwMBAIgFACGwAwgAnAUAIbEDCACdBQAhsgMIAJ0FACGzAwgAnQUAIbQDCACdBQAhtQMIAJ0FACG2AwgAnQUAIcEDAgCSBQAhCIkDCAAAAAGKAwgAAAAFiwMIAAAABYwDCAAAAAGNAwgAAAABjgMIAAAAAY8DCAAAAAGQAwgA6QQAIQiJAwgAAAABigMIAAAABIsDCAAAAASMAwgAAAABjQMIAAAAAY4DCAAAAAGPAwgAAAABkAMIAOsEACEbRAAApAUAIEcAAKMFACBKAACyBQAg_QIAALEFADD-AgAAagAQ_wIAALEFADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAhwUAIawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhwAMCAKEFACHCAwEAhwUAIe0DAABqACDuAwAAagAgI0AAALkFACBCAAC6BQAgUgAAjwUAIFgAALQFACBZAACyBQAgWgAAsAUAIFsAAKwFACBcAACoBQAg_QIAALgFADD-AgAAVgAQ_wIAALgFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhrwMBAIgFACGyAwgAnQUAIbUDCACdBQAhxgMCAKEFACHHAwIAoQUAIcgDAQCHBQAhyQMBAIcFACHKAwEAiAUAIcsDAQCIBQAhzAMIAJ0FACHNAwgAnQUAIc4DAQCIBQAhzwMBAIgFACHQAwEAhwUAIdEDIACTBQAh0gMgAJMFACHTAwgAnQUAIe0DAABWACDuAwAAVgAgFkcAAKMFACBJAACfBQAgUQAApAUAIP0CAACgBQAw_gIAAI4BABD_AgAAoAUAMIADAgCSBQAhiANAAIkFACGUAwEAhwUAIZUDAQCHBQAhlgMCAKEFACGYAwAAogWYAyKZAwIAkgUAIZoDAgCSBQAhmwMCAKEFACGcAwgAnQUAIZ0DCACdBQAhngMIAJ0FACGfAwEAiAUAIaADAQCIBQAhoQNAAIkFACGiA0AAigUAIQiJAwIAAAABigMCAAAABYsDAgAAAAWMAwIAAAABjQMCAAAAAY4DAgAAAAGPAwIAAAABkAMCAOQEACEEiQMAAACYAwKKAwAAAJgDCIsDAAAAmAMIkAMAAPQEmAMiE0UAAIsFACBGAACMBQAgSwAAjQUAIE4AAI4FACBQAACUBQAgUgAAjwUAIP0CAACRBQAw_gIAAP4BABD_AgAAkQUAMIADAgCSBQAhiANAAIkFACGhA0AAiQUAIaIDQACKBQAhyAMBAIcFACHJAwEAhwUAId4DAQCIBQAh3wMgAJMFACHtAwAA_gEAIO4DAAD-AQAgF0MAAIsFACBSAACPBQAgVAAAjAUAIFUAAI0FACBWAACOBQAg_QIAAIYFADD-AgAAZAAQ_wIAAIYFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHUAwEAiAUAIdUDAQCIBQAh1gMBAIgFACHXAwEAiAUAIdgDAQCIBQAh2QMBAIgFACHaAwEAiAUAIe0DAABkACDuAwAAZAAgEEkAAJ8FACBPAACmBQAg_QIAAKUFADD-AgAAiQEAEP8CAAClBQAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhoQNAAIkFACGiA0AAigUAIaMDAgCSBQAhpAMBAIgFACGlAwgAnQUAIaYDCACdBQAhpwMIAJ0FACGoAwgAnQUAIRFHAACjBQAgSgAAqAUAIP0CAACnBQAw_gIAAIUBABD_AgAApwUAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGpAwEAhwUAIaoDAQCHBQAhqwMgAJMFACGsAwEAhwUAIa0DAQCIBQAh7QMAAIUBACDuAwAAhQEAIA9HAACjBQAgSgAAqAUAIP0CAACnBQAw_gIAAIUBABD_AgAApwUAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGpAwEAhwUAIaoDAQCHBQAhqwMgAJMFACGsAwEAhwUAIa0DAQCIBQAhA9sDAACJAQAg3AMAAIkBACDdAwAAiQEAIBVJAACfBQAgTQAAqgUAIP0CAACpBQAw_gIAAIABABD_AgAAqQUAMIADAgCSBQAhiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrgMCAJIFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhG0cAAKMFACBKAACsBQAgTAAApAUAIP0CAACrBQAw_gIAAHsAEP8CAACrBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuAMCAKEFACG5AwEAhwUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHtAwAAewAg7gMAAHsAIBlHAACjBQAgSgAArAUAIEwAAKQFACD9AgAAqwUAMP4CAAB7ABD_AgAAqwUAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQCHBQAhrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbgDAgChBQAhuQMBAIcFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhA9sDAACAAQAg3AMAAIABACDdAwAAgAEAIBVIAACuBQAgSQAAnwUAIP0CAACtBQAw_gIAAHYAEP8CAACtBQAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhvwMCAJIFACEbRAAApAUAIEcAAKMFACBKAACwBQAg_QIAAK8FADD-AgAAcQAQ_wIAAK8FADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAhwUAIawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG5AwEAhwUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHAAwIAoQUAIe0DAABxACDuAwAAcQAgGUQAAKQFACBHAACjBQAgSgAAsAUAIP0CAACvBQAw_gIAAHEAEP8CAACvBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuQMBAIcFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhwAMCAKEFACED2wMAAHYAINwDAAB2ACDdAwAAdgAgGUQAAKQFACBHAACjBQAgSgAAsgUAIP0CAACxBQAw_gIAAGoAEP8CAACxBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcADAgChBQAhwgMBAIcFACED2wMAAJkBACDcAwAAmQEAIN0DAACZAQAgGUcAAKMFACBKAAC0BQAgTAAApAUAIP0CAACzBQAw_gIAAGYAEP8CAACzBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuAMCAKEFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhxQMBAIcFACED2wMAAGAAINwDAABgACDdAwAAYAAgFkkAAJ8FACBXAAC2BQAg_QIAALUFADD-AgAAYAAQ_wIAALUFADCAAwIAkgUAIYgDQACJBQAhmQMCAJIFACGcAwgAnQUAIZ4DCACdBQAhoQNAAIkFACGiA0AAigUAIa8DAQCIBQAhsAMIAJwFACGxAwgAnQUAIbIDCACdBQAhswMIAJ0FACG0AwgAnQUAIbUDCACdBQAhtgMIAJ0FACHDAwIAkgUAIcQDAQCIBQAhG0cAAKMFACBKAAC0BQAgTAAApAUAIP0CAACzBQAw_gIAAGYAEP8CAACzBQAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuAMCAKEFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhxQMBAIcFACHtAwAAZgAg7gMAAGYAIAtBAACZBQAg_QIAALcFADD-AgAAWgAQ_wIAALcFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHOAwEAiAUAISFAAAC5BQAgQgAAugUAIFIAAI8FACBYAAC0BQAgWQAAsgUAIFoAALAFACBbAACsBQAgXAAAqAUAIP0CAAC4BQAw_gIAAFYAEP8CAAC4BQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIa8DAQCIBQAhsgMIAJ0FACG1AwgAnQUAIcYDAgChBQAhxwMCAKEFACHIAwEAhwUAIckDAQCHBQAhygMBAIgFACHLAwEAiAUAIcwDCACdBQAhzQMIAJ0FACHOAwEAiAUAIc8DAQCIBQAh0AMBAIcFACHRAyAAkwUAIdIDIACTBQAh0wMIAJ0FACENQQAAmQUAIP0CAAC3BQAw_gIAAFoAEP8CAAC3BQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAhogNAAIoFACHIAwEAhwUAIckDAQCHBQAhzgMBAIgFACHtAwAAWgAg7gMAAFoAIA1BAACZBQAg_QIAAJgFADD-AgAAXAAQ_wIAAJgFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHgAwEAiAUAIe0DAABcACDuAwAAXAAgDP0CAAC7BQAw_gIAAFEAEP8CAAC7BQAwgAMCANsEACGIA0AA3wQAIaEDQADfBAAh4QMBAN0EACHiAyAA9wQAIeMDIAD3BAAh5AMgAPcEACHlAwIA2wQAIeYDAQDdBAAhDP0CAAC8BQAw_gIAAD4AEP8CAAC8BQAwgAMCAJIFACGIA0AAiQUAIaEDQACJBQAh4QMBAIcFACHiAyAAkwUAIeMDIACTBQAh5AMgAJMFACHlAwIAkgUAIeYDAQCHBQAhDf0CAAC9BQAw_gIAADgAEP8CAAC9BQAwgAMCANsEACGIA0AA3wQAIaEDQADfBAAhogNAAO8EACGsAwEA3QQAIecDAQDdBAAh6AMBAN0EACHpAwEA3QQAIeoDAgDbBAAh6wNAAO8EACEK_QIAAL4FADD-AgAAIgAQ_wIAAL4FADCAAwIA2wQAIYgDQADfBAAhoQNAAN8EACGiA0AA7wQAIcgDAQDdBAAhyQMBAN0EACHsAwEA3QQAIQsHAADABQAg_QIAAL8FADD-AgAADwAQ_wIAAL8FADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHsAwEAhwUAIQPbAwAAAwAg3AMAAAMAIN0DAAADACANBAAAwgUAIP0CAADBBQAw_gIAAAcAEP8CAADBBQAwgAMCAJIFACGBAwIAoQUAIYIDAQCHBQAhgwMBAIcFACGEAwIAoQUAIYUDAQCHBQAhhgMBAIgFACGHAwEAiAUAIYgDQACJBQAhEQMAAMQFACAFAADFBQAg_QIAAMMFADD-AgAAAwAQ_wIAAMMFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIawDAQCHBQAh5wMBAIcFACHoAwEAhwUAIekDAQCHBQAh6gMCAJIFACHrA0AAigUAIe0DAAADACDuAwAAAwAgDwMAAMQFACAFAADFBQAg_QIAAMMFADD-AgAAAwAQ_wIAAMMFADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIawDAQCHBQAh5wMBAIcFACHoAwEAhwUAIekDAQCHBQAh6gMCAJIFACHrA0AAigUAIQ0HAADABQAg_QIAAL8FADD-AgAADwAQ_wIAAL8FADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIcgDAQCHBQAhyQMBAIcFACHsAwEAhwUAIe0DAAAPACDuAwAADwAgA9sDAAAHACDcAwAABwAg3QMAAAcAIAAAAAAAAAHyAwEAAAABBfIDAgAAAAH4AwIAAAAB-QMCAAAAAfoDAgAAAAH7AwIAAAABAfIDAQAAAAEB8gNAAAAAAQXyAwIAAAAB-AMCAAAAAfkDAgAAAAH6AwIAAAAB-wMCAAAAAQcUAADnCgAgFQAA6goAIO8DAADoCgAg8AMAAOkKACDzAwAAAwAg9AMAAAMAIPUDAAAFACADFAAA5woAIO8DAADoCgAg9QMAAAUAIAAAAAAAAfIDAAAAmAMCBfIDCAAAAAH4AwgAAAAB-QMIAAAAAfoDCAAAAAH7AwgAAAABAfIDQAAAAAEFFAAA3AoAIBUAAOUKACDvAwAA3QoAIPADAADkCgAg9QMAAFgAIAUUAADaCgAgFQAA4goAIO8DAADbCgAg8AMAAOEKACD1AwAA-wEAIAcUAADYCgAgFQAA3woAIO8DAADZCgAg8AMAAN4KACDzAwAAZAAg9AMAAGQAIPUDAACUAgAgAxQAANwKACDvAwAA3QoAIPUDAABYACADFAAA2goAIO8DAADbCgAg9QMAAPsBACADFAAA2AoAIO8DAADZCgAg9QMAAJQCACAAAAAAAAUUAADQCgAgFQAA1goAIO8DAADRCgAg8AMAANUKACD1AwAAhwEAIAUUAADOCgAgFQAA0woAIO8DAADPCgAg8AMAANIKACD1AwAAWAAgAxQAANAKACDvAwAA0QoAIPUDAACHAQAgAxQAAM4KACDvAwAAzwoAIPUDAABYACAAAAAAAAHyAyAAAAABBRQAAMgKACAVAADMCgAg7wMAAMkKACDwAwAAywoAIPUDAAD7AQAgCxQAAPIFADAVAAD3BQAw7wMAAPMFADDwAwAA9AUAMPEDAAD1BQAg8gMAAPYFADDzAwAA9gUAMPQDAAD2BQAw9QMAAPYFADD2AwAA-AUAMPcDAAD5BQAwC0kAAOkFACCAAwIAAAABiANAAAAAAZkDAgAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGlAwgAAAABpgMIAAAAAacDCAAAAAGoAwgAAAABAgAAAIsBACAUAAD9BQAgAwAAAIsBACAUAAD9BQAgFQAA_AUAIAENAADKCgAwEEkAAJ8FACBPAACmBQAg_QIAAKUFADD-AgAAiQEAEP8CAAClBQAwgAMCAAAAAYgDQACJBQAhmQMCAJIFACGhA0AAiQUAIaIDQACKBQAhowMCAJIFACGkAwEAiAUAIaUDCACdBQAhpgMIAJ0FACGnAwgAnQUAIagDCACdBQAhAgAAAIsBACANAAD8BQAgAgAAAPoFACANAAD7BQAgDv0CAAD5BQAw_gIAAPoFABD_AgAA-QUAMIADAgCSBQAhiANAAIkFACGZAwIAkgUAIaEDQACJBQAhogNAAIoFACGjAwIAkgUAIaQDAQCIBQAhpQMIAJ0FACGmAwgAnQUAIacDCACdBQAhqAMIAJ0FACEO_QIAAPkFADD-AgAA-gUAEP8CAAD5BQAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhoQNAAIkFACGiA0AAigUAIaMDAgCSBQAhpAMBAIgFACGlAwgAnQUAIaYDCACdBQAhpwMIAJ0FACGoAwgAnQUAIQqAAwIA0AUAIYgDQADPBQAhmQMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGlAwgA2QUAIaYDCADZBQAhpwMIANkFACGoAwgA2QUAIQtJAADnBQAggAMCANAFACGIA0AAzwUAIZkDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhpQMIANkFACGmAwgA2QUAIacDCADZBQAhqAMIANkFACELSQAA6QUAIIADAgAAAAGIA0AAAAABmQMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAaUDCAAAAAGmAwgAAAABpwMIAAAAAagDCAAAAAEDFAAAyAoAIO8DAADJCgAg9QMAAPsBACAEFAAA8gUAMO8DAADzBQAw8QMAAPUFACD1AwAA9gUAMAAAAAAABfIDCAAAAAH4AwgAAAAB-QMIAAAAAfoDCAAAAAH7AwgAAAABBRQAAMAKACAVAADGCgAg7wMAAMEKACDwAwAAxQoAIPUDAAB9ACAFFAAAvgoAIBUAAMMKACDvAwAAvwoAIPADAADCCgAg9QMAAFgAIAMUAADACgAg7wMAAMEKACD1AwAAfQAgAxQAAL4KACDvAwAAvwoAIPUDAABYACAAAAAAAAcUAAC1CgAgFQAAvAoAIO8DAAC2CgAg8AMAALsKACDzAwAAZAAg9AMAAGQAIPUDAACUAgAgBRQAALMKACAVAAC5CgAg7wMAALQKACDwAwAAuAoAIPUDAAD7AQAgCxQAAJIGADAVAACXBgAw7wMAAJMGADDwAwAAlAYAMPEDAACVBgAg8gMAAJYGADDzAwAAlgYAMPQDAACWBgAw9QMAAJYGADD2AwAAmAYAMPcDAACZBgAwEEkAAIkGACCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAECAAAAggEAIBQAAJ0GACADAAAAggEAIBQAAJ0GACAVAACcBgAgAQ0AALcKADAVSQAAnwUAIE0AAKoFACD9AgAAqQUAMP4CAACAAQAQ_wIAAKkFADCAAwIAAAABiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrgMCAJIFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhAgAAAIIBACANAACcBgAgAgAAAJoGACANAACbBgAgE_0CAACZBgAw_gIAAJoGABD_AgAAmQYAMIADAgCSBQAhiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrgMCAJIFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhE_0CAACZBgAw_gIAAJoGABD_AgAAmQYAMIADAgCSBQAhiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrgMCAJIFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhD4ADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrwMBAM4FACGwAwgAhQYAIbEDCADZBQAhsgMIANkFACGzAwgA2QUAIbQDCADZBQAhtQMIANkFACG2AwgA2QUAIRBJAACHBgAggAMCANAFACGIA0AAzwUAIZkDAgDQBQAhnAMIANkFACGeAwgA2QUAIaEDQADPBQAhogNAANoFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhEEkAAIkGACCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAEDFAAAtQoAIO8DAAC2CgAg9QMAAJQCACADFAAAswoAIO8DAAC0CgAg9QMAAPsBACAEFAAAkgYAMO8DAACTBgAw8QMAAJUGACD1AwAAlgYAMAAAAAAABRQAAKsKACAVAACxCgAg7wMAAKwKACDwAwAAsAoAIPUDAABzACAFFAAAqQoAIBUAAK4KACDvAwAAqgoAIPADAACtCgAg9QMAAFgAIAMUAACrCgAg7wMAAKwKACD1AwAAcwAgAxQAAKkKACDvAwAAqgoAIPUDAABYACAAAAAAAAcUAACgCgAgFQAApwoAIO8DAAChCgAg8AMAAKYKACDzAwAAZAAg9AMAAGQAIPUDAACUAgAgBRQAAJ4KACAVAACkCgAg7wMAAJ8KACDwAwAAowoAIPUDAAD7AQAgCxQAALIGADAVAAC3BgAw7wMAALMGADDwAwAAtAYAMPEDAAC1BgAg8gMAALYGADDzAwAAtgYAMPQDAAC2BgAw9QMAALYGADD2AwAAuAYAMPcDAAC5BgAwEEkAAKkGACCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAECAAAAeAAgFAAAvQYAIAMAAAB4ACAUAAC9BgAgFQAAvAYAIAENAACiCgAwFUgAAK4FACBJAACfBQAg_QIAAK0FADD-AgAAdgAQ_wIAAK0FADCAAwIAAAABiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrwMBAIgFACGwAwgAnAUAIbEDCACdBQAhsgMIAJ0FACGzAwgAnQUAIbQDCACdBQAhtQMIAJ0FACG2AwgAnQUAIb8DAgCSBQAhAgAAAHgAIA0AALwGACACAAAAugYAIA0AALsGACAT_QIAALkGADD-AgAAugYAEP8CAAC5BgAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhvwMCAJIFACET_QIAALkGADD-AgAAugYAEP8CAAC5BgAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhvwMCAJIFACEPgAMCANAFACGIA0AAzwUAIZkDAgDQBQAhnAMIANkFACGeAwgA2QUAIaEDQADPBQAhogNAANoFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhEEkAAKcGACCAAwIA0AUAIYgDQADPBQAhmQMCANAFACGcAwgA2QUAIZ4DCADZBQAhoQNAAM8FACGiA0AA2gUAIa8DAQDOBQAhsAMIAIUGACGxAwgA2QUAIbIDCADZBQAhswMIANkFACG0AwgA2QUAIbUDCADZBQAhtgMIANkFACEQSQAAqQYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGvAwEAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAAAAAbQDCAAAAAG1AwgAAAABtgMIAAAAAQMUAACgCgAg7wMAAKEKACD1AwAAlAIAIAMUAACeCgAg7wMAAJ8KACD1AwAA-wEAIAQUAACyBgAw7wMAALMGADDxAwAAtQYAIPUDAAC2BgAwAAAAAAAFFAAAlgoAIBUAAJwKACDvAwAAlwoAIPADAACbCgAg9QMAAGwAIAUUAACUCgAgFQAAmQoAIO8DAACVCgAg8AMAAJgKACD1AwAAWAAgAxQAAJYKACDvAwAAlwoAIPUDAABsACADFAAAlAoAIO8DAACVCgAg9QMAAFgAIAAAAAAABxQAAIsKACAVAACSCgAg7wMAAIwKACDwAwAAkQoAIPMDAABkACD0AwAAZAAg9QMAAJQCACAFFAAAiQoAIBUAAI8KACDvAwAAigoAIPADAACOCgAg9QMAAPsBACALFAAA0gYAMBUAANcGADDvAwAA0wYAMPADAADUBgAw8QMAANUGACDyAwAA1gYAMPMDAADWBgAw9AMAANYGADD1AwAA1gYAMPYDAADYBgAw9wMAANkGADAQSQAAyQYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGvAwEAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAAAAAbQDCAAAAAG1AwgAAAABtgMIAAAAAQIAAACbAQAgFAAA3QYAIAMAAACbAQAgFAAA3QYAIBUAANwGACABDQAAjQoAMBVJAACfBQAgUwAAngUAIP0CAACbBQAw_gIAAJkBABD_AgAAmwUAMIADAgAAAAGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhwQMCAJIFACECAAAAmwEAIA0AANwGACACAAAA2gYAIA0AANsGACAT_QIAANkGADD-AgAA2gYAEP8CAADZBgAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhwQMCAJIFACET_QIAANkGADD-AgAA2gYAEP8CAADZBgAwgAMCAJIFACGIA0AAiQUAIZkDAgCSBQAhnAMIAJ0FACGeAwgAnQUAIaEDQACJBQAhogNAAIoFACGvAwEAiAUAIbADCACcBQAhsQMIAJ0FACGyAwgAnQUAIbMDCACdBQAhtAMIAJ0FACG1AwgAnQUAIbYDCACdBQAhwQMCAJIFACEPgAMCANAFACGIA0AAzwUAIZkDAgDQBQAhnAMIANkFACGeAwgA2QUAIaEDQADPBQAhogNAANoFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhEEkAAMcGACCAAwIA0AUAIYgDQADPBQAhmQMCANAFACGcAwgA2QUAIZ4DCADZBQAhoQNAAM8FACGiA0AA2gUAIa8DAQDOBQAhsAMIAIUGACGxAwgA2QUAIbIDCADZBQAhswMIANkFACG0AwgA2QUAIbUDCADZBQAhtgMIANkFACEQSQAAyQYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGvAwEAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAAAAAbQDCAAAAAG1AwgAAAABtgMIAAAAAQMUAACLCgAg7wMAAIwKACD1AwAAlAIAIAMUAACJCgAg7wMAAIoKACD1AwAA-wEAIAQUAADSBgAw7wMAANMGADDxAwAA1QYAIPUDAADWBgAwAAAAAAAFFAAAgQoAIBUAAIcKACDvAwAAggoAIPADAACGCgAg9QMAAGgAIAUUAAD_CQAgFQAAhAoAIO8DAACACgAg8AMAAIMKACD1AwAAWAAgAxQAAIEKACDvAwAAggoAIPUDAABoACADFAAA_wkAIO8DAACACgAg9QMAAFgAIAAAAAAABxQAAPYJACAVAAD9CQAg7wMAAPcJACDwAwAA_AkAIPMDAABkACD0AwAAZAAg9QMAAJQCACAFFAAA9AkAIBUAAPoJACDvAwAA9QkAIPADAAD5CQAg9QMAAPsBACALFAAA8gYAMBUAAPcGADDvAwAA8wYAMPADAAD0BgAw8QMAAPUGACDyAwAA9gYAMPMDAAD2BgAw9AMAAPYGADD1AwAA9gYAMPYDAAD4BgAw9wMAAPkGADARSQAA6QYAIIADAgAAAAGIA0AAAAABmQMCAAAAAZwDCAAAAAGeAwgAAAABoQNAAAAAAaIDQAAAAAGvAwEAAAABsAMIAAAAAbEDCAAAAAGyAwgAAAABswMIAAAAAbQDCAAAAAG1AwgAAAABtgMIAAAAAcQDAQAAAAECAAAAYgAgFAAA_QYAIAMAAABiACAUAAD9BgAgFQAA_AYAIAENAAD4CQAwFkkAAJ8FACBXAAC2BQAg_QIAALUFADD-AgAAYAAQ_wIAALUFADCAAwIAAAABiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrwMBAIgFACGwAwgAnAUAIbEDCACdBQAhsgMIAJ0FACGzAwgAnQUAIbQDCACdBQAhtQMIAJ0FACG2AwgAnQUAIcMDAgCSBQAhxAMBAIgFACECAAAAYgAgDQAA_AYAIAIAAAD6BgAgDQAA-wYAIBT9AgAA-QYAMP4CAAD6BgAQ_wIAAPkGADCAAwIAkgUAIYgDQACJBQAhmQMCAJIFACGcAwgAnQUAIZ4DCACdBQAhoQNAAIkFACGiA0AAigUAIa8DAQCIBQAhsAMIAJwFACGxAwgAnQUAIbIDCACdBQAhswMIAJ0FACG0AwgAnQUAIbUDCACdBQAhtgMIAJ0FACHDAwIAkgUAIcQDAQCIBQAhFP0CAAD5BgAw_gIAAPoGABD_AgAA-QYAMIADAgCSBQAhiANAAIkFACGZAwIAkgUAIZwDCACdBQAhngMIAJ0FACGhA0AAiQUAIaIDQACKBQAhrwMBAIgFACGwAwgAnAUAIbEDCACdBQAhsgMIAJ0FACGzAwgAnQUAIbQDCACdBQAhtQMIAJ0FACG2AwgAnQUAIcMDAgCSBQAhxAMBAIgFACEQgAMCANAFACGIA0AAzwUAIZkDAgDQBQAhnAMIANkFACGeAwgA2QUAIaEDQADPBQAhogNAANoFACGvAwEAzgUAIbADCACFBgAhsQMIANkFACGyAwgA2QUAIbMDCADZBQAhtAMIANkFACG1AwgA2QUAIbYDCADZBQAhxAMBAM4FACERSQAA5wYAIIADAgDQBQAhiANAAM8FACGZAwIA0AUAIZwDCADZBQAhngMIANkFACGhA0AAzwUAIaIDQADaBQAhrwMBAM4FACGwAwgAhQYAIbEDCADZBQAhsgMIANkFACGzAwgA2QUAIbQDCADZBQAhtQMIANkFACG2AwgA2QUAIcQDAQDOBQAhEUkAAOkGACCAAwIAAAABiANAAAAAAZkDAgAAAAGcAwgAAAABngMIAAAAAaEDQAAAAAGiA0AAAAABrwMBAAAAAbADCAAAAAGxAwgAAAABsgMIAAAAAbMDCAAAAAG0AwgAAAABtQMIAAAAAbYDCAAAAAHEAwEAAAABAxQAAPYJACDvAwAA9wkAIPUDAACUAgAgAxQAAPQJACDvAwAA9QkAIPUDAAD7AQAgBBQAAPIGADDvAwAA8wYAMPEDAAD1BgAg9QMAAPYGADAAAAAAAAcUAADmCQAgFQAA8gkAIO8DAADnCQAg8AMAAPEJACDzAwAAWgAg9AMAAFoAIPUDAABUACAHFAAA5AkAIBUAAO8JACDvAwAA5QkAIPADAADuCQAg8wMAAFwAIPQDAABcACD1AwAAygEAIAsUAAC-BwAwFQAAwgcAMO8DAAC_BwAw8AMAAMAHADDxAwAAwQcAIPIDAAD2BgAw8wMAAPYGADD0AwAA9gYAMPUDAAD2BgAw9gMAAMMHADD3AwAA-QYAMAsUAAC1BwAwFQAAuQcAMO8DAAC2BwAw8AMAALcHADDxAwAAuAcAIPIDAADWBgAw8wMAANYGADD0AwAA1gYAMPUDAADWBgAw9gMAALoHADD3AwAA2QYAMAsUAACsBwAwFQAAsAcAMO8DAACtBwAw8AMAAK4HADDxAwAArwcAIPIDAAC2BgAw8wMAALYGADD0AwAAtgYAMPUDAAC2BgAw9gMAALEHADD3AwAAuQYAMAsUAACjBwAwFQAApwcAMO8DAACkBwAw8AMAAKUHADDxAwAApgcAIPIDAACWBgAw8wMAAJYGADD0AwAAlgYAMPUDAACWBgAw9gMAAKgHADD3AwAAmQYAMAsUAACaBwAwFQAAngcAMO8DAACbBwAw8AMAAJwHADDxAwAAnQcAIPIDAAD2BQAw8wMAAPYFADD0AwAA9gUAMPUDAAD2BQAw9gMAAJ8HADD3AwAA-QUAMAsUAACOBwAwFQAAkwcAMO8DAACPBwAw8AMAAJAHADDxAwAAkQcAIPIDAACSBwAw8wMAAJIHADD0AwAAkgcAMPUDAACSBwAw9gMAAJQHADD3AwAAlQcAMBFHAADfBQAgUQAA4AUAIIADAgAAAAGIA0AAAAABlAMBAAAAAZUDAQAAAAGWAwIAAAABmAMAAACYAwKaAwIAAAABmwMCAAAAAZwDCAAAAAGdAwgAAAABngMIAAAAAZ8DAQAAAAGgAwEAAAABoQNAAAAAAaIDQAAAAAECAAAAkAEAIBQAAJkHACADAAAAkAEAIBQAAJkHACAVAACYBwAgAQ0AAO0JADAWRwAAowUAIEkAAJ8FACBRAACkBQAg_QIAAKAFADD-AgAAjgEAEP8CAACgBQAwgAMCAAAAAYgDQACJBQAhlAMBAAAAAZUDAQCHBQAhlgMCAKEFACGYAwAAogWYAyKZAwIAkgUAIZoDAgCSBQAhmwMCAKEFACGcAwgAnQUAIZ0DCACdBQAhngMIAJ0FACGfAwEAiAUAIaADAQCIBQAhoQNAAIkFACGiA0AAigUAIQIAAACQAQAgDQAAmAcAIAIAAACWBwAgDQAAlwcAIBP9AgAAlQcAMP4CAACWBwAQ_wIAAJUHADCAAwIAkgUAIYgDQACJBQAhlAMBAIcFACGVAwEAhwUAIZYDAgChBQAhmAMAAKIFmAMimQMCAJIFACGaAwIAkgUAIZsDAgChBQAhnAMIAJ0FACGdAwgAnQUAIZ4DCACdBQAhnwMBAIgFACGgAwEAiAUAIaEDQACJBQAhogNAAIoFACET_QIAAJUHADD-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_BwAw8QMAAMEHACD1AwAA9gYAMAQUAAC1BwAw7wMAALYHADDxAwAAuAcAIPUDAADWBgAwBBQAAKwHADDvAwAArQcAMPEDAACvBwAg9QMAALYGADAEFAAAowcAMO8DAACkBwAw8QMAAKYHACD1AwAAlgYAMAQUAACaBwAw7wMAAJsHADDxAwAAnQcAIPUDAAD2BQAwBBQAAI4HADDvAwAAjwcAMPEDAACRBwAg9QMAAJIHADAAAAAAAAsUAACGCAAwFQAAiwgAMO8DAACHCAAw8AMAAIgIADDxAwAAiQgAIPIDAACKCAAw8wMAAIoIADD0AwAAiggAMPUDAACKCAAw9gMAAIwIADD3AwAAjQgAMAsUAAD6BwAwFQAA_wcAMO8DAAD7BwAw8AMAAPwHADDxAwAA_QcAIPIDAAD-BwAw8wMAAP4HADD0AwAA_gcAMPUDAAD-BwAw9gMAAIAIADD3AwAAgQgAMAsUAADuBwAwFQAA8wcAMO8DAADvBwAw8AMAAPAHADDxAwAA8QcAIPIDAADyBwAw8wMAAPIHADD0AwAA8gcAMPUDAADyBwAw9gMAAPQHADD3AwAA9QcAMAsUAADiBwAwFQAA5wcAMO8DAADjBwAw8AMAAOQHADDxAwAA5QcAIPIDAADmBwAw8wMAAOYHADD0AwAA5gcAMPUDAADmBwAw9gMAAOgHADD3AwAA6QcAMAsUAADZBwAwFQAA3QcAMO8DAADaBwAw8AMAANsHADDxAwAA3AcAIPIDAACSBwAw8wMAAJIHADD0AwAAkgcAMPUDAACSBwAw9gMAAN4HADD3AwAAlQcAMBFHAADfBQAgSQAA3gUAIIADAgAAAAGIA0AAAAABlAMBAAAAAZUDAQAAAAGWAwIAAAABmAMAAACYAwKZAwIAAAABmgMCAAAAAZwDCAAAAAGdAwgAAAABngMIAAAAAZ8DAQAAAAGgAwEAAAABoQNAAAAAAaIDQAAAAAECAAAAkAEAIBQAAOEHACADAAAAkAEAIBQAAOEHACAVAADgBwAgAQ0AAOMJADACAAAAkAEAIA0AAOAHACACAAAAlgcAIA0AAN8HACAPgAMCANAFACGIA0AAzwUAIZQDAQDMBQAhlQMBAMwFACGWAwIAzQUAIZgDAADYBZgDIpkDAgDQBQAhmgMCANAFACGcAwgA2QUAIZ0DCADZBQAhngMIANkFACGfAwEAzgUAIaADAQDOBQAhoQNAAM8FACGiA0AA2gUAIRFHAADcBQAgSQAA2wUAIIADAgDQBQAhiANAAM8FACGUAwEAzAUAIZUDAQDMBQAhlgMCAM0FACGYAwAA2AWYAyKZAwIA0AUAIZoDAgDQBQAhnAMIANkFACGdAwgA2QUAIZ4DCADZBQAhnwMBAM4FACGgAwEAzgUAIaEDQADPBQAhogNAANoFACERRwAA3wUAIEkAAN4FACCAAwIAAAABiANAAAAAAZQDAQAAAAGVAwEAAAABlgMCAAAAAZgDAAAAmAMCmQMCAAAAAZoDAgAAAAGcAwgAAAABnQMIAAAAAZ4DCAAAAAGfAwEAAAABoAMBAAAAAaEDQAAAAAGiA0AAAAABFEcAAJ8GACBKAACgBgAggAMCAAAAAYgDQAAAAAGaAwIAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABqQMBAAAAAawDAQAAAAGtAwEAAAABtAMIAAAAAbYDCAAAAAG3AwEAAAABuQMBAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwgAAAABAgAAAH0AIBQAAO0HACADAAAAfQAgFAAA7QcAIBUAAOwHACABDQAA4gkAMBlHAACjBQAgSgAArAUAIEwAAKQFACD9AgAAqwUAMP4CAAB7ABD_AgAAqwUAMIADAgAAAAGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAAAAAawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG4AwIAoQUAIbkDAQCHBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIQIAAAB9ACANAADsBwAgAgAAAOoHACANAADrBwAgFv0CAADpBwAw_gIAAOoHABD_AgAA6QcAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQCHBQAhrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbgDAgChBQAhuQMBAIcFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhFv0CAADpBwAw_gIAAOoHABD_AgAA6QcAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQCHBQAhrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbgDAgChBQAhuQMBAIcFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhEoADAgDQBQAhiANAAM8FACGaAwIA0AUAIaEDQADPBQAhogNAANoFACGkAwEAzgUAIakDAQDMBQAhrAMBAMwFACGtAwEAzgUAIbQDCADZBQAhtgMIANkFACG3AwEAzgUAIbkDAQDMBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIRRHAACQBgAgSgAAkQYAIIADAgDQBQAhiANAAM8FACGaAwIA0AUAIaEDQADPBQAhogNAANoFACGkAwEAzgUAIakDAQDMBQAhrAMBAMwFACGtAwEAzgUAIbQDCADZBQAhtgMIANkFACG3AwEAzgUAIbkDAQDMBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIRRHAACfBgAgSgAAoAYAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAbkDAQAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAARRHAAC_BgAgSgAAwAYAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAbkDAQAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAAQIAAABzACAUAAD5BwAgAwAAAHMAIBQAAPkHACAVAAD4BwAgAQ0AAOEJADAZRAAApAUAIEcAAKMFACBKAACwBQAg_QIAAK8FADD-AgAAcQAQ_wIAAK8FADCAAwIAAAABiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQAAAAGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhuQMBAIcFACG6AwEAiAUAIbsDAQCIBQAhvAMBAIgFACG9AwEAiAUAIb4DCACdBQAhwAMCAKEFACECAAAAcwAgDQAA-AcAIAIAAAD2BwAgDQAA9wcAIBb9AgAA9QcAMP4CAAD2BwAQ_wIAAPUHADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAhwUAIawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG5AwEAhwUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHAAwIAoQUAIRb9AgAA9QcAMP4CAAD2BwAQ_wIAAPUHADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAhwUAIawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG5AwEAhwUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHAAwIAoQUAIRKAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGpAwEAzAUAIawDAQDMBQAhrQMBAM4FACG0AwgA2QUAIbYDCADZBQAhtwMBAM4FACG5AwEAzAUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACEURwAAsAYAIEoAALEGACCAAwIA0AUAIYgDQADPBQAhmgMCANAFACGhA0AAzwUAIaIDQADaBQAhpAMBAM4FACGpAwEAzAUAIawDAQDMBQAhrQMBAM4FACG0AwgA2QUAIbYDCADZBQAhtwMBAM4FACG5AwEAzAUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACEURwAAvwYAIEoAAMAGACCAAwIAAAABiANAAAAAAZoDAgAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGpAwEAAAABrAMBAAAAAa0DAQAAAAG0AwgAAAABtgMIAAAAAbcDAQAAAAG5AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DCAAAAAEURwAA3wYAIEoAAOAGACCAAwIAAAABiANAAAAAAZoDAgAAAAGhA0AAAAABogNAAAAAAaQDAQAAAAGpAwEAAAABrAMBAAAAAa0DAQAAAAG0AwgAAAABtgMIAAAAAbcDAQAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAAcIDAQAAAAECAAAAbAAgFAAAhQgAIAMAAABsACAUAACFCAAgFQAAhAgAIAENAADgCQAwGUQAAKQFACBHAACjBQAgSgAAsgUAIP0CAACxBQAw_gIAAGoAEP8CAACxBQAwgAMCAAAAAYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGpAwEAAAABrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHAAwIAoQUAIcIDAQCHBQAhAgAAAGwAIA0AAIQIACACAAAAgggAIA0AAIMIACAW_QIAAIEIADD-AgAAgggAEP8CAACBCAAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcADAgChBQAhwgMBAIcFACEW_QIAAIEIADD-AgAAgggAEP8CAACBCAAwgAMCAJIFACGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAIcFACGsAwEAhwUAIa0DAQCIBQAhtAMIAJ0FACG2AwgAnQUAIbcDAQCIBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcADAgChBQAhwgMBAIcFACESgAMCANAFACGIA0AAzwUAIZoDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhqQMBAMwFACGsAwEAzAUAIa0DAQDOBQAhtAMIANkFACG2AwgA2QUAIbcDAQDOBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIcIDAQDMBQAhFEcAANAGACBKAADRBgAggAMCANAFACGIA0AAzwUAIZoDAgDQBQAhoQNAAM8FACGiA0AA2gUAIaQDAQDOBQAhqQMBAMwFACGsAwEAzAUAIa0DAQDOBQAhtAMIANkFACG2AwgA2QUAIbcDAQDOBQAhugMBAM4FACG7AwEAzgUAIbwDAQDOBQAhvQMBAM4FACG-AwgA2QUAIcIDAQDMBQAhFEcAAN8GACBKAADgBgAggAMCAAAAAYgDQAAAAAGaAwIAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABqQMBAAAAAawDAQAAAAGtAwEAAAABtAMIAAAAAbYDCAAAAAG3AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DCAAAAAHCAwEAAAABFEcAAP8GACBKAACABwAggAMCAAAAAYgDQAAAAAGaAwIAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABqQMBAAAAAawDAQAAAAGtAwEAAAABtAMIAAAAAbYDCAAAAAG3AwEAAAABugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DCAAAAAHFAwEAAAABAgAAAGgAIBQAAJEIACADAAAAaAAgFAAAkQgAIBUAAJAIACABDQAA3wkAMBlHAACjBQAgSgAAtAUAIEwAAKQFACD9AgAAswUAMP4CAABmABD_AgAAswUAMIADAgAAAAGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhqQMBAAAAAawDAQCHBQAhrQMBAIgFACG0AwgAnQUAIbYDCACdBQAhtwMBAIgFACG4AwIAoQUAIboDAQCIBQAhuwMBAIgFACG8AwEAiAUAIb0DAQCIBQAhvgMIAJ0FACHFAwEAhwUAIQIAAABoACANAACQCAAgAgAAAI4IACANAACPCAAgFv0CAACNCAAw_gIAAI4IABD_AgAAjQgAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQCHBQAhrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbgDAgChBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcUDAQCHBQAhFv0CAACNCAAw_gIAAI4IABD_AgAAjQgAMIADAgCSBQAhiANAAIkFACGaAwIAkgUAIaEDQACJBQAhogNAAIoFACGkAwEAiAUAIakDAQCHBQAhrAMBAIcFACGtAwEAiAUAIbQDCACdBQAhtgMIAJ0FACG3AwEAiAUAIbgDAgChBQAhugMBAIgFACG7AwEAiAUAIbwDAQCIBQAhvQMBAIgFACG-AwgAnQUAIcUDAQCHBQAhEoADAgDQBQAhiANAAM8FACGaAwIA0AUAIaEDQADPBQAhogNAANoFACGkAwEAzgUAIakDAQDMBQAhrAMBAMwFACGtAwEAzgUAIbQDCADZBQAhtgMIANkFACG3AwEAzgUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACHFAwEAzAUAIRRHAADwBgAgSgAA8QYAIIADAgDQBQAhiANAAM8FACGaAwIA0AUAIaEDQADPBQAhogNAANoFACGkAwEAzgUAIakDAQDMBQAhrAMBAMwFACGtAwEAzgUAIbQDCADZBQAhtgMIANkFACG3AwEAzgUAIboDAQDOBQAhuwMBAM4FACG8AwEAzgUAIb0DAQDOBQAhvgMIANkFACHFAwEAzAUAIRRHAAD_BgAgSgAAgAcAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwgAAAABxQMBAAAAAQQUAACGCAAw7wMAAIcIADDxAwAAiQgAIPUDAACKCAAwBBQAAPoHADDvAwAA-wcAMPEDAAD9BwAg9QMAAP4HADAEFAAA7gcAMO8DAADvBwAw8QMAAPEHACD1AwAA8gcAMAQUAADiBwAw7wMAAOMHADDxAwAA5QcAIPUDAADmBwAwBBQAANkHADDvAwAA2gcAMPEDAADcBwAg9QMAAJIHADAAAAAAAAAAAAAACxQAANcIADAVAADbCAAw7wMAANgIADDwAwAA2QgAMPEDAADaCAAg8gMAAIoIADDzAwAAiggAMPQDAACKCAAw9QMAAIoIADD2AwAA3AgAMPcDAACNCAAwCxQAAM4IADAVAADSCAAw7wMAAM8IADDwAwAA0AgAMPEDAADRCAAg8gMAAP4HADDzAwAA_gcAMPQDAAD-BwAw9QMAAP4HADD2AwAA0wgAMPcDAACBCAAwCxQAAMUIADAVAADJCAAw7wMAAMYIADDwAwAAxwgAMPEDAADICAAg8gMAAPIHADDzAwAA8gcAMPQDAADyBwAw9QMAAPIHADD2AwAAyggAMPcDAAD1BwAwCxQAALwIADAVAADACAAw7wMAAL0IADDwAwAAvggAMPEDAAC_CAAg8gMAAOYHADDzAwAA5gcAMPQDAADmBwAw9QMAAOYHADD2AwAAwQgAMPcDAADpBwAwCxQAALAIADAVAAC1CAAw7wMAALEIADDwAwAAsggAMPEDAACzCAAg8gMAALQIADDzAwAAtAgAMPQDAAC0CAAw9QMAALQIADD2AwAAtggAMPcDAAC3CAAwCxQAAKcIADAVAACrCAAw7wMAAKgIADDwAwAAqQgAMPEDAACqCAAg8gMAAJIHADDzAwAAkgcAMPQDAACSBwAw9QMAAJIHADD2AwAArAgAMPcDAACVBwAwEUkAAN4FACBRAADgBQAggAMCAAAAAYgDQAAAAAGUAwEAAAABlQMBAAAAAZYDAgAAAAGYAwAAAJgDApkDAgAAAAGbAwIAAAABnAMIAAAAAZ0DCAAAAAGeAwgAAAABnwMBAAAAAaADAQAAAAGhA0AAAAABogNAAAAAAQIAAACQAQAgFAAArwgAIAMAAACQAQAgFAAArwgAIBUAAK4IACABDQAA3gkAMAIAAACQAQAgDQAArggAIAIAAACWBwAgDQAArQgAIA-AAwIA0AUAIYgDQADPBQAhlAMBAMwFACGVAwEAzAUAIZYDAgDNBQAhmAMAANgFmAMimQMCANAFACGbAwIAzQUAIZwDCADZBQAhnQMIANkFACGeAwgA2QUAIZ8DAQDOBQAhoAMBAM4FACGhA0AAzwUAIaIDQADaBQAhEUkAANsFACBRAADdBQAggAMCANAFACGIA0AAzwUAIZQDAQDMBQAhlQMBAMwFACGWAwIAzQUAIZgDAADYBZgDIpkDAgDQBQAhmwMCAM0FACGcAwgA2QUAIZ0DCADZBQAhngMIANkFACGfAwEAzgUAIaADAQDOBQAhoQNAAM8FACGiA0AA2gUAIRFJAADeBQAgUQAA4AUAIIADAgAAAAGIA0AAAAABlAMBAAAAAZUDAQAAAAGWAwIAAAABmAMAAACYAwKZAwIAAAABmwMCAAAAAZwDCAAAAAGdAwgAAAABngMIAAAAAZ8DAQAAAAGgAwEAAAABoQNAAAAAAaIDQAAAAAEKSgAA_wUAIIADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAGpAwEAAAABqgMBAAAAAasDIAAAAAGsAwEAAAABrQMBAAAAAQIAAACHAQAgFAAAuwgAIAMAAACHAQAgFAAAuwgAIBUAALoIACABDQAA3QkAMA9HAACjBQAgSgAAqAUAIP0CAACnBQAw_gIAAIUBABD_AgAApwUAMIADAgAAAAGIA0AAiQUAIZoDAgCSBQAhoQNAAIkFACGiA0AAigUAIakDAQAAAAGqAwEAhwUAIasDIACTBQAhrAMBAIcFACGtAwEAiAUAIQIAAACHAQAgDQAAuggAIAIAAAC4CAAgDQAAuQgAIA39AgAAtwgAMP4CAAC4CAAQ_wIAALcIADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhqQMBAIcFACGqAwEAhwUAIasDIACTBQAhrAMBAIcFACGtAwEAiAUAIQ39AgAAtwgAMP4CAAC4CAAQ_wIAALcIADCAAwIAkgUAIYgDQACJBQAhmgMCAJIFACGhA0AAiQUAIaIDQACKBQAhqQMBAIcFACGqAwEAhwUAIasDIACTBQAhrAMBAIcFACGtAwEAiAUAIQmAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIakDAQDMBQAhqgMBAMwFACGrAyAA7wUAIawDAQDMBQAhrQMBAM4FACEKSgAA8QUAIIADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhqQMBAMwFACGqAwEAzAUAIasDIADvBQAhrAMBAMwFACGtAwEAzgUAIQpKAAD_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_gYAIIADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABqQMBAAAAAawDAQAAAAGtAwEAAAABtAMIAAAAAbYDCAAAAAG3AwEAAAABuAMCAAAAAboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwgAAAABxQMBAAAAAQQUAADXCAAw7wMAANgIADDxAwAA2ggAIPUDAACKCAAwBBQAAM4IADDvAwAAzwgAMPEDAADRCAAg9QMAAP4HADAEFAAAxQgAMO8DAADGCAAw8QMAAMgIACD1AwAA8gcAMAQUAAC8CAAw7wMAAL0IADDxAwAAvwgAIPUDAADmBwAwBBQAALAIADDvAwAAsQgAMPEDAACzCAAg9QMAALQIADAEFAAApwgAMO8DAACoCAAw8QMAAKoIACD1AwAAkgcAMAAAAAAAAAAAAAAACxQAAPIIADAVAAD3CAAw7wMAAPMIADDwAwAA9AgAMPEDAAD1CAAg8gMAAPYIADDzAwAA9ggAMPQDAAD2CAAw9QMAAPYIADD2AwAA-AgAMPcDAAD5CAAwHEAAAMcHACBSAADOBwAgWAAAyQcAIFkAAMoHACBaAADLBwAgWwAAzAcAIFwAAM0HACCAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAa8DAQAAAAGyAwgAAAABtQMIAAAAAcYDAgAAAAHIAwEAAAAByQMBAAAAAcoDAQAAAAHLAwEAAAABzAMIAAAAAc0DCAAAAAHOAwEAAAABzwMBAAAAAdADAQAAAAHRAyAAAAAB0gMgAAAAAdMDCAAAAAECAAAAWAAgFAAA_QgAIAMAAABYACAUAAD9CAAgFQAA_AgAIAENAADYCQAwIUAAALkFACBCAAC6BQAgUgAAjwUAIFgAALQFACBZAACyBQAgWgAAsAUAIFsAAKwFACBcAACoBQAg_QIAALgFADD-AgAAVgAQ_wIAALgFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIaIDQACKBQAhpAMBAIgFACGvAwEAiAUAIbIDCACdBQAhtQMIAJ0FACHGAwIAoQUAIccDAgChBQAhyAMBAIcFACHJAwEAAAABygMBAIgFACHLAwEAiAUAIcwDCACdBQAhzQMIAJ0FACHOAwEAiAUAIc8DAQCIBQAh0AMBAIcFACHRAyAAkwUAIdIDIACTBQAh0wMIAJ0FACECAAAAWAAgDQAA_AgAIAIAAAD6CAAgDQAA-wgAIBn9AgAA-QgAMP4CAAD6CAAQ_wIAAPkIADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIaQDAQCIBQAhrwMBAIgFACGyAwgAnQUAIbUDCACdBQAhxgMCAKEFACHHAwIAoQUAIcgDAQCHBQAhyQMBAIcFACHKAwEAiAUAIcsDAQCIBQAhzAMIAJ0FACHNAwgAnQUAIc4DAQCIBQAhzwMBAIgFACHQAwEAhwUAIdEDIACTBQAh0gMgAJMFACHTAwgAnQUAIRn9AgAA-QgAMP4CAAD6CAAQ_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_QIAAMEFADD-AgAABwAQ_wIAAMEFADCAAwIAAAABgQMCAKEFACGCAwEAhwUAIYMDAQCHBQAhhAMCAKEFACGFAwEAhwUAIYYDAQCIBQAhhwMBAIgFACGIA0AAiQUAIQIAAAAJACANAAC1CQAgAgAAALMJACANAAC0CQAgDP0CAACyCQAw_gIAALMJABD_AgAAsgkAMIADAgCSBQAhgQMCAKEFACGCAwEAhwUAIYMDAQCHBQAhhAMCAKEFACGFAwEAhwUAIYYDAQCIBQAhhwMBAIgFACGIA0AAiQUAIQz9AgAAsgkAMP4CAACzCQAQ_wIAALIJADCAAwIAkgUAIYEDAgChBQAhggMBAIcFACGDAwEAhwUAIYQDAgChBQAhhQMBAIcFACGGAwEAiAUAIYcDAQCIBQAhiANAAIkFACEIgAMCANAFACGCAwEAzAUAIYMDAQDMBQAhhAMCAM0FACGFAwEAzAUAIYYDAQDOBQAhhwMBAM4FACGIA0AAzwUAIQiAAwIA0AUAIYIDAQDMBQAhgwMBAMwFACGEAwIAzQUAIYUDAQDMBQAhhgMBAM4FACGHAwEAzgUAIYgDQADPBQAhCIADAgAAAAGCAwEAAAABgwMBAAAAAYQDAgAAAAGFAwEAAAABhgMBAAAAAYcDAQAAAAGIA0AAAAABAxQAANEJACDvAwAA0gkAIPUDAAABACAEFAAAqwkAMO8DAACsCQAw8QMAAK4JACD1AwAArwkAMAAAAAAACxQAAL8JADAVAADECQAw7wMAAMAJADDwAwAAwQkAMPEDAADCCQAg8gMAAMMJADDzAwAAwwkAMPQDAADDCQAw9QMAAMMJADD2AwAAxQkAMPcDAADGCQAwCgUAALgJACCAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAABrAMBAAAAAecDAQAAAAHoAwEAAAAB6QMBAAAAAesDQAAAAAECAAAABQAgFAAAygkAIAMAAAAFACAUAADKCQAgFQAAyQkAIAENAADQCQAwDwMAAMQFACAFAADFBQAg_QIAAMMFADD-AgAAAwAQ_wIAAMMFADCAAwIAAAABiANAAIkFACGhA0AAiQUAIaIDQACKBQAhrAMBAIcFACHnAwEAhwUAIegDAQAAAAHpAwEAhwUAIeoDAgCSBQAh6wNAAIoFACECAAAABQAgDQAAyQkAIAIAAADHCQAgDQAAyAkAIA39AgAAxgkAMP4CAADHCQAQ_wIAAMYJADCAAwIAkgUAIYgDQACJBQAhoQNAAIkFACGiA0AAigUAIawDAQCHBQAh5wMBAIcFACHoAwEAhwUAIekDAQCHBQAh6gMCAJIFACHrA0AAigUAIQ39AgAAxgkAMP4CAADHCQAQ_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-wkAIA8AAAD-AQAgDQAA-wkAIEYAAKIIACBLAACjCAAgTgAApAgAIFAAAKUIACBSAACmCAAggAMCANAFACGIA0AAzwUAIaEDQADPBQAhogNAANoFACHIAwEAzAUAIckDAQDMBQAh3gMBAM4FACHfAyAA7wUAIQ1GAACiCAAgSwAAowgAIE4AAKQIACBQAAClCAAgUgAApggAIIADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyAMBAMwFACHJAwEAzAUAId4DAQDOBQAh3wMgAO8FACEDAAAAZAAgFAAA9gkAIBUAAP4JACATAAAAZAAgDQAA_gkAIFIAANgHACBUAADVBwAgVQAA1gcAIFYAANcHACCAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIcgDAQDMBQAhyQMBAMwFACHUAwEAzgUAIdUDAQDOBQAh1gMBAM4FACHXAwEAzgUAIdgDAQDOBQAh2QMBAM4FACHaAwEAzgUAIRFSAADYBwAgVAAA1QcAIFUAANYHACBWAADXBwAggAMCANAFACGIA0AAzwUAIaEDQADPBQAhogNAANoFACHIAwEAzAUAIckDAQDMBQAh1AMBAM4FACHVAwEAzgUAIdYDAQDOBQAh1wMBAM4FACHYAwEAzgUAIdkDAQDOBQAh2gMBAM4FACEdQAAAxwcAIEIAAMgHACBSAADOBwAgWQAAygcAIFoAAMsHACBbAADMBwAgXAAAzQcAIIADAgAAAAGIA0AAAAABoQNAAAAAAaIDQAAAAAGkAwEAAAABrwMBAAAAAbIDCAAAAAG1AwgAAAABxgMCAAAAAccDAgAAAAHIAwEAAAAByQMBAAAAAcoDAQAAAAHLAwEAAAABzAMIAAAAAc0DCAAAAAHOAwEAAAABzwMBAAAAAdADAQAAAAHRAyAAAAAB0gMgAAAAAdMDCAAAAAECAAAAWAAgFAAA_wkAIBVHAAD_BgAgTAAA_gYAIIADAgAAAAGIA0AAAAABmgMCAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAakDAQAAAAGsAwEAAAABrQMBAAAAAbQDCAAAAAG2AwgAAAABtwMBAAAAAbgDAgAAAAG6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMIAAAAAcUDAQAAAAECAAAAaAAgFAAAgQoAIAMAAABWACAUAAD_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-AQAgFAAAyAoAIBUAAM0KACAPAAAA_gEAIA0AAM0KACBFAAChCAAgRgAAoggAIEsAAKMIACBOAACkCAAgUgAApggAIIADAgDQBQAhiANAAM8FACGhA0AAzwUAIaIDQADaBQAhyAMBAMwFACHJAwEAzAUAId4DAQDOBQAh3wMgAO8FACENRQAAoQgAIEYAAKIIACBLAACjCAAgTgAApAgAIFIAAKYIACCAAwIA0AUAIYgDQADPBQAhoQNAAM8FACGiA0AA2gUAIcgDAQDMBQAhyQMBAMwFACHeAwEAzgUAId8DIADvBQAhHUAAAMcHACBCAADIBwAgUgAAzgcAIFgAAMkHACBZAADKBwAgWgAAywcAIFsAAMwHACCAAwIAAAABiANAAAAAAaEDQAAAAAGiA0AAAAABpAMBAAAAAa8DAQAAAAGyAwgAAAABtQMIAAAAAcYDAgAAAAHHAwIAAAAByAMBAAAAAckDAQAAAAHKAwEAAAABywMBAAAAAcwDCAAAAAHNAwgAAAABzgMBAAAAAc8DAQAAAAHQAwEAAAAB0QMgAAAAAdIDIAAAAAHTAwgAAAABAgAAAFgAIBQAAM4KACALRwAA_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_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_ARoAwAEbAMEBHADCAR0AwwEAAAAAAAUGAL8BGgDAARsAwQEcAMIBHQDDAQJJACRPADICSQAkTwAyBQYAyAEaAMkBGwDKARwAywEdAMwBAAAAAAAFBgDIARoAyQEbAMoBHADLAR0AzAEDRwArSQAkUbQEKQNHACtJACRRugQpBQYA0QEaANIBGwDTARwA1AEdANUBAAAAAAAFBgDRARoA0gEbANMBHADUAR0A1QEBBMwEAgEE0gQCBQYA2gEaANsBGwDcARwA3QEdAN4BAAAAAAAFBgDaARoA2wEbANwBHADdAR0A3gEIAgEJDgEKEQELEgEMEwEOFQEPFwYQGAcRGgESHAYTHQgWHgEXHwEYIAYeIwkfJA8gJQIhJgIiJwIjKAIkKQIlKwImLQYnLhAoMAIpMgYqMxErNAIsNQItNgYuORIvOhgwPBkxPRkyQBkzQRk0Qhk1RBk2RgY3Rxo4SRk5SwY6TBs7TRk8Thk9TwY-Uhw_UyJdVSNetAEjX7YBI2C3ASNhuAEjYroBI2O8AQZkvQE9Zb8BI2bBAQZnwgE-aMMBI2nEASNqxQEGa8gBP2zJAUVtywElbswBJW_OASVwzwElcdABJXLSASVz1AEGdNUBRnXXASV22QEGd9oBR3jbASV53AElet0BBnvgAUh84QFOfeMBT37kAU9_5wFPgAHoAU-BAekBT4IB6wFPgwHtAQaEAe4BUIUB8AFPhgHyAQaHAfMBUYgB9AFPiQH1AU-KAfYBBosB-QFSjAH6AViNAfwBK44B_QErjwGAAiuQAYECK5EBggIrkgGEAiuTAYYCBpQBhwJZlQGJAiuWAYsCBpcBjAJamAGNAiuZAY4CK5oBjwIGmwGSAlucAZMCYZ0BlQIpngGWAimfAZgCKaABmQIpoQGaAimiAZwCKaMBngIGpAGfAmKlAaECKaYBowIGpwGkAmOoAaUCKakBpgIpqgGnAgarAaoCZKwBqwJqrQGsAiSuAa0CJK8BrgIksAGvAiSxAbACJLIBsgIkswG0Aga0AbUCa7UBuQIktgG7Aga3AbwCbLgBvwIkuQHAAiS6AcECBrsBxAJtvAHFAnO9AcYCKL4BxwIovwHIAijAAckCKMEBygIowgHMAijDAc4CBsQBzwJ0xQHSAijGAdQCBscB1QJ1yAHXAijJAdgCKMoB2QIGywHcAnbMAd0CfM0B3gInzgHfAifPAeACJ9AB4QIn0QHiAifSAeQCJ9MB5gIG1AHnAn3VAekCJ9YB6wIG1wHsAn7YAe0CJ9kB7gIn2gHvAgbbAfICf9wB8wKFAd0B9AIq3gH1AirfAfYCKuAB9wIq4QH4AiriAfoCKuMB_AIG5AH9AoYB5QGAAyrmAYIDBucBgwOHAegBhQMq6QGGAyrqAYcDBusBigOIAewBiwOOAe0BjAM37gGNAzfvAY4DN_ABjwM38QGQAzfyAZIDN_MBlAMG9AGVA48B9QGXAzf2AZkDBvcBmgOQAfgBmwM3-QGcAzf6AZ0DBvsBoAORAfwBoQOXAf0BogMs_gGjAyz_AaQDLIACpQMsgQKmAyyCAqgDLIMCqgMGhAKrA5gBhQKuAyyGArADBocCsQOZAYgCswMsiQK0AyyKArUDBosCuAOaAYwCuQOgAY0CugMtjgK7Ay2PArwDLZACvQMtkQK-Ay2SAsADLZMCwgMGlALDA6EBlQLFAy2WAscDBpcCyAOiAZgCyQMtmQLKAy2aAssDBpsCzgOjAZwCzwOpAZ0C0AMvngLRAy-fAtIDL6AC0wMvoQLUAy-iAtYDL6MC2AMGpALZA6oBpQLcAy-mAt4DBqcC3wOrAagC4QMvqQLiAy-qAuMDBqsC5gOsAawC5wOyAa0C6AMwrgLpAzCvAuoDMLAC6wMwsQLsAzCyAu4DMLMC8AMGtALxA7MBtQLzAzC2AvUDBrcC9gO0AbgC9wMwuQL4AzC6AvkDBrsC_AO1AbwC_QO7Ab0C_gMyvgL_AzK_AoAEMsACgQQywQKCBDLCAoQEMsMChgQGxAKHBLwBxQKJBDLGAosEBscCjAS9AcgCjQQyyQKOBDLKAo8EBssCkgS-AcwCkwTEAc0ClAQzzgKVBDPPApYEM9AClwQz0QKYBDPSApoEM9MCnAQG1AKdBMUB1QKfBDPWAqEEBtcCogTGAdgCowQz2QKkBDPaAqUEBtsCqATHAdwCqQTNAd0CqgQ13gKrBDXfAqwENeACrQQ14QKuBDXiArAENeMCsgQG5AKzBM4B5QK2BDXmArgEBucCuQTPAegCuwQ16QK8BDXqAr0EBusCwATQAewCwQTWAe0CwgQD7gLDBAPvAsQEA_ACxQQD8QLGBAPyAsgEA_MCygQG9ALLBNcB9QLOBAP2AtAEBvcC0QTYAfgC0wQD-QLUBAP6AtUEBvsC2ATZAfwC2QTfAQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("node:buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime__namespace.getPrismaClient(config);
}
runtime__namespace.Extensions.getExtensionContext;
({
  DbNull: runtime__namespace.NullTypes.DbNull,
  JsonNull: runtime__namespace.NullTypes.JsonNull,
  AnyNull: runtime__namespace.NullTypes.AnyNull
});
runtime__namespace.makeStrictEnum({
  Serializable: "Serializable"
});
runtime__namespace.Extensions.defineExtension;
globalThis["__dirname"] = path__namespace.dirname(node_url.fileURLToPath(require("url").pathToFileURL(__filename).href));
const PrismaClient = getPrismaClientClass();
function writeLog(level, message, meta = {}) {
  const entry = {
    level,
    message,
    meta,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  console[level === "error" ? "error" : "log"](JSON.stringify(entry));
}
const logger = {
  info(message, meta) {
    writeLog("info", message, meta);
  },
  warn(message, meta) {
    writeLog("warn", message, meta);
  },
  error(message, meta) {
    writeLog("error", message, meta);
  }
};
function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
function getMigrationsDir() {
  return path.join(electron.app.getAppPath(), "prisma", "migrations");
}
function listMigrationFolders(migrationsDir) {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }
  return fs.readdirSync(migrationsDir).filter((name) => fs.statSync(path.join(migrationsDir, name)).isDirectory()).sort();
}
function applyMigrations(dbPath) {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  try {
    db.exec(`CREATE TABLE IF NOT EXISTS _prisma_migrations (
      id TEXT PRIMARY KEY,
      migration_name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
    const applied = new Set(
      db.prepare("SELECT migration_name FROM _prisma_migrations").all().map((row) => row.migration_name)
    );
    const migrationsDir = getMigrationsDir();
    const pending = listMigrationFolders(migrationsDir).filter((name) => !applied.has(name));
    for (const folder of pending) {
      const sqlPath = path.join(migrationsDir, folder, "migration.sql");
      if (!fs.existsSync(sqlPath)) continue;
      const sql = fs.readFileSync(sqlPath, "utf8");
      const apply = db.transaction(() => {
        db.exec(sql);
        db.prepare("INSERT INTO _prisma_migrations (id, migration_name) VALUES (?, ?)").run(
          `${folder}-${Date.now()}`,
          folder
        );
      });
      apply();
      logger.info("applied migration", { folder });
    }
  } finally {
    db.close();
  }
}
const ROLES = [
  { name: "Admin", code: "ADMIN", permissionsJson: JSON.stringify(["*"]) },
  { name: "Manager", code: "MANAGER", permissionsJson: JSON.stringify(["inventory:*", "masters:*", "reports:read", "backup:read"]) },
  { name: "Operator", code: "OPERATOR", permissionsJson: JSON.stringify(["inventory:write", "masters:read", "reports:read"]) },
  { name: "Viewer", code: "VIEWER", permissionsJson: JSON.stringify(["masters:read", "inventory:read", "reports:read"]) }
];
async function seedDatabase(prisma2) {
  for (const role of ROLES) {
    await prisma2.role.upsert({
      where: { code: role.code },
      update: {},
      create: role
    });
  }
  await prisma2.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "StockOps",
      allowDuplicateBarcodes: false,
      allowNegativeStock: false,
      enableAutoBackup: true,
      backupIntervalHours: 24
    }
  });
  const GROUPS = [
    { name: "Raw Material", code: "CAT-RAW", description: "Raw material group" },
    { name: "Work in Progress", code: "CAT-WIP", description: "Work in progress group" },
    { name: "Finished Goods", code: "CAT-FG", description: "Finished goods group" }
  ];
  for (const group of GROUPS) {
    await prisma2.category.upsert({
      where: { code: group.code },
      update: {},
      create: group
    });
  }
  await prisma2.hsn.upsert({
    where: { code: "0000" },
    update: {},
    create: { code: "0000", description: "Unclassified" }
  });
  await prisma2.unit.upsert({
    where: { code: "UOM-KG" },
    update: {},
    create: { name: "Kg", code: "UOM-KG", symbol: "kg" }
  });
  await prisma2.warehouse.upsert({
    where: { code: "WH-MAIN" },
    update: {},
    create: { name: "Main Warehouse", code: "WH-MAIN", location: "Head Office", isDefault: true }
  });
}
let prisma;
function getDatabasePath() {
  const userDataPath = electron.app.getPath("userData");
  ensureDirectory(userDataPath);
  return path.join(userDataPath, "stockops.db");
}
function getPrismaClient() {
  if (!prisma) {
    const adapter = new adapterBetterSqlite3.PrismaBetterSqlite3({ url: getDatabasePath() });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}
async function initializeDatabase() {
  const dbPath = getDatabasePath();
  applyMigrations(dbPath);
  const client = getPrismaClient();
  await seedDatabase(client);
  logger.info("database initialized", { dbPath });
  return client;
}
async function closeDatabase() {
  if (prisma) {
    await prisma.$disconnect();
    prisma = void 0;
  }
}
const IPC_CHANNELS = {
  APP_INFO: "stockops:app-info",
  AUTH_BOOTSTRAP_STATUS: "stockops:auth-bootstrap-status",
  AUTH_LOGIN: "stockops:auth-login",
  AUTH_CREATE_USER: "stockops:auth-create-user",
  MASTER_LIST: "stockops:master-list",
  MASTER_GET: "stockops:master-get",
  MASTER_CREATE: "stockops:master-create",
  MASTER_UPDATE: "stockops:master-update",
  MASTER_DELETE: "stockops:master-delete",
  STOCK_RECORD: "stockops:stock-record",
  STOCK_BALANCE: "stockops:stock-balance",
  DASHBOARD_SUMMARY: "stockops:dashboard-summary",
  STOCK_RECENT_VOUCHERS: "stockops:stock-recent-vouchers",
  REPORT_EXPORT: "stockops:report-export",
  BACKUP_CREATE: "stockops:backup-create",
  BACKUP_RESTORE: "stockops:backup-restore",
  AUDIT_RECENT: "stockops:audit-recent",
  STOCK_ITEM_LEDGER: "stockops:stock-item-ledger",
  REPORT_DAILY_SUMMARY: "stockops:report-daily-summary",
  VOUCHER_PURCHASE_SAVE: "stockops:voucher-purchase-save",
  VOUCHER_PURCHASE_GET_NEXT_NO: "stockops:voucher-purchase-get-next-no",
  PARTY_GET_NEXT_CODE: "stockops:party-get-next-code",
  VOUCHER_SALE_RETURN_SAVE: "stockops:voucher-sale-return-save",
  VOUCHER_SALE_RETURN_GET_NEXT_NO: "stockops:voucher-sale-return-get-next-no",
  VOUCHER_PRODUCTION_SAVE: "stockops:voucher-production-save",
  VOUCHER_PRODUCTION_GET_NEXT_NO: "stockops:voucher-production-get-next-no",
  PRODUCTION_SETTINGS_GET: "stockops:production-settings-get",
  PRODUCTION_SETTINGS_UPDATE: "stockops:production-settings-update",
  VOUCHER_SALE_SAVE: "stockops:voucher-sale-save",
  VOUCHER_SALE_GET_NEXT_NO: "stockops:voucher-sale-get-next-no",
  VOUCHER_PURCHASE_RETURN_SAVE: "stockops:voucher-purchase-return-save",
  VOUCHER_PURCHASE_RETURN_GET_NEXT_NO: "stockops:voucher-purchase-return-get-next-no"
};
class AppError extends Error {
  constructor(message, code = "APP_ERROR", status = 400, details = null) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}
function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new AppError("Validation failed", "VALIDATION_ERROR", 400, result.error.flatten());
  }
  return result.data;
}
zod.z.object({
  id: zod.z.coerce.number().int().positive()
});
zod.z.object({
  page: zod.z.coerce.number().int().positive().default(1),
  pageSize: zod.z.coerce.number().int().positive().max(100).default(25),
  search: zod.z.string().trim().optional().default("")
});
const BOOLEAN_FIELDS = /* @__PURE__ */ new Set([
  "isActive",
  "isiMark",
  "isDefault",
  "isRecurring",
  "allowDuplicateBarcodes",
  "allowNegativeStock",
  "enableAutoBackup"
]);
function camelToSnake(key) {
  return key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}
function snakeToCamel(key) {
  return key.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}
function toWire(value) {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map(toWire);
  if (typeof value !== "object" || value instanceof Date) return value;
  const out = {};
  for (const [key, val] of Object.entries(value)) {
    const wireKey = camelToSnake(key);
    if (BOOLEAN_FIELDS.has(key) && typeof val === "boolean") {
      out[wireKey] = val ? 1 : 0;
    } else if (val instanceof Date) {
      out[wireKey] = val.toISOString();
    } else {
      out[wireKey] = val;
    }
  }
  return out;
}
function fromWire(data) {
  if (data == null) return data;
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    const camelKey = snakeToCamel(key);
    if (BOOLEAN_FIELDS.has(camelKey)) {
      out[camelKey] = value === true || value === 1 || value === "1";
    } else {
      out[camelKey] = value;
    }
  }
  return out;
}
class BaseRepository {
  constructor(modelName) {
    this.modelName = modelName;
  }
  get model() {
    return getPrismaClient()[this.modelName];
  }
  async findById(id) {
    const row = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    return toWire(row);
  }
  async findAll(where = {}) {
    const rows = await this.model.findMany({
      where: { deletedAt: null, ...where },
      orderBy: { id: "desc" }
    });
    return toWire(rows);
  }
  async create(data) {
    const row = await this.model.create({ data: fromWire(data) });
    return toWire(row);
  }
  async update(id, data) {
    const existing = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    if (!existing) return null;
    const row = await this.model.update({
      where: { id: Number(id) },
      data: fromWire(data)
    });
    return toWire(row);
  }
  async softDelete(id) {
    const existing = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    if (!existing) return null;
    const row = await this.model.update({
      where: { id: Number(id) },
      data: { deletedAt: /* @__PURE__ */ new Date() }
    });
    return toWire(row);
  }
  transaction(callback) {
    return getPrismaClient().$transaction(callback);
  }
}
function flattenWithRole(row) {
  if (!row) return null;
  const { role, ...user } = row;
  const wire = toWire(user);
  wire.role_code = role.code;
  wire.permissions_json = role.permissionsJson;
  return wire;
}
class UsersRepository extends BaseRepository {
  constructor() {
    super("user");
  }
  async findByUsername(username) {
    const row = await this.model.findFirst({
      where: { username, deletedAt: null },
      include: { role: true }
    });
    return flattenWithRole(row);
  }
  async findByUsernameWithPassword(username) {
    const row = await this.model.findFirst({
      where: { username },
      include: { role: true }
    });
    return flattenWithRole(row);
  }
}
class RolesRepository extends BaseRepository {
  constructor() {
    super("role");
  }
  async findByCode(code) {
    const row = await this.model.findFirst({ where: { code, deletedAt: null } });
    return toWire(row);
  }
}
const usersRepository = new UsersRepository();
const rolesRepository = new RolesRepository();
const PRIMARY_ROLE_CODE = "ADMIN";
const loginSchema = zod.z.object({
  username: zod.z.string().min(1),
  password: zod.z.string().min(1)
});
class AuthService {
  async needsBootstrap() {
    const count = await getPrismaClient().user.count({ where: { deletedAt: null } });
    return count === 0;
  }
  async login(input) {
    const data = validate(loginSchema, input);
    const user = await usersRepository.findByUsernameWithPassword(data.username);
    if (!user || !bcrypt.compareSync(data.password, user.password_hash)) {
      throw new AppError("Invalid username or password", "AUTH_INVALID_CREDENTIALS", 401);
    }
    return {
      id: user.id,
      fullName: user.full_name,
      username: user.username,
      role: {
        id: user.role_id,
        code: user.role_code,
        permissions: JSON.parse(user.permissions_json || "[]")
      }
    };
  }
  async createUser(input) {
    if (!await this.needsBootstrap()) {
      throw new AppError("Single-user mode is enabled. Account already initialized.", "SINGLE_USER_LOCKED", 403);
    }
    const role = await rolesRepository.findByCode(PRIMARY_ROLE_CODE);
    if (!role) {
      throw new AppError("Role not found", "ROLE_NOT_FOUND", 404);
    }
    const passwordHash = bcrypt.hashSync(input.password, 12);
    return usersRepository.create({
      full_name: input.fullName,
      username: input.username,
      password_hash: passwordHash,
      role_id: role.id,
      status: input.status ?? "active"
    });
  }
}
class BaseCrudService {
  constructor(repository, entityName, createSchema, updateSchema) {
    this.repository = repository;
    this.entityName = entityName;
    this.createSchema = createSchema;
    this.updateSchema = updateSchema;
  }
  list(filters = {}) {
    return this.repository.findPage(filters);
  }
  async get(id) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new AppError(`${this.entityName} not found`, "ENTITY_NOT_FOUND", 404);
    }
    return entity;
  }
  create(payload) {
    const data = validate(this.createSchema, payload);
    return this.repository.create(data);
  }
  async update(id, payload) {
    const data = validate(this.updateSchema, payload);
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new AppError(`${this.entityName} not found`, "ENTITY_NOT_FOUND", 404);
    }
    return updated;
  }
  remove(id) {
    return this.repository.softDelete(id);
  }
}
class LookupRepository extends BaseRepository {
  constructor(modelName, searchColumns = ["name", "code"]) {
    super(modelName);
    this.searchColumns = searchColumns;
  }
  async findPage({ page = 1, pageSize = 25, search = "" } = {}) {
    const where = { deletedAt: null };
    if (search) {
      where.OR = this.searchColumns.map((column) => ({ [column]: { contains: search } }));
    }
    const rows = await this.model.findMany({
      where,
      orderBy: { id: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize
    });
    return toWire(rows);
  }
}
const categoriesRepository = new LookupRepository("category");
const unitsRepository = new LookupRepository("unit");
const warehousesRepository = new LookupRepository("warehouse");
const partiesRepository = new LookupRepository("party");
const productsRepository = new LookupRepository("product");
const hsnRepository = new LookupRepository("hsn", ["code", "description"]);
const boolish = zod.z.preprocess((value) => {
  if (value === false || value === 0 || value === "0" || value === "false" || value === "" || value == null) {
    return false;
  }
  return Boolean(value);
}, zod.z.boolean());
const commonCreateSchema = zod.z.object({
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  description: zod.z.string().optional().nullable()
});
const commonUpdateSchema = commonCreateSchema.partial();
const hsnCreateSchema = zod.z.object({
  code: zod.z.string().min(1),
  description: zod.z.string().optional().nullable()
});
const hsnUpdateSchema = hsnCreateSchema.partial();
const partyCreateSchema = zod.z.object({
  name: zod.z.string().min(1),
  code: zod.z.string().optional().nullable(),
  mobile: zod.z.string().optional().nullable(),
  address: zod.z.string().optional().nullable(),
  city: zod.z.string().optional().nullable(),
  district: zod.z.string().optional().nullable(),
  state: zod.z.string().optional().nullable(),
  pin_code: zod.z.string().optional().nullable(),
  gstin: zod.z.string().regex(/^[0-9A-Z]{15}$/, "GST No. must be 15 uppercase letters/digits").optional().nullable().or(zod.z.literal(""))
});
const partyUpdateSchema = partyCreateSchema.partial();
class PartyService extends BaseCrudService {
  getNextCode() {
    return `PTY-${Date.now().toString().slice(-6)}`;
  }
  create(payload) {
    if (!payload.code) {
      payload.code = this.getNextCode();
    }
    return super.create(payload);
  }
}
const warehouseCreateSchema = zod.z.object({
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  location: zod.z.string().optional().nullable(),
  is_default: boolish.optional().default(false)
});
const warehouseUpdateSchema = warehouseCreateSchema.partial();
const productCreateSchema = zod.z.object({
  category_id: zod.z.coerce.number().int().positive().optional().nullable(),
  unit_id: zod.z.coerce.number().int().positive().optional().nullable(),
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  hsn: zod.z.string().optional().nullable(),
  size: zod.z.string().optional().nullable(),
  length: zod.z.string().optional().nullable(),
  gst_rate: zod.z.coerce.number().min(0).optional().default(0),
  sale_rate: zod.z.coerce.number().min(0).optional().default(0),
  purchase_rate: zod.z.coerce.number().min(0).optional().default(0),
  size_diff: zod.z.coerce.number().optional().default(0),
  batch_no: zod.z.string().optional().nullable(),
  description: zod.z.string().optional().nullable(),
  opening_stock_date: zod.z.string().optional().nullable(),
  unit_basis: zod.z.enum(["quantity", "pcs"]).optional().default("quantity"),
  isi_mark: boolish.optional().default(false),
  is_active: boolish.optional().default(true),
  min_stock: zod.z.coerce.number().min(0).optional().default(0)
});
const productUpdateSchema = productCreateSchema.partial();
class ProductService extends BaseCrudService {
  getNextCode() {
    return `ITM-${Date.now().toString().slice(-6)}`;
  }
  create(payload) {
    if (!payload.code) {
      payload.code = this.getNextCode();
    }
    return super.create(payload);
  }
}
const categoryService = new BaseCrudService(categoriesRepository, "Category", commonCreateSchema, commonUpdateSchema);
const unitService = new BaseCrudService(unitsRepository, "Unit", commonCreateSchema, commonUpdateSchema);
const hsnService = new BaseCrudService(hsnRepository, "HSN", hsnCreateSchema, hsnUpdateSchema);
const partyService = new PartyService(partiesRepository, "Party", partyCreateSchema, partyUpdateSchema);
const warehouseService = new BaseCrudService(warehousesRepository, "Warehouse", warehouseCreateSchema, warehouseUpdateSchema);
const productService = new ProductService(productsRepository, "Product", productCreateSchema, productUpdateSchema);
const stockTransactionSchema = zod.z.object({
  transaction_no: zod.z.string().min(1),
  source_type: zod.z.string().min(1),
  source_id: zod.z.coerce.number().int().positive().optional().nullable(),
  transaction_type: zod.z.enum(["purchase", "sale", "sale_return", "purchase_return", "production_in", "production_out", "adjustment_in", "adjustment_out", "transfer_in", "transfer_out", "opening_balance"]),
  product_id: zod.z.coerce.number().int().positive(),
  warehouse_id: zod.z.coerce.number().int().positive(),
  party_id: zod.z.coerce.number().int().positive().optional().nullable(),
  quantity: zod.z.coerce.number(),
  rate: zod.z.coerce.number().default(0),
  amount: zod.z.coerce.number().default(0),
  reference_no: zod.z.string().optional().nullable(),
  notes: zod.z.string().optional().nullable()
});
function startOfDayUtc(dateStr) {
  return /* @__PURE__ */ new Date(`${dateStr}T00:00:00.000Z`);
}
function endOfDayUtc(dateStr) {
  const start = startOfDayUtc(dateStr);
  return new Date(start.getTime() + 24 * 60 * 60 * 1e3);
}
class InventoryService {
  async recordStockTransaction(payload) {
    const data = validate(stockTransactionSchema, payload);
    const prisma2 = getPrismaClient();
    return prisma2.$transaction(async (tx) => {
      const existing = await tx.stockTransaction.aggregate({
        _sum: { quantity: true },
        where: { productId: data.product_id, warehouseId: data.warehouse_id, deletedAt: null }
      });
      const currentStock = Number(existing._sum.quantity ?? 0);
      const nextStock = currentStock + Number(data.quantity);
      if (nextStock < 0) {
        throw new AppError("Insufficient stock for this operation", "NEGATIVE_STOCK_BLOCKED", 400);
      }
      await tx.stockTransaction.create({
        data: {
          transactionNo: data.transaction_no,
          sourceType: data.source_type,
          sourceId: data.source_id ?? null,
          transactionType: data.transaction_type,
          productId: data.product_id,
          warehouseId: data.warehouse_id,
          partyId: data.party_id ?? null,
          quantity: data.quantity,
          rate: data.rate,
          amount: data.amount,
          referenceNo: data.reference_no ?? null,
          notes: data.notes ?? null
        }
      });
      return { stockBalance: nextStock };
    });
  }
  async getStockBalance(productId, warehouseId) {
    const prisma2 = getPrismaClient();
    const result = await prisma2.stockTransaction.aggregate({
      _sum: { quantity: true },
      where: { productId: Number(productId), warehouseId: Number(warehouseId), deletedAt: null }
    });
    return Number(result._sum.quantity ?? 0);
  }
  async getDashboardSummary() {
    const prisma2 = getPrismaClient();
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const rangeStart = startOfDayUtc(today);
    const rangeEnd = endOfDayUtc(today);
    const [todayIn, todayOut, activeProducts, stockSums] = await Promise.all([
      prisma2.stockTransaction.aggregate({
        _sum: { quantity: true },
        where: { deletedAt: null, quantity: { gt: 0 }, createdAt: { gte: rangeStart, lt: rangeEnd } }
      }),
      prisma2.stockTransaction.aggregate({
        _sum: { quantity: true },
        where: { deletedAt: null, quantity: { lt: 0 }, createdAt: { gte: rangeStart, lt: rangeEnd } }
      }),
      prisma2.product.findMany({
        where: { deletedAt: null, isActive: true },
        select: { id: true, name: true, code: true, minStock: true }
      }),
      prisma2.stockTransaction.groupBy({
        by: ["productId"],
        where: { deletedAt: null },
        _sum: { quantity: true }
      })
    ]);
    const stockByProduct = new Map(stockSums.map((row) => [row.productId, Number(row._sum.quantity ?? 0)]));
    const lowStockItems = activeProducts.map((product) => ({
      id: product.id,
      name: product.name,
      code: product.code,
      min_stock: product.minStock,
      current_stock: stockByProduct.get(product.id) ?? 0
    })).filter((item) => item.current_stock <= item.min_stock).sort((a, b) => a.current_stock - b.current_stock || a.name.localeCompare(b.name)).slice(0, 10);
    return {
      date: today,
      todayStockIn: Number(todayIn._sum.quantity ?? 0),
      todayStockOut: Math.abs(Number(todayOut._sum.quantity ?? 0)),
      lowStockCount: lowStockItems.length,
      lowStockItems
    };
  }
  async getRecentVouchers(limit = 10, type = null) {
    const prisma2 = getPrismaClient();
    const rows = await prisma2.stockTransaction.findMany({
      where: { deletedAt: null, ...type ? { transactionType: type } : {} },
      orderBy: { id: "desc" },
      take: Number(limit),
      include: { party: true, product: true }
    });
    return rows.map((row) => ({
      voucher_no: row.transactionNo,
      type: row.transactionType,
      date: row.createdAt.toISOString(),
      party: row.party?.name ?? "-",
      total: row.amount,
      status: "posted",
      item: row.product?.name ?? null
    }));
  }
  async getItemLedger(productId) {
    const prisma2 = getPrismaClient();
    const rows = await prisma2.stockTransaction.findMany({
      where: { productId: Number(productId), deletedAt: null },
      orderBy: { id: "asc" }
    });
    let balance = 0;
    return rows.map((row) => {
      const quantity = Number(row.quantity);
      balance += quantity;
      return {
        date: row.createdAt.toISOString(),
        voucher: row.transactionNo,
        type: row.transactionType,
        qty_in: quantity > 0 ? quantity : 0,
        qty_out: quantity < 0 ? Math.abs(quantity) : 0,
        balance
      };
    });
  }
  async getDailyStockSummary(filters = {}) {
    const prisma2 = getPrismaClient();
    const { fromDate, toDate, productId, categoryId } = filters;
    const productWhere = { deletedAt: null, isActive: true };
    if (productId) productWhere.id = Number(productId);
    if (categoryId) productWhere.categoryId = Number(categoryId);
    const from = fromDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString().slice(0, 10);
    const to = toDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const rangeStart = startOfDayUtc(from);
    const rangeEnd = endOfDayUtc(to);
    const products = await prisma2.product.findMany({
      where: productWhere,
      select: { id: true, name: true }
    });
    const productIds = products.map((product) => product.id);
    const productNameById = new Map(products.map((product) => [product.id, product.name]));
    if (productIds.length === 0) {
      return [];
    }
    const openingAgg = await prisma2.stockTransaction.groupBy({
      by: ["productId"],
      where: { productId: { in: productIds }, deletedAt: null, createdAt: { lt: rangeStart } },
      _sum: { quantity: true }
    });
    const runningBalance = new Map(productIds.map((id) => [id, 0]));
    for (const row of openingAgg) {
      runningBalance.set(row.productId, Number(row._sum.quantity ?? 0));
    }
    const rangeTxns = await prisma2.stockTransaction.findMany({
      where: {
        productId: { in: productIds },
        deletedAt: null,
        createdAt: { gte: rangeStart, lt: rangeEnd }
      },
      select: { productId: true, transactionType: true, quantity: true, createdAt: true },
      orderBy: { createdAt: "asc" }
    });
    const buckets = /* @__PURE__ */ new Map();
    for (const txn of rangeTxns) {
      const date = txn.createdAt.toISOString().slice(0, 10);
      const key = `${date}::${txn.productId}`;
      if (!buckets.has(key)) {
        buckets.set(key, {
          date,
          product_id: txn.productId,
          purchase: 0,
          sale_return: 0,
          production_in: 0,
          sale: 0,
          purchase_return: 0,
          production_out: 0,
          other_in: 0,
          other_out: 0
        });
      }
      const bucket = buckets.get(key);
      const quantity = Number(txn.quantity);
      const type = txn.transactionType;
      if (type === "purchase") bucket.purchase += quantity;
      else if (type === "sale_return") bucket.sale_return += quantity;
      else if (type === "production_in") bucket.production_in += quantity;
      else if (type === "sale") bucket.sale += Math.abs(quantity);
      else if (type === "purchase_return") bucket.purchase_return += Math.abs(quantity);
      else if (type === "production_out") bucket.production_out += Math.abs(quantity);
      else if (quantity > 0) bucket.other_in += quantity;
      else if (quantity < 0) bucket.other_out += Math.abs(quantity);
    }
    const sortedBuckets = [...buckets.values()].sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      const nameA = productNameById.get(a.product_id) ?? "";
      const nameB = productNameById.get(b.product_id) ?? "";
      return nameA.localeCompare(nameB);
    });
    const result = [];
    for (const bucket of sortedBuckets) {
      const opening = runningBalance.get(bucket.product_id) ?? 0;
      const totalIn = bucket.purchase + bucket.sale_return + bucket.production_in + bucket.other_in;
      const totalOut = bucket.sale + bucket.purchase_return + bucket.production_out + bucket.other_out;
      const closing = opening + totalIn - totalOut;
      result.push({
        date: bucket.date,
        product_id: bucket.product_id,
        item: productNameById.get(bucket.product_id) ?? "",
        opening,
        purchase: bucket.purchase,
        sale_return: bucket.sale_return,
        production_in: bucket.production_in,
        total_in: totalIn,
        sale: bucket.sale,
        purchase_return: bucket.purchase_return,
        issue: bucket.production_out,
        total_out: totalOut,
        closing
      });
      runningBalance.set(bucket.product_id, closing);
    }
    return result;
  }
}
class ReportService {
  exportCsv(rows) {
    return sync.stringify(rows, { header: true });
  }
  async exportExcel(rows, sheetName = "Report") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    if (rows.length > 0) {
      worksheet.columns = Object.keys(rows[0]).map((key) => ({ header: key, key }));
      worksheet.addRows(rows);
    }
    return workbook.xlsx.writeBuffer();
  }
  exportPdf(rows, title = "Report") {
    return new Promise((resolve) => {
      const chunks = [];
      const doc = new PDFDocument({ margin: 32 });
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.fontSize(18).text(title);
      doc.moveDown();
      rows.forEach((row) => {
        doc.fontSize(10).text(JSON.stringify(row));
      });
      doc.end();
    });
  }
}
class BackupService {
  getBackupDir() {
    const backupDir = path.join(electron.app.getPath("userData"), "backups");
    ensureDirectory(backupDir);
    return backupDir;
  }
  createBackup() {
    const source = getDatabasePath();
    const backupName = `stockops-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.db`;
    const target = path.join(this.getBackupDir(), backupName);
    fs.copyFileSync(source, target);
    return { path: target };
  }
  restoreBackup(backupPath) {
    const target = getDatabasePath();
    fs.copyFileSync(backupPath, target);
    return { path: target };
  }
}
class AuditLogsRepository extends BaseRepository {
  constructor() {
    super("auditLog");
  }
  async createLog(payload) {
    const row = await this.model.create({ data: fromWire(payload) });
    return toWire(row);
  }
  async recent(limit = 100) {
    const rows = await this.model.findMany({
      orderBy: { id: "desc" },
      take: Number(limit)
    });
    return toWire(rows);
  }
}
const auditLogsRepository = new AuditLogsRepository();
class AuditService {
  log(entry) {
    return auditLogsRepository.createLog({
      actor_user_id: entry.actorUserId ?? null,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId ?? null,
      payload_json: JSON.stringify(entry.payload ?? {}),
      ip_address: entry.ipAddress ?? null,
      user_agent: entry.userAgent ?? null
    });
  }
  recent(limit = 100) {
    return auditLogsRepository.recent(limit);
  }
}
const purchaseItemSchema = zod.z.object({
  product_id: zod.z.coerce.number().int().positive(),
  product_name: zod.z.string().optional().nullable(),
  hsn: zod.z.string().optional().nullable(),
  pcs: zod.z.coerce.number().min(0).optional().default(0),
  quantity: zod.z.coerce.number().min(0).optional().default(0),
  base_rate: zod.z.coerce.number().min(0),
  size_diff: zod.z.coerce.number().default(0),
  net_rate: zod.z.coerce.number().min(0),
  taxable_value: zod.z.coerce.number().min(0),
  gst_rate: zod.z.coerce.number().min(0).default(0),
  gst_amount: zod.z.coerce.number().min(0).default(0),
  amount: zod.z.coerce.number().min(0)
}).refine((item) => Number(item.pcs) > 0 || Number(item.quantity) > 0, {
  message: "Each item needs a positive pcs or quantity",
  path: ["quantity"]
});
function movementQty(item) {
  return Number(item.quantity) > 0 ? Number(item.quantity) : Number(item.pcs);
}
const purchaseVoucherSchema = zod.z.object({
  voucher_no: zod.z.string().optional().nullable(),
  invoice_no: zod.z.string().optional().nullable(),
  supplier_id: zod.z.coerce.number().int().positive().optional().nullable(),
  warehouse_id: zod.z.coerce.number().int().positive(),
  purchase_date: zod.z.string().min(10),
  // YYYY-MM-DD
  batch_no: zod.z.string().optional().nullable(),
  expiry_date: zod.z.string().optional().nullable(),
  vehicle_no: zod.z.string().optional().nullable(),
  bilty_no: zod.z.string().optional().nullable(),
  broker: zod.z.string().optional().nullable(),
  remarks: zod.z.string().optional().nullable(),
  status: zod.z.enum(["posted", "draft"]).default("posted"),
  taxable_value: zod.z.coerce.number().min(0),
  gst_amount: zod.z.coerce.number().min(0),
  total_amount: zod.z.coerce.number().min(0),
  items: zod.z.array(purchaseItemSchema).min(1)
});
class VoucherService {
  async getNextPurchaseVoucherNo() {
    const count = await getPrismaClient().purchase.count() + 1;
    return `PUR-${String(count).padStart(5, "0")}`;
  }
  async savePurchaseVoucher(payload) {
    const data = purchaseVoucherSchema.parse(payload);
    const prisma2 = getPrismaClient();
    if (!data.voucher_no) {
      data.voucher_no = await this.getNextPurchaseVoucherNo();
    }
    const purchaseId = await prisma2.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          voucherNo: data.voucher_no,
          invoiceNo: data.invoice_no,
          supplierId: data.supplier_id,
          warehouseId: data.warehouse_id,
          purchaseDate: data.purchase_date,
          batchNo: data.batch_no,
          expiryDate: data.expiry_date,
          vehicleNo: data.vehicle_no,
          biltyNo: data.bilty_no,
          broker: data.broker,
          remarks: data.remarks,
          status: data.status,
          taxableValue: data.taxable_value,
          gstAmount: data.gst_amount,
          totalAmount: data.total_amount
        }
      });
      for (const item of data.items) {
        await tx.purchaseItem.create({
          data: {
            purchaseId: purchase.id,
            productId: item.product_id,
            productName: item.product_name ?? null,
            hsn: item.hsn,
            pcs: item.pcs,
            quantity: item.quantity,
            baseRate: item.base_rate,
            sizeDiff: item.size_diff,
            netRate: item.net_rate,
            taxableValue: item.taxable_value,
            gstRate: item.gst_rate,
            gstAmount: item.gst_amount,
            amount: item.amount
          }
        });
        await tx.stockTransaction.create({
          data: {
            transactionNo: data.voucher_no,
            // we use voucher_no to link them
            sourceType: "purchase",
            sourceId: purchase.id,
            transactionType: "purchase",
            productId: item.product_id,
            warehouseId: data.warehouse_id,
            partyId: data.supplier_id,
            quantity: movementQty(item),
            rate: item.net_rate,
            amount: item.taxable_value,
            // storing taxable value as the inventory cost
            referenceNo: data.invoice_no,
            notes: data.remarks
          }
        });
      }
      return purchase.id;
    });
    return { id: purchaseId, voucher_no: data.voucher_no };
  }
  // --- SALES RETURN ---
  async getNextSaleReturnVoucherNo() {
    const count = await getPrismaClient().saleReturn.count() + 1;
    return `SR-${String(count).padStart(5, "0")}`;
  }
  async saveSaleReturnVoucher(payload) {
    const prisma2 = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextSaleReturnVoucherNo();
    const srId = await prisma2.$transaction(async (tx) => {
      const saleReturn = await tx.saleReturn.create({
        data: {
          voucherNo: payload.voucher_no,
          invoiceNo: payload.invoice_no,
          customerId: payload.customer_id,
          warehouseId: payload.warehouse_id || 1,
          returnDate: payload.return_date,
          batchNo: payload.batch_no,
          expiryDate: payload.expiry_date,
          vehicleNo: payload.vehicle_no,
          biltyNo: payload.bilty_no,
          broker: payload.broker,
          remarks: payload.remarks,
          status: "posted",
          taxableValue: payload.taxable_value,
          gstAmount: payload.gst_amount,
          totalAmount: payload.total_amount
        }
      });
      for (const item of payload.items) {
        await tx.saleReturnItem.create({
          data: {
            saleReturnId: saleReturn.id,
            productId: item.product_id,
            hsn: item.hsn,
            pcs: item.pcs,
            quantity: item.quantity,
            baseRate: item.base_rate,
            sizeDiff: item.size_diff,
            netRate: item.net_rate,
            taxableValue: item.taxable_value,
            gstRate: item.gst_rate,
            gstAmount: item.gst_amount,
            amount: item.amount
          }
        });
        await tx.stockTransaction.create({
          data: {
            transactionNo: payload.voucher_no,
            sourceType: "sale_return",
            sourceId: saleReturn.id,
            transactionType: "sale_return",
            productId: item.product_id,
            warehouseId: payload.warehouse_id || 1,
            partyId: payload.customer_id,
            quantity: Number(item.quantity),
            rate: Number(item.net_rate),
            amount: Number(item.taxable_value),
            referenceNo: payload.invoice_no,
            notes: payload.remarks
          }
        });
      }
      return saleReturn.id;
    });
    return { id: srId, voucher_no: payload.voucher_no };
  }
  // --- SALES ---
  async getNextSaleVoucherNo() {
    const count = await getPrismaClient().sale.count() + 1;
    return `SALE-${String(count).padStart(5, "0")}`;
  }
  async saveSaleVoucher(payload) {
    const prisma2 = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextSaleVoucherNo();
    const saleId = await prisma2.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          voucherNo: payload.voucher_no,
          invoiceNo: payload.invoice_no,
          customerId: payload.customer_id,
          warehouseId: payload.warehouse_id || 1,
          saleDate: payload.sale_date,
          batchNo: payload.batch_no,
          expiryDate: payload.expiry_date,
          vehicleNo: payload.vehicle_no,
          biltyNo: payload.bilty_no,
          broker: payload.broker,
          remarks: payload.remarks,
          status: "posted",
          taxableValue: payload.taxable_value,
          gstAmount: payload.gst_amount,
          totalAmount: payload.total_amount
        }
      });
      for (const item of payload.items) {
        await tx.saleItem.create({
          data: {
            saleId: sale.id,
            productId: item.product_id,
            hsn: item.hsn,
            pcs: item.pcs,
            quantity: item.quantity,
            baseRate: item.base_rate,
            sizeDiff: item.size_diff,
            netRate: item.net_rate,
            taxableValue: item.taxable_value,
            gstRate: item.gst_rate,
            gstAmount: item.gst_amount,
            amount: item.amount
          }
        });
        await tx.stockTransaction.create({
          data: {
            transactionNo: payload.voucher_no,
            sourceType: "sale",
            sourceId: sale.id,
            transactionType: "sale",
            productId: item.product_id,
            warehouseId: payload.warehouse_id || 1,
            partyId: payload.customer_id,
            quantity: -Math.abs(Number(item.quantity)),
            rate: Number(item.net_rate),
            amount: Number(item.taxable_value),
            referenceNo: payload.invoice_no,
            notes: payload.remarks
          }
        });
      }
      return sale.id;
    });
    return { id: saleId, voucher_no: payload.voucher_no };
  }
  // --- PURCHASE RETURN ---
  async getNextPurchaseReturnVoucherNo() {
    const count = await getPrismaClient().purchaseReturn.count() + 1;
    return `PR-${String(count).padStart(5, "0")}`;
  }
  async savePurchaseReturnVoucher(payload) {
    const prisma2 = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextPurchaseReturnVoucherNo();
    const prId = await prisma2.$transaction(async (tx) => {
      const purchaseReturn = await tx.purchaseReturn.create({
        data: {
          voucherNo: payload.voucher_no,
          invoiceNo: payload.invoice_no,
          supplierId: payload.supplier_id,
          warehouseId: payload.warehouse_id || 1,
          returnDate: payload.return_date,
          batchNo: payload.batch_no,
          expiryDate: payload.expiry_date,
          vehicleNo: payload.vehicle_no,
          biltyNo: payload.bilty_no,
          broker: payload.broker,
          remarks: payload.remarks,
          status: "posted",
          taxableValue: payload.taxable_value,
          gstAmount: payload.gst_amount,
          totalAmount: payload.total_amount
        }
      });
      for (const item of payload.items) {
        await tx.purchaseReturnItem.create({
          data: {
            purchaseReturnId: purchaseReturn.id,
            productId: item.product_id,
            hsn: item.hsn,
            pcs: item.pcs,
            quantity: item.quantity,
            baseRate: item.base_rate,
            sizeDiff: item.size_diff,
            netRate: item.net_rate,
            taxableValue: item.taxable_value,
            gstRate: item.gst_rate,
            gstAmount: item.gst_amount,
            amount: item.amount
          }
        });
        await tx.stockTransaction.create({
          data: {
            transactionNo: payload.voucher_no,
            sourceType: "purchase_return",
            sourceId: purchaseReturn.id,
            transactionType: "purchase_return",
            productId: item.product_id,
            warehouseId: payload.warehouse_id || 1,
            partyId: payload.supplier_id,
            quantity: -Math.abs(Number(item.quantity)),
            rate: Number(item.net_rate),
            amount: Number(item.taxable_value),
            referenceNo: payload.invoice_no,
            notes: payload.remarks
          }
        });
      }
      return purchaseReturn.id;
    });
    return { id: prId, voucher_no: payload.voucher_no };
  }
  // --- PRODUCTION ---
  async getNextProductionVoucherNo() {
    const count = await getPrismaClient().production.count() + 1;
    return `PROD-${String(count).padStart(5, "0")}`;
  }
  async saveProductionVoucher(payload) {
    const prisma2 = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextProductionVoucherNo();
    const prodId = await prisma2.$transaction(async (tx) => {
      const production = await tx.production.create({
        data: {
          voucherNo: payload.voucher_no,
          warehouseId: payload.warehouse_id || 1,
          productionDate: payload.production_date,
          isRecurring: Boolean(payload.is_recurring),
          status: "posted",
          remarks: payload.remarks
        }
      });
      for (const item of payload.items) {
        await tx.productionItem.create({
          data: {
            productionId: production.id,
            productId: item.product_id,
            batchNo: item.batch_no,
            issuedQty: item.issued_qty,
            issuedPcs: item.issued_pcs,
            productionQty: item.production_qty,
            productionPcs: item.production_pcs
          }
        });
        if (Number(item.issued_qty) > 0) {
          await tx.stockTransaction.create({
            data: {
              transactionNo: payload.voucher_no,
              sourceType: "production",
              sourceId: production.id,
              transactionType: "production_out",
              productId: item.product_id,
              warehouseId: payload.warehouse_id || 1,
              quantity: -Math.abs(Number(item.issued_qty)),
              rate: 0,
              amount: 0,
              notes: payload.remarks
            }
          });
        }
        if (Number(item.production_qty) > 0) {
          await tx.stockTransaction.create({
            data: {
              transactionNo: payload.voucher_no,
              sourceType: "production",
              sourceId: production.id,
              transactionType: "production_in",
              productId: item.product_id,
              warehouseId: payload.warehouse_id || 1,
              quantity: Math.abs(Number(item.production_qty)),
              rate: 0,
              amount: 0,
              notes: payload.remarks
            }
          });
        }
      }
      return production.id;
    });
    return { id: prodId, voucher_no: payload.voucher_no };
  }
  async getProductionSettings() {
    const setting = await getPrismaClient().setting.findUnique({ where: { id: 1 } });
    try {
      return JSON.parse(setting?.productionSettingsJson || "{}");
    } catch {
      return {};
    }
  }
  async updateProductionSettings(settingsJson) {
    await getPrismaClient().setting.update({
      where: { id: 1 },
      data: { productionSettingsJson: JSON.stringify(settingsJson) }
    });
    return settingsJson;
  }
}
const authService = new AuthService();
const inventoryService = new InventoryService();
const reportService = new ReportService();
const backupService = new BackupService();
const auditService = new AuditService();
const voucherService = new VoucherService();
const servicesByEntity = {
  category: categoryService,
  unit: unitService,
  hsn: hsnService,
  party: partyService,
  warehouse: warehouseService,
  product: productService
};
function registerIpcHandlers() {
  electron.ipcMain.handle(IPC_CHANNELS.APP_INFO, () => ({ name: "StockOps", version: "1.0.0" }));
  electron.ipcMain.handle(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS, async () => ({ needsBootstrap: await authService.needsBootstrap() }));
  electron.ipcMain.handle(IPC_CHANNELS.AUTH_LOGIN, async (_event, payload) => authService.login(payload));
  electron.ipcMain.handle(IPC_CHANNELS.AUTH_CREATE_USER, async (_event, payload) => authService.createUser(payload));
  electron.ipcMain.handle(IPC_CHANNELS.MASTER_LIST, async (_event, { entity, filters }) => {
    return servicesByEntity[entity].list(filters);
  });
  electron.ipcMain.handle(IPC_CHANNELS.MASTER_GET, async (_event, { entity, id }) => {
    return servicesByEntity[entity].get(id);
  });
  electron.ipcMain.handle(IPC_CHANNELS.MASTER_CREATE, async (_event, { entity, payload }) => {
    return servicesByEntity[entity].create(payload);
  });
  electron.ipcMain.handle(IPC_CHANNELS.MASTER_UPDATE, async (_event, { entity, id, payload }) => {
    return servicesByEntity[entity].update(id, payload);
  });
  electron.ipcMain.handle(IPC_CHANNELS.MASTER_DELETE, async (_event, { entity, id }) => {
    return servicesByEntity[entity].remove(id);
  });
  electron.ipcMain.handle(IPC_CHANNELS.STOCK_RECORD, async (_event, payload) => inventoryService.recordStockTransaction(payload));
  electron.ipcMain.handle(IPC_CHANNELS.STOCK_BALANCE, async (_event, { productId, warehouseId }) => inventoryService.getStockBalance(productId, warehouseId));
  electron.ipcMain.handle(IPC_CHANNELS.DASHBOARD_SUMMARY, async () => inventoryService.getDashboardSummary());
  electron.ipcMain.handle(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, async (_event, { limit = 10, type = null } = {}) => inventoryService.getRecentVouchers(limit, type));
  electron.ipcMain.handle(IPC_CHANNELS.STOCK_ITEM_LEDGER, async (_event, productId) => inventoryService.getItemLedger(productId));
  electron.ipcMain.handle(IPC_CHANNELS.REPORT_DAILY_SUMMARY, async (_event, filters) => inventoryService.getDailyStockSummary(filters));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_SAVE, async (_event, payload) => voucherService.savePurchaseVoucher(payload));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_GET_NEXT_NO, async () => voucherService.getNextPurchaseVoucherNo());
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_RETURN_SAVE, async (_event, payload) => voucherService.saveSaleReturnVoucher(payload));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_RETURN_GET_NEXT_NO, async () => voucherService.getNextSaleReturnVoucherNo());
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_PRODUCTION_SAVE, async (_event, payload) => voucherService.saveProductionVoucher(payload));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_PRODUCTION_GET_NEXT_NO, async () => voucherService.getNextProductionVoucherNo());
  electron.ipcMain.handle(IPC_CHANNELS.PRODUCTION_SETTINGS_GET, async () => voucherService.getProductionSettings());
  electron.ipcMain.handle(IPC_CHANNELS.PRODUCTION_SETTINGS_UPDATE, async (_event, payload) => voucherService.updateProductionSettings(payload));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_SAVE, async (_event, payload) => voucherService.saveSaleVoucher(payload));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_GET_NEXT_NO, async () => voucherService.getNextSaleVoucherNo());
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_RETURN_SAVE, async (_event, payload) => voucherService.savePurchaseReturnVoucher(payload));
  electron.ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_RETURN_GET_NEXT_NO, async () => voucherService.getNextPurchaseReturnVoucherNo());
  electron.ipcMain.handle(IPC_CHANNELS.PARTY_GET_NEXT_CODE, async () => partyService.getNextCode());
  electron.ipcMain.handle(IPC_CHANNELS.REPORT_EXPORT, async (_event, { format, rows, title }) => {
    if (format === "csv") {
      return reportService.exportCsv(rows);
    }
    if (format === "excel") {
      return reportService.exportExcel(rows, title);
    }
    if (format === "pdf") {
      return reportService.exportPdf(rows, title);
    }
    throw new Error("Unsupported report format");
  });
  electron.ipcMain.handle(IPC_CHANNELS.BACKUP_CREATE, async () => backupService.createBackup());
  electron.ipcMain.handle(IPC_CHANNELS.BACKUP_RESTORE, async (_event, backupPath) => backupService.restoreBackup(backupPath));
  electron.ipcMain.handle(IPC_CHANNELS.AUDIT_RECENT, async (_event, limit) => auditService.recent(limit));
}
const isDev = !electron.app.isPackaged;
function configureSessionPaths() {
  const userDataPath = electron.app.getPath("userData");
  ensureDirectory(userDataPath);
  const sessionDataPath = path.join(userDataPath, "session-data");
  const cachePath = path.join(sessionDataPath, "Cache");
  ensureDirectory(sessionDataPath);
  ensureDirectory(cachePath);
  electron.app.setPath("sessionData", sessionDataPath);
  electron.app.commandLine.appendSwitch("disk-cache-dir", cachePath);
}
function createMainWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1200,
    minHeight: 780,
    backgroundColor: "#0b1220",
    title: "StockOps",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(electron.app.getAppPath(), "out/preload/index.js")
    }
  });
  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(electron.app.getAppPath(), "out/renderer/index.html"));
  }
  return mainWindow;
}
configureSessionPaths();
electron.app.whenReady().then(async () => {
  await initializeDatabase();
  registerIpcHandlers();
  createMainWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
}).catch((error) => {
  logger.error("startup failed", { message: error.message, stack: error.stack });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    closeDatabase().finally(() => electron.app.quit());
  }
});
process.on("uncaughtException", (error) => {
  logger.error("uncaught exception", { message: error.message, stack: error.stack });
});
process.on("unhandledRejection", (reason) => {
  logger.error("unhandled rejection", { message: reason?.message, stack: reason?.stack, reason });
});
