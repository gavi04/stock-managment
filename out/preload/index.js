"use strict";
const electron = require("electron");
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
const api = {
  getAppInfo: () => electron.ipcRenderer.invoke(IPC_CHANNELS.APP_INFO),
  getBootstrapStatus: () => electron.ipcRenderer.invoke(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS),
  login: (payload) => electron.ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN, payload),
  createUser: (payload) => electron.ipcRenderer.invoke(IPC_CHANNELS.AUTH_CREATE_USER, payload),
  listMaster: (entity, filters) => electron.ipcRenderer.invoke(IPC_CHANNELS.MASTER_LIST, { entity, filters }),
  getMaster: (entity, id) => electron.ipcRenderer.invoke(IPC_CHANNELS.MASTER_GET, { entity, id }),
  createMaster: (entity, payload) => electron.ipcRenderer.invoke(IPC_CHANNELS.MASTER_CREATE, { entity, payload }),
  updateMaster: (entity, id, payload) => electron.ipcRenderer.invoke(IPC_CHANNELS.MASTER_UPDATE, { entity, id, payload }),
  deleteMaster: (entity, id) => electron.ipcRenderer.invoke(IPC_CHANNELS.MASTER_DELETE, { entity, id }),
  recordStockTransaction: (payload) => electron.ipcRenderer.invoke(IPC_CHANNELS.STOCK_RECORD, payload),
  getStockBalance: (productId, warehouseId) => electron.ipcRenderer.invoke(IPC_CHANNELS.STOCK_BALANCE, { productId, warehouseId }),
  getDashboardSummary: () => electron.ipcRenderer.invoke(IPC_CHANNELS.DASHBOARD_SUMMARY),
  getRecentVouchers: (limit = 10) => electron.ipcRenderer.invoke(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, { limit }),
  exportReport: (payload) => electron.ipcRenderer.invoke(IPC_CHANNELS.REPORT_EXPORT, payload),
  createBackup: () => electron.ipcRenderer.invoke(IPC_CHANNELS.BACKUP_CREATE),
  restoreBackup: (backupPath) => electron.ipcRenderer.invoke(IPC_CHANNELS.BACKUP_RESTORE, backupPath),
  getAuditLogs: (limit) => electron.ipcRenderer.invoke(IPC_CHANNELS.AUDIT_RECENT, limit)
};
electron.contextBridge.exposeInMainWorld("stockOps", api);
