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
    production_settings_json TEXT DEFAULT '{}',
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
    mobile TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    district TEXT,
    state TEXT,
    pin_code TEXT,
    gstin TEXT,
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
    voucher_no TEXT NOT NULL UNIQUE,
    invoice_no TEXT,
    supplier_id INTEGER,
    warehouse_id INTEGER NOT NULL,
    purchase_date TEXT NOT NULL,
    batch_no TEXT,
    expiry_date TEXT,
    vehicle_no TEXT,
    bilty_no TEXT,
    broker TEXT,
    remarks TEXT,
    status TEXT NOT NULL DEFAULT 'posted',
    taxable_value REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    total_amount REAL NOT NULL DEFAULT 0,
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
    hsn TEXT,
    pcs REAL,
    quantity REAL NOT NULL,
    base_rate REAL NOT NULL,
    size_diff REAL NOT NULL DEFAULT 0,
    net_rate REAL NOT NULL,
    taxable_value REAL NOT NULL,
    gst_rate REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voucher_no TEXT NOT NULL UNIQUE,
    invoice_no TEXT,
    customer_id INTEGER,
    warehouse_id INTEGER NOT NULL,
    sale_date TEXT NOT NULL,
    batch_no TEXT,
    expiry_date TEXT,
    vehicle_no TEXT,
    bilty_no TEXT,
    broker TEXT,
    remarks TEXT,
    status TEXT NOT NULL DEFAULT 'posted',
    taxable_value REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    total_amount REAL NOT NULL DEFAULT 0,
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
    hsn TEXT,
    pcs REAL,
    quantity REAL NOT NULL,
    base_rate REAL NOT NULL,
    size_diff REAL NOT NULL DEFAULT 0,
    net_rate REAL NOT NULL,
    taxable_value REAL NOT NULL,
    gst_rate REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS sale_returns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voucher_no TEXT NOT NULL UNIQUE,
    invoice_no TEXT,
    customer_id INTEGER,
    warehouse_id INTEGER NOT NULL,
    return_date TEXT NOT NULL,
    batch_no TEXT,
    expiry_date TEXT,
    vehicle_no TEXT,
    bilty_no TEXT,
    broker TEXT,
    remarks TEXT,
    status TEXT NOT NULL DEFAULT 'posted',
    taxable_value REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    total_amount REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (customer_id) REFERENCES parties(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
  );`,
  `CREATE TABLE IF NOT EXISTS sale_return_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_return_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    hsn TEXT,
    pcs REAL,
    quantity REAL NOT NULL,
    base_rate REAL NOT NULL,
    size_diff REAL NOT NULL DEFAULT 0,
    net_rate REAL NOT NULL,
    taxable_value REAL NOT NULL,
    gst_rate REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (sale_return_id) REFERENCES sale_returns(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS purchase_returns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voucher_no TEXT NOT NULL UNIQUE,
    invoice_no TEXT,
    supplier_id INTEGER,
    warehouse_id INTEGER NOT NULL,
    return_date TEXT NOT NULL,
    batch_no TEXT,
    expiry_date TEXT,
    vehicle_no TEXT,
    bilty_no TEXT,
    broker TEXT,
    remarks TEXT,
    status TEXT NOT NULL DEFAULT 'posted',
    taxable_value REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    total_amount REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (supplier_id) REFERENCES parties(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
  );`,
  `CREATE TABLE IF NOT EXISTS purchase_return_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_return_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    hsn TEXT,
    pcs REAL,
    quantity REAL NOT NULL,
    base_rate REAL NOT NULL,
    size_diff REAL NOT NULL DEFAULT 0,
    net_rate REAL NOT NULL,
    taxable_value REAL NOT NULL,
    gst_rate REAL NOT NULL DEFAULT 0,
    gst_amount REAL NOT NULL DEFAULT 0,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (purchase_return_id) REFERENCES purchase_returns(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );`,
  `CREATE TABLE IF NOT EXISTS production (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voucher_no TEXT NOT NULL UNIQUE,
    warehouse_id INTEGER NOT NULL,
    production_date TEXT NOT NULL,
    is_recurring INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'posted',
    remarks TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
  );`,
  `CREATE TABLE IF NOT EXISTS production_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    production_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    batch_no TEXT,
    issued_qty REAL NOT NULL DEFAULT 0,
    issued_pcs REAL NOT NULL DEFAULT 0,
    production_qty REAL NOT NULL DEFAULT 0,
    production_pcs REAL NOT NULL DEFAULT 0,
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
  try {
    const hasData = db.prepare(`SELECT COUNT(*) as c FROM purchases`).get().c > 0;
    if (!hasData) {
      db.exec(`DROP TABLE IF EXISTS purchase_items; DROP TABLE IF EXISTS purchases;`);
    }
    const hasProdData = db.prepare(`SELECT COUNT(*) as c FROM production`).get().c > 0;
    if (!hasProdData) {
      db.exec(`DROP TABLE IF EXISTS production_items; DROP TABLE IF EXISTS production;`);
    }
    const hasSaleData = db.prepare(`SELECT COUNT(*) as c FROM sales`).get().c > 0;
    if (!hasSaleData) {
      db.exec(`DROP TABLE IF EXISTS sale_items; DROP TABLE IF EXISTS sales;`);
    }
  } catch (e) {
  }
  const migration = db.transaction(() => {
    for (const statement of schemaStatements) {
      db.prepare(statement).run();
    }
    for (const statement of getSeedStatements()) {
      db.prepare(statement).run();
    }
  });
  migration();
  const addColumn = (table, column, def) => {
    const cols = db.pragma(`table_info(${table})`);
    if (!cols.find((c) => c.name === column)) {
      try {
        db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`).run();
      } catch (e) {
      }
    }
  };
  addColumn("parties", "mobile", "TEXT");
  addColumn("parties", "city", "TEXT");
  addColumn("parties", "district", "TEXT");
  addColumn("parties", "state", "TEXT");
  addColumn("parties", "pin_code", "TEXT");
  addColumn("parties", "gstin", "TEXT");
  addColumn("settings", "production_settings_json", 'TEXT DEFAULT "{}"');
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
  code: zod.z.string().optional().nullable(),
  type: zod.z.enum(["customer", "supplier", "both"]).default("customer"),
  phone: zod.z.string().optional().nullable(),
  mobile: zod.z.string().optional().nullable(),
  email: zod.z.string().email().optional().nullable().or(zod.z.literal("")),
  address: zod.z.string().optional().nullable(),
  city: zod.z.string().optional().nullable(),
  district: zod.z.string().optional().nullable(),
  state: zod.z.string().optional().nullable(),
  pin_code: zod.z.string().optional().nullable(),
  gstin: zod.z.string().optional().nullable()
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
const partyService = new PartyService(partiesRepository, "Party", partyCreateSchema, partyUpdateSchema);
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
  getRecentVouchers(limit = 10, type = null) {
    const db = getDatabase();
    let query = `
      SELECT
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
    `;
    if (type) {
      query += ` AND st.transaction_type = :type`;
    }
    query += ` ORDER BY st.id DESC LIMIT :limit`;
    return db.prepare(query).all({ limit, type });
  }
  getItemLedger(productId) {
    const db = getDatabase();
    return db.prepare(
      `SELECT
        st.created_at AS date,
        st.transaction_no AS voucher,
        st.transaction_type AS type,
        CASE WHEN st.quantity > 0 THEN st.quantity ELSE 0 END AS qty_in,
        CASE WHEN st.quantity < 0 THEN ABS(st.quantity) ELSE 0 END AS qty_out,
        SUM(st.quantity) OVER (ORDER BY st.id ASC) AS balance
      FROM stock_transactions st
      WHERE st.product_id = :productId AND st.deleted_at IS NULL
      ORDER BY st.id ASC`
    ).all({ productId });
  }
  getDailyStockSummary(filters = {}) {
    const db = getDatabase();
    const { fromDate, toDate, productId, categoryId } = filters;
    let baseWhere = `p.deleted_at IS NULL AND p.is_active = 1`;
    const params = {};
    if (productId) {
      baseWhere += ` AND p.id = :productId`;
      params.productId = productId;
    }
    if (categoryId) {
      baseWhere += ` AND p.category_id = :categoryId`;
      params.categoryId = categoryId;
    }
    params.fromDate = fromDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString().slice(0, 10);
    params.toDate = toDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const openingQuery = `
      SELECT p.id as product_id, p.name as product_name, COALESCE(SUM(st.quantity), 0) as opening_balance
      FROM products p
      LEFT JOIN stock_transactions st ON st.product_id = p.id AND st.deleted_at IS NULL AND DATE(st.created_at) < :fromDate
      WHERE ${baseWhere}
      GROUP BY p.id
    `;
    const openingRows = db.prepare(openingQuery).all(params);
    const openingMap = /* @__PURE__ */ new Map();
    openingRows.forEach((row) => {
      openingMap.set(row.product_id, {
        product_name: row.product_name,
        balance: row.opening_balance
      });
    });
    const dailyQuery = `
      SELECT 
        DATE(st.created_at) as date,
        p.id as product_id,
        p.name as product_name,
        SUM(CASE WHEN st.transaction_type = 'purchase' THEN st.quantity ELSE 0 END) as purchase,
        SUM(CASE WHEN st.transaction_type = 'sale_return' THEN st.quantity ELSE 0 END) as sale_return,
        SUM(CASE WHEN st.transaction_type = 'production_in' THEN st.quantity ELSE 0 END) as production_in,
        SUM(CASE WHEN st.transaction_type = 'sale' THEN ABS(st.quantity) ELSE 0 END) as sale,
        SUM(CASE WHEN st.transaction_type = 'purchase_return' THEN ABS(st.quantity) ELSE 0 END) as purchase_return,
        SUM(CASE WHEN st.transaction_type = 'production_out' THEN ABS(st.quantity) ELSE 0 END) as production_out,
        SUM(CASE WHEN st.quantity > 0 AND st.transaction_type NOT IN ('purchase', 'sale_return', 'production_in') THEN st.quantity ELSE 0 END) as other_in,
        SUM(CASE WHEN st.quantity < 0 AND st.transaction_type NOT IN ('sale', 'purchase_return', 'production_out') THEN ABS(st.quantity) ELSE 0 END) as other_out
      FROM stock_transactions st
      JOIN products p ON p.id = st.product_id
      WHERE ${baseWhere} AND st.deleted_at IS NULL AND DATE(st.created_at) >= :fromDate AND DATE(st.created_at) <= :toDate
      GROUP BY DATE(st.created_at), p.id
      ORDER BY DATE(st.created_at) ASC, p.name ASC
    `;
    const dailyRows = db.prepare(dailyQuery).all(params);
    const result = [];
    for (const row of dailyRows) {
      const pid = row.product_id;
      const current = openingMap.get(pid) || { product_name: row.product_name, balance: 0 };
      const opening = current.balance;
      const total_in = row.purchase + row.sale_return + row.production_in + row.other_in;
      const total_out = row.sale + row.purchase_return + row.production_out + row.other_out;
      const closing = opening + total_in - total_out;
      result.push({
        date: row.date,
        product_id: pid,
        item: row.product_name,
        opening,
        purchase: row.purchase,
        sale_return: row.sale_return,
        production_in: row.production_in,
        total_in,
        sale: row.sale,
        purchase_return: row.purchase_return,
        issue: row.production_out,
        total_out,
        closing
      });
      openingMap.set(pid, { product_name: row.product_name, balance: closing });
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
const purchaseItemSchema = zod.z.object({
  product_id: zod.z.coerce.number().int().positive(),
  hsn: zod.z.string().optional().nullable(),
  pcs: zod.z.coerce.number().optional().nullable(),
  quantity: zod.z.coerce.number().positive(),
  base_rate: zod.z.coerce.number().min(0),
  size_diff: zod.z.coerce.number().default(0),
  net_rate: zod.z.coerce.number().min(0),
  taxable_value: zod.z.coerce.number().min(0),
  gst_rate: zod.z.coerce.number().min(0).default(0),
  gst_amount: zod.z.coerce.number().min(0).default(0),
  amount: zod.z.coerce.number().min(0)
});
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
  getNextPurchaseVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM purchases`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `PUR-${String(count).padStart(5, "0")}`;
  }
  savePurchaseVoucher(payload) {
    const data = purchaseVoucherSchema.parse(payload);
    const db = getDatabase();
    if (!data.voucher_no) {
      data.voucher_no = this.getNextPurchaseVoucherNo();
    }
    const transaction = db.transaction(() => {
      const purchaseResult = db.prepare(
        `INSERT INTO purchases (
          voucher_no, invoice_no, supplier_id, warehouse_id, purchase_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :supplier_id, :warehouse_id, :purchase_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: data.voucher_no,
        invoice_no: data.invoice_no,
        supplier_id: data.supplier_id,
        warehouse_id: data.warehouse_id,
        purchase_date: data.purchase_date,
        batch_no: data.batch_no,
        expiry_date: data.expiry_date,
        vehicle_no: data.vehicle_no,
        bilty_no: data.bilty_no,
        broker: data.broker,
        remarks: data.remarks,
        status: data.status,
        taxable_value: data.taxable_value,
        gst_amount: data.gst_amount,
        total_amount: data.total_amount
      });
      const purchaseId2 = purchaseResult.lastInsertRowid;
      const insertItemStmt = db.prepare(
        `INSERT INTO purchase_items (
          purchase_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :purchase_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );
      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'purchase', :source_id, 'purchase',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );
      for (const item of data.items) {
        insertItemStmt.run({
          purchase_id: purchaseId2,
          product_id: item.product_id,
          hsn: item.hsn,
          pcs: item.pcs,
          quantity: item.quantity,
          base_rate: item.base_rate,
          size_diff: item.size_diff,
          net_rate: item.net_rate,
          taxable_value: item.taxable_value,
          gst_rate: item.gst_rate,
          gst_amount: item.gst_amount,
          amount: item.amount
        });
        insertStockStmt.run({
          transaction_no: data.voucher_no,
          // we use voucher_no to link them
          source_id: purchaseId2,
          product_id: item.product_id,
          warehouse_id: data.warehouse_id,
          party_id: data.supplier_id,
          quantity: item.quantity,
          rate: item.net_rate,
          amount: item.taxable_value,
          // storing taxable value as the inventory cost
          reference_no: data.invoice_no,
          notes: data.remarks
        });
      }
      return purchaseId2;
    });
    const purchaseId = transaction();
    return { id: purchaseId, voucher_no: data.voucher_no };
  }
  // --- SALES RETURN ---
  getNextSaleReturnVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM sale_returns`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `SR-${String(count).padStart(5, "0")}`;
  }
  saveSaleReturnVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextSaleReturnVoucherNo();
    const transaction = db.transaction(() => {
      const srResult = db.prepare(
        `INSERT INTO sale_returns (
          voucher_no, invoice_no, customer_id, warehouse_id, return_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :customer_id, :warehouse_id, :return_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: payload.voucher_no,
        invoice_no: payload.invoice_no,
        customer_id: payload.customer_id,
        warehouse_id: payload.warehouse_id || 1,
        return_date: payload.return_date,
        batch_no: payload.batch_no,
        expiry_date: payload.expiry_date,
        vehicle_no: payload.vehicle_no,
        bilty_no: payload.bilty_no,
        broker: payload.broker,
        remarks: payload.remarks,
        status: "posted",
        taxable_value: payload.taxable_value,
        gst_amount: payload.gst_amount,
        total_amount: payload.total_amount
      });
      const srId2 = srResult.lastInsertRowid;
      const insertItemStmt = db.prepare(
        `INSERT INTO sale_return_items (
          sale_return_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :sale_return_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );
      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'sale_return', :source_id, 'sale_return',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );
      for (const item of payload.items) {
        insertItemStmt.run({
          sale_return_id: srId2,
          product_id: item.product_id,
          hsn: item.hsn,
          pcs: item.pcs,
          quantity: item.quantity,
          base_rate: item.base_rate,
          size_diff: item.size_diff,
          net_rate: item.net_rate,
          taxable_value: item.taxable_value,
          gst_rate: item.gst_rate,
          gst_amount: item.gst_amount,
          amount: item.amount
        });
        insertStockStmt.run({
          transaction_no: payload.voucher_no,
          source_id: srId2,
          product_id: item.product_id,
          warehouse_id: payload.warehouse_id || 1,
          party_id: payload.customer_id,
          quantity: Number(item.quantity),
          rate: Number(item.net_rate),
          amount: Number(item.taxable_value),
          reference_no: payload.invoice_no,
          notes: payload.remarks
        });
      }
      return srId2;
    });
    const srId = transaction();
    return { id: srId, voucher_no: payload.voucher_no };
  }
  // --- SALES ---
  getNextSaleVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM sales`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `SALE-${String(count).padStart(5, "0")}`;
  }
  saveSaleVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextSaleVoucherNo();
    const transaction = db.transaction(() => {
      const saleResult = db.prepare(
        `INSERT INTO sales (
          voucher_no, invoice_no, customer_id, warehouse_id, sale_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :customer_id, :warehouse_id, :sale_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: payload.voucher_no,
        invoice_no: payload.invoice_no,
        customer_id: payload.customer_id,
        warehouse_id: payload.warehouse_id || 1,
        sale_date: payload.sale_date,
        batch_no: payload.batch_no,
        expiry_date: payload.expiry_date,
        vehicle_no: payload.vehicle_no,
        bilty_no: payload.bilty_no,
        broker: payload.broker,
        remarks: payload.remarks,
        status: "posted",
        taxable_value: payload.taxable_value,
        gst_amount: payload.gst_amount,
        total_amount: payload.total_amount
      });
      const saleId2 = saleResult.lastInsertRowid;
      const insertItemStmt = db.prepare(
        `INSERT INTO sale_items (
          sale_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :sale_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );
      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'sale', :source_id, 'sale',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );
      for (const item of payload.items) {
        insertItemStmt.run({
          sale_id: saleId2,
          product_id: item.product_id,
          hsn: item.hsn,
          pcs: item.pcs,
          quantity: item.quantity,
          base_rate: item.base_rate,
          size_diff: item.size_diff,
          net_rate: item.net_rate,
          taxable_value: item.taxable_value,
          gst_rate: item.gst_rate,
          gst_amount: item.gst_amount,
          amount: item.amount
        });
        insertStockStmt.run({
          transaction_no: payload.voucher_no,
          source_id: saleId2,
          product_id: item.product_id,
          warehouse_id: payload.warehouse_id || 1,
          party_id: payload.customer_id,
          quantity: -Math.abs(Number(item.quantity)),
          rate: Number(item.net_rate),
          amount: Number(item.taxable_value),
          reference_no: payload.invoice_no,
          notes: payload.remarks
        });
      }
      return saleId2;
    });
    const saleId = transaction();
    return { id: saleId, voucher_no: payload.voucher_no };
  }
  // --- PURCHASE RETURN ---
  getNextPurchaseReturnVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM purchase_returns`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `PR-${String(count).padStart(5, "0")}`;
  }
  savePurchaseReturnVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextPurchaseReturnVoucherNo();
    const transaction = db.transaction(() => {
      const prResult = db.prepare(
        `INSERT INTO purchase_returns (
          voucher_no, invoice_no, supplier_id, warehouse_id, return_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :supplier_id, :warehouse_id, :return_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: payload.voucher_no,
        invoice_no: payload.invoice_no,
        supplier_id: payload.supplier_id,
        warehouse_id: payload.warehouse_id || 1,
        return_date: payload.return_date,
        batch_no: payload.batch_no,
        expiry_date: payload.expiry_date,
        vehicle_no: payload.vehicle_no,
        bilty_no: payload.bilty_no,
        broker: payload.broker,
        remarks: payload.remarks,
        status: "posted",
        taxable_value: payload.taxable_value,
        gst_amount: payload.gst_amount,
        total_amount: payload.total_amount
      });
      const prId2 = prResult.lastInsertRowid;
      const insertItemStmt = db.prepare(
        `INSERT INTO purchase_return_items (
          purchase_return_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :purchase_return_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );
      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'purchase_return', :source_id, 'purchase_return',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );
      for (const item of payload.items) {
        insertItemStmt.run({
          purchase_return_id: prId2,
          product_id: item.product_id,
          hsn: item.hsn,
          pcs: item.pcs,
          quantity: item.quantity,
          base_rate: item.base_rate,
          size_diff: item.size_diff,
          net_rate: item.net_rate,
          taxable_value: item.taxable_value,
          gst_rate: item.gst_rate,
          gst_amount: item.gst_amount,
          amount: item.amount
        });
        insertStockStmt.run({
          transaction_no: payload.voucher_no,
          source_id: prId2,
          product_id: item.product_id,
          warehouse_id: payload.warehouse_id || 1,
          party_id: payload.supplier_id,
          quantity: -Math.abs(Number(item.quantity)),
          rate: Number(item.net_rate),
          amount: Number(item.taxable_value),
          reference_no: payload.invoice_no,
          notes: payload.remarks
        });
      }
      return prId2;
    });
    const prId = transaction();
    return { id: prId, voucher_no: payload.voucher_no };
  }
  // --- PRODUCTION ---
  getNextProductionVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM production`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `PROD-${String(count).padStart(5, "0")}`;
  }
  saveProductionVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextProductionVoucherNo();
    const transaction = db.transaction(() => {
      const prodResult = db.prepare(
        `INSERT INTO production (
          voucher_no, warehouse_id, production_date, is_recurring, status, remarks
        ) VALUES (
          :voucher_no, :warehouse_id, :production_date, :is_recurring, :status, :remarks
        )`
      ).run({
        voucher_no: payload.voucher_no,
        warehouse_id: payload.warehouse_id || 1,
        production_date: payload.production_date,
        is_recurring: payload.is_recurring ? 1 : 0,
        status: "posted",
        remarks: payload.remarks
      });
      const prodId2 = prodResult.lastInsertRowid;
      const insertItemStmt = db.prepare(
        `INSERT INTO production_items (
          production_id, product_id, batch_no, issued_qty, issued_pcs,
          production_qty, production_pcs
        ) VALUES (
          :production_id, :product_id, :batch_no, :issued_qty, :issued_pcs,
          :production_qty, :production_pcs
        )`
      );
      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, quantity, rate, amount, notes
        ) VALUES (
          :transaction_no, 'production', :source_id, :transaction_type,
          :product_id, :warehouse_id, :quantity, 0, 0, :notes
        )`
      );
      for (const item of payload.items) {
        insertItemStmt.run({
          production_id: prodId2,
          product_id: item.product_id,
          batch_no: item.batch_no,
          issued_qty: item.issued_qty,
          issued_pcs: item.issued_pcs,
          production_qty: item.production_qty,
          production_pcs: item.production_pcs
        });
        if (Number(item.issued_qty) > 0) {
          insertStockStmt.run({
            transaction_no: payload.voucher_no,
            source_id: prodId2,
            transaction_type: "production_out",
            product_id: item.product_id,
            warehouse_id: payload.warehouse_id || 1,
            quantity: -Math.abs(Number(item.issued_qty)),
            notes: payload.remarks
          });
        }
        if (Number(item.production_qty) > 0) {
          insertStockStmt.run({
            transaction_no: payload.voucher_no,
            source_id: prodId2,
            transaction_type: "production_in",
            product_id: item.product_id,
            warehouse_id: payload.warehouse_id || 1,
            quantity: Math.abs(Number(item.production_qty)),
            notes: payload.remarks
          });
        }
      }
      return prodId2;
    });
    const prodId = transaction();
    return { id: prodId, voucher_no: payload.voucher_no };
  }
  getProductionSettings() {
    const db = getDatabase();
    const row = db.prepare(`SELECT production_settings_json FROM settings WHERE id = 1`).get();
    try {
      return JSON.parse(row?.production_settings_json || "{}");
    } catch {
      return {};
    }
  }
  updateProductionSettings(settingsJson) {
    const db = getDatabase();
    db.prepare(`UPDATE settings SET production_settings_json = ? WHERE id = 1`).run(JSON.stringify(settingsJson));
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
