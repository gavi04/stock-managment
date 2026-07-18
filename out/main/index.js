"use strict";
const electron = require("electron");
const path = require("node:path");
const Database = require("better-sqlite3");
const fs = require("node:fs");
const bcrypt = require("bcryptjs");
const zod = require("zod");
const ExcelJS = require("exceljs");
const sync = require("csv-stringify/sync");
const PDFDocument = require("pdfkit");
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
const schemaStatements = [
  `PRAGMA foreign_keys = ON;`,
  `CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    permissions_json TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    last_login_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );`,
  `CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    company_name TEXT NOT NULL DEFAULT 'StockOps',
    allow_duplicate_barcodes INTEGER NOT NULL DEFAULT 0,
    allow_negative_stock INTEGER NOT NULL DEFAULT 0,
    enable_auto_backup INTEGER NOT NULL DEFAULT 1,
    backup_interval_hours INTEGER NOT NULL DEFAULT 24,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    symbol TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS warehouses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    location TEXT,
    is_default INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS parties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('customer', 'supplier', 'both')),
    phone TEXT,
    email TEXT,
    address TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    unit_id INTEGER,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    barcode TEXT UNIQUE,
    sku TEXT UNIQUE,
    is_active INTEGER NOT NULL DEFAULT 1,
    track_batch INTEGER NOT NULL DEFAULT 0,
    track_serial INTEGER NOT NULL DEFAULT 0,
    min_stock REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
  );`,
  `CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_no TEXT NOT NULL UNIQUE,
    supplier_id INTEGER,
    warehouse_id INTEGER NOT NULL,
    purchase_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'posted',
    total_amount REAL NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (supplier_id) REFERENCES parties(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
  );`,
  `CREATE TABLE IF NOT EXISTS purchase_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity REAL NOT NULL,
    rate REAL NOT NULL,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_no TEXT NOT NULL UNIQUE,
    customer_id INTEGER,
    warehouse_id INTEGER NOT NULL,
    sale_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'posted',
    total_amount REAL NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (customer_id) REFERENCES parties(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
  );`,
  `CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity REAL NOT NULL,
    rate REAL NOT NULL,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS production (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_no TEXT NOT NULL UNIQUE,
    warehouse_id INTEGER NOT NULL,
    production_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'posted',
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
  );`,
  `CREATE TABLE IF NOT EXISTS production_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    production_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity REAL NOT NULL,
    direction TEXT NOT NULL CHECK (direction IN ('input', 'output')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (production_id) REFERENCES production(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS stock_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_no TEXT NOT NULL UNIQUE,
    source_type TEXT NOT NULL,
    source_id INTEGER,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'sale', 'sale_return', 'purchase_return', 'production_in', 'production_out', 'adjustment_in', 'adjustment_out', 'transfer_in', 'transfer_out', 'opening_balance')),
    product_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    party_id INTEGER,
    quantity REAL NOT NULL,
    rate REAL NOT NULL DEFAULT 0,
    amount REAL NOT NULL DEFAULT 0,
    reference_no TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
    FOREIGN KEY (party_id) REFERENCES parties(id)
  );`,
  `CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_user_id INTEGER,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id INTEGER,
    payload_json TEXT NOT NULL DEFAULT '{}',
    ip_address TEXT,
    user_agent TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_user_id) REFERENCES users(id)
  );`,
  `CREATE INDEX IF NOT EXISTS idx_products_code ON products(code);`,
  `CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);`,
  `CREATE INDEX IF NOT EXISTS idx_stock_transactions_lookup ON stock_transactions(product_id, warehouse_id, transaction_type, created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);`
];
function getSeedStatements() {
  return [
    `INSERT OR IGNORE INTO roles (id, name, code, permissions_json) VALUES
      (1, 'Admin', 'ADMIN', '["*"]'),
      (2, 'Manager', 'MANAGER', '["inventory:*","masters:*","reports:read","backup:read"]'),
      (3, 'Operator', 'OPERATOR', '["inventory:write","masters:read","reports:read"]'),
      (4, 'Viewer', 'VIEWER', '["masters:read","inventory:read","reports:read"]');`,
    `INSERT OR IGNORE INTO settings (id, company_name, allow_duplicate_barcodes, allow_negative_stock, enable_auto_backup, backup_interval_hours) VALUES
      (1, 'StockOps', 0, 0, 1, 24);`,
    `INSERT OR IGNORE INTO categories (id, name, code, description) VALUES
      (1, 'Raw Material', 'CAT-RAW', 'Default category');`,
    `INSERT OR IGNORE INTO units (id, name, code, symbol) VALUES
      (1, 'Kg', 'UOM-KG', 'kg');`,
    `INSERT OR IGNORE INTO warehouses (id, name, code, location, is_default) VALUES
      (1, 'Main Warehouse', 'WH-MAIN', 'Head Office', 1);`
  ];
}
let database;
function getDatabasePath() {
  const userDataPath = electron.app.getPath("userData");
  ensureDirectory(userDataPath);
  return path.join(userDataPath, "stockops.db");
}
function createDatabase() {
  if (!database) {
    database = new Database(getDatabasePath());
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
  }
  return database;
}
function initializeDatabase() {
  const db = createDatabase();
  const migration = db.transaction(() => {
    for (const statement of schemaStatements) {
      db.prepare(statement).run();
    }
    for (const statement of getSeedStatements()) {
      db.prepare(statement).run();
    }
  });
  migration();
  logger.info("database initialized", { dbPath: getDatabasePath() });
  return db;
}
function getDatabase() {
  return createDatabase();
}
function closeDatabase() {
  if (database) {
    database.close();
    database = void 0;
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
  AUDIT_RECENT: "stockops:audit-recent"
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
function runQuery(sql, params = {}) {
  return getDatabase().prepare(sql).run(params);
}
function getOne(sql, params = {}) {
  return getDatabase().prepare(sql).get(params) ?? null;
}
function getAll(sql, params = {}) {
  return getDatabase().prepare(sql).all(params);
}
function runTransaction(callback) {
  return getDatabase().transaction(callback)();
}
class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }
  findById(id) {
    return getOne(`SELECT * FROM ${this.tableName} WHERE id = :id AND deleted_at IS NULL`, { id });
  }
  findAll(whereClause = "deleted_at IS NULL", params = {}) {
    return getAll(`SELECT * FROM ${this.tableName} WHERE ${whereClause} ORDER BY id DESC`, params);
  }
  create(columns, data) {
    const placeholders = columns.map((column) => `:${column}`).join(", ");
    const sql = `INSERT INTO ${this.tableName} (${columns.join(", ")}) VALUES (${placeholders})`;
    const result = runQuery(sql, data);
    return this.findById(result.lastInsertRowid);
  }
  update(id, columns, data) {
    const assignments = columns.map((column) => `${column} = :${column}`).join(", ");
    runQuery(
      `UPDATE ${this.tableName} SET ${assignments}, updated_at = CURRENT_TIMESTAMP WHERE id = :id AND deleted_at IS NULL`,
      { ...data, id }
    );
    return this.findById(id);
  }
  softDelete(id) {
    return runQuery(
      `UPDATE ${this.tableName} SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = :id AND deleted_at IS NULL`,
      { id }
    );
  }
  transaction(callback) {
    return runTransaction(callback);
  }
}
class UsersRepository extends BaseRepository {
  constructor() {
    super("users");
  }
  findByUsername(username) {
    return getOne(
      "SELECT users.*, roles.code as role_code, roles.permissions_json FROM users INNER JOIN roles ON roles.id = users.role_id WHERE users.username = :username AND users.deleted_at IS NULL",
      { username }
    );
  }
  findByUsernameWithPassword(username) {
    return getOne(
      "SELECT users.*, roles.code as role_code, roles.permissions_json FROM users INNER JOIN roles ON roles.id = users.role_id WHERE users.username = :username",
      { username }
    );
  }
}
class RolesRepository extends BaseRepository {
  constructor() {
    super("roles");
  }
  findByCode(code) {
    return getAll("SELECT * FROM roles WHERE code = :code AND deleted_at IS NULL", { code })[0] ?? null;
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
  needsBootstrap() {
    const row = getOne("SELECT COUNT(*) AS count FROM users WHERE deleted_at IS NULL");
    return Number(row?.count ?? 0) === 0;
  }
  async login(input) {
    const data = validate(loginSchema, input);
    const user = usersRepository.findByUsernameWithPassword(data.username);
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
    if (!this.needsBootstrap()) {
      throw new AppError("Single-user mode is enabled. Account already initialized.", "SINGLE_USER_LOCKED", 403);
    }
    const role = rolesRepository.findByCode(PRIMARY_ROLE_CODE);
    if (!role) {
      throw new AppError("Role not found", "ROLE_NOT_FOUND", 404);
    }
    const passwordHash = bcrypt.hashSync(input.password, 12);
    return usersRepository.create(["full_name", "username", "password_hash", "role_id", "status"], {
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
  get(id) {
    const entity = this.repository.findById(id);
    if (!entity) {
      throw new AppError(`${this.entityName} not found`, "ENTITY_NOT_FOUND", 404);
    }
    return entity;
  }
  create(payload) {
    const data = validate(this.createSchema, payload);
    return this.repository.create(Object.keys(data), data);
  }
  update(id, payload) {
    const data = validate(this.updateSchema, payload);
    const updated = this.repository.update(id, Object.keys(data), data);
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
  constructor(tableName, searchColumns = ["name", "code"]) {
    super(tableName);
    this.searchColumns = searchColumns;
  }
  findPage({ page = 1, pageSize = 25, search = "" } = {}) {
    const offset = (page - 1) * pageSize;
    const whereParts = ["deleted_at IS NULL"];
    const params = {};
    if (search) {
      const searchClause = this.searchColumns.map((column) => `${column} LIKE :search`).join(" OR ");
      whereParts.push(`(${searchClause})`);
      params.search = `%${search}%`;
    }
    const whereClause = whereParts.join(" AND ");
    const rows = this.findAll(whereClause, params);
    return rows.slice(offset, offset + pageSize);
  }
}
const categoriesRepository = new LookupRepository("categories");
const unitsRepository = new LookupRepository("units");
const warehousesRepository = new LookupRepository("warehouses");
const partiesRepository = new LookupRepository("parties");
const productsRepository = new LookupRepository("products");
const commonCreateSchema = zod.z.object({
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  description: zod.z.string().optional().nullable()
});
const commonUpdateSchema = commonCreateSchema.partial();
const partyCreateSchema = zod.z.object({
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  type: zod.z.enum(["customer", "supplier", "both"]),
  phone: zod.z.string().optional().nullable(),
  email: zod.z.string().email().optional().nullable(),
  address: zod.z.string().optional().nullable()
});
const partyUpdateSchema = partyCreateSchema.partial();
const warehouseCreateSchema = zod.z.object({
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  location: zod.z.string().optional().nullable(),
  is_default: zod.z.coerce.number().int().min(0).max(1).optional().default(0)
});
const warehouseUpdateSchema = warehouseCreateSchema.partial();
const productCreateSchema = zod.z.object({
  category_id: zod.z.coerce.number().int().positive().optional().nullable(),
  unit_id: zod.z.coerce.number().int().positive().optional().nullable(),
  name: zod.z.string().min(1),
  code: zod.z.string().min(1),
  barcode: zod.z.string().optional().nullable(),
  sku: zod.z.string().optional().nullable(),
  is_active: zod.z.coerce.number().int().min(0).max(1).optional().default(1),
  track_batch: zod.z.coerce.number().int().min(0).max(1).optional().default(0),
  track_serial: zod.z.coerce.number().int().min(0).max(1).optional().default(0),
  min_stock: zod.z.coerce.number().default(0)
});
const productUpdateSchema = productCreateSchema.partial();
const categoryService = new BaseCrudService(categoriesRepository, "Category", commonCreateSchema, commonUpdateSchema);
const unitService = new BaseCrudService(unitsRepository, "Unit", commonCreateSchema, commonUpdateSchema);
const partyService = new BaseCrudService(partiesRepository, "Party", partyCreateSchema, partyUpdateSchema);
const warehouseService = new BaseCrudService(warehousesRepository, "Warehouse", warehouseCreateSchema, warehouseUpdateSchema);
const productService = new BaseCrudService(productsRepository, "Product", productCreateSchema, productUpdateSchema);
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
class InventoryService {
  recordStockTransaction(payload) {
    const data = validate(stockTransactionSchema, payload);
    const db = getDatabase();
    const existing = db.prepare(
      `SELECT COALESCE(SUM(quantity), 0) AS stock_balance
       FROM stock_transactions
       WHERE product_id = :product_id AND warehouse_id = :warehouse_id AND deleted_at IS NULL`
    ).get({ product_id: data.product_id, warehouse_id: data.warehouse_id });
    const currentStock = Number(existing?.stock_balance ?? 0);
    const nextStock = currentStock + Number(data.quantity);
    if (nextStock < 0) {
      throw new AppError("Insufficient stock for this operation", "NEGATIVE_STOCK_BLOCKED", 400);
    }
    const transaction = db.transaction(() => {
      db.prepare(
        `INSERT INTO stock_transactions
         (transaction_no, source_type, source_id, transaction_type, product_id, warehouse_id, party_id, quantity, rate, amount, reference_no, notes)
         VALUES
         (:transaction_no, :source_type, :source_id, :transaction_type, :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount, :reference_no, :notes)`
      ).run(data);
    });
    transaction();
    return { stockBalance: nextStock };
  }
  getStockBalance(productId, warehouseId) {
    const db = getDatabase();
    const row = db.prepare(
      `SELECT COALESCE(SUM(quantity), 0) AS stock_balance
       FROM stock_transactions
       WHERE product_id = :product_id AND warehouse_id = :warehouse_id AND deleted_at IS NULL`
    ).get({ product_id: productId, warehouse_id: warehouseId });
    return Number(row?.stock_balance ?? 0);
  }
  getDashboardSummary() {
    const db = getDatabase();
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const todayIn = db.prepare(
      `SELECT COALESCE(SUM(quantity), 0) AS total
       FROM stock_transactions
       WHERE deleted_at IS NULL AND quantity > 0 AND DATE(created_at) = :today`
    ).get({ today });
    const todayOut = db.prepare(
      `SELECT COALESCE(SUM(ABS(quantity)), 0) AS total
       FROM stock_transactions
       WHERE deleted_at IS NULL AND quantity < 0 AND DATE(created_at) = :today`
    ).get({ today });
    const lowStockItems = db.prepare(
      `SELECT
        p.id,
        p.name,
        p.code,
        p.min_stock,
        COALESCE(SUM(st.quantity), 0) AS current_stock
      FROM products p
      LEFT JOIN stock_transactions st ON st.product_id = p.id AND st.deleted_at IS NULL
      WHERE p.deleted_at IS NULL AND p.is_active = 1
      GROUP BY p.id, p.name, p.code, p.min_stock
      HAVING current_stock <= p.min_stock
      ORDER BY current_stock ASC, p.name ASC
      LIMIT 10`
    ).all();
    return {
      date: today,
      todayStockIn: Number(todayIn?.total ?? 0),
      todayStockOut: Number(todayOut?.total ?? 0),
      lowStockCount: lowStockItems.length,
      lowStockItems
    };
  }
  getRecentVouchers(limit = 10) {
    const db = getDatabase();
    return db.prepare(
      `SELECT
        st.transaction_no AS voucher_no,
        st.transaction_type AS type,
        st.created_at AS date,
        COALESCE(pa.name, '-') AS party,
        st.amount AS total,
        'posted' AS status,
        pr.name AS item
      FROM stock_transactions st
      LEFT JOIN parties pa ON pa.id = st.party_id
      LEFT JOIN products pr ON pr.id = st.product_id
      WHERE st.deleted_at IS NULL
      ORDER BY st.id DESC
      LIMIT :limit`
    ).all({ limit });
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
    super("audit_logs");
  }
  createLog(payload) {
    return runQuery(
      `INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, payload_json, ip_address, user_agent)
       VALUES (:actor_user_id, :action, :entity_type, :entity_id, :payload_json, :ip_address, :user_agent)`,
      payload
    );
  }
  recent(limit = 100) {
    return getAll("SELECT * FROM audit_logs ORDER BY id DESC LIMIT :limit", { limit });
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
const authService = new AuthService();
const inventoryService = new InventoryService();
const reportService = new ReportService();
const backupService = new BackupService();
const auditService = new AuditService();
const servicesByEntity = {
  category: categoryService,
  unit: unitService,
  party: partyService,
  warehouse: warehouseService,
  product: productService
};
function registerIpcHandlers() {
  electron.ipcMain.handle(IPC_CHANNELS.APP_INFO, () => ({ name: "StockOps", version: "1.0.0" }));
  electron.ipcMain.handle(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS, async () => ({ needsBootstrap: authService.needsBootstrap() }));
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
  electron.ipcMain.handle(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, async (_event, { limit = 10 } = {}) => inventoryService.getRecentVouchers(limit));
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
electron.app.whenReady().then(() => {
  initializeDatabase();
  registerIpcHandlers();
  createMainWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    closeDatabase();
    electron.app.quit();
  }
});
process.on("uncaughtException", (error) => {
  logger.error("uncaught exception", { message: error.message, stack: error.stack });
});
process.on("unhandledRejection", (reason) => {
  logger.error("unhandled rejection", { reason });
});
