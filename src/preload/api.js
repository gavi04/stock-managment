import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/ipcChannels.js';

const api = {
  getAppInfo: () => ipcRenderer.invoke(IPC_CHANNELS.APP_INFO),
  getBootstrapStatus: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS),
  login: (payload) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN, payload),
  createUser: (payload) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_CREATE_USER, payload),
  listMaster: (entity, filters) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_LIST, { entity, filters }),
  getMaster: (entity, id) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_GET, { entity, id }),
  createMaster: (entity, payload) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_CREATE, { entity, payload }),
  updateMaster: (entity, id, payload) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_UPDATE, { entity, id, payload }),
  deleteMaster: (entity, id) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_DELETE, { entity, id }),
  recordStockTransaction: (payload) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_RECORD, payload),
  getStockBalance: (productId, warehouseId) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_BALANCE, { productId, warehouseId }),
  getDashboardSummary: () => ipcRenderer.invoke(IPC_CHANNELS.DASHBOARD_SUMMARY),
  getRecentVouchers: (limit = 10) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, { limit }),
  exportReport: (payload) => ipcRenderer.invoke(IPC_CHANNELS.REPORT_EXPORT, payload),
  createBackup: () => ipcRenderer.invoke(IPC_CHANNELS.BACKUP_CREATE),
  restoreBackup: (backupPath) => ipcRenderer.invoke(IPC_CHANNELS.BACKUP_RESTORE, backupPath),
  getAuditLogs: (limit) => ipcRenderer.invoke(IPC_CHANNELS.AUDIT_RECENT, limit)
};

contextBridge.exposeInMainWorld('stockOps', api);