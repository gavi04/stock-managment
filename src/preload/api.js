import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/ipcChannels.js';

const api = {
  getAppInfo: () => ipcRenderer.invoke(IPC_CHANNELS.APP_INFO),
  getBootstrapStatus: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS),
  login: (payload) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN, payload),
  createUser: (payload) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_CREATE_USER, payload),
  resetPassword: (payload) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_RESET_PASSWORD, payload),
  listMaster: (entity, filters) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_LIST, { entity, filters }),
  getMaster: (entity, id) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_GET, { entity, id }),
  createMaster: (entity, payload) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_CREATE, { entity, payload }),
  updateMaster: (entity, id, payload) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_UPDATE, { entity, id, payload }),
  deleteMaster: (entity, id) => ipcRenderer.invoke(IPC_CHANNELS.MASTER_DELETE, { entity, id }),
  recordStockTransaction: (payload) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_RECORD, payload),
  getStockBalance: (productId, warehouseId) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_BALANCE, { productId, warehouseId }),
  getDashboardSummary: () => ipcRenderer.invoke(IPC_CHANNELS.DASHBOARD_SUMMARY),
  getRecentVouchers: (limit = 10, type = null) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, { limit, type }),
  getItemLedger: (productId) => ipcRenderer.invoke(IPC_CHANNELS.STOCK_ITEM_LEDGER, productId),
  getDailyStockSummary: (filters) => ipcRenderer.invoke(IPC_CHANNELS.REPORT_DAILY_SUMMARY, filters),
  exportReport: (payload) => ipcRenderer.invoke(IPC_CHANNELS.REPORT_EXPORT, payload),
  createBackup: () => ipcRenderer.invoke(IPC_CHANNELS.BACKUP_CREATE),
  restoreBackup: (backupPath) => ipcRenderer.invoke(IPC_CHANNELS.BACKUP_RESTORE, backupPath),
  getAuditLogs: (limit) => ipcRenderer.invoke(IPC_CHANNELS.AUDIT_RECENT, limit),
  savePurchaseVoucher: (payload) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_PURCHASE_SAVE, payload),
  getNextPurchaseVoucherNo: () => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_PURCHASE_GET_NEXT_NO),
  saveSaleReturnVoucher: (payload) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_SALE_RETURN_SAVE, payload),
  getNextSaleReturnVoucherNo: () => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_SALE_RETURN_GET_NEXT_NO),
  saveProductionVoucher: (payload) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_PRODUCTION_SAVE, payload),
  getNextProductionVoucherNo: () => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_PRODUCTION_GET_NEXT_NO),
  getProductionSettings: () => ipcRenderer.invoke(IPC_CHANNELS.PRODUCTION_SETTINGS_GET),
  updateProductionSettings: (payload) => ipcRenderer.invoke(IPC_CHANNELS.PRODUCTION_SETTINGS_UPDATE, payload),
  saveSaleVoucher: (payload) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_SALE_SAVE, payload),
  getNextSaleVoucherNo: () => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_SALE_GET_NEXT_NO),
  savePurchaseReturnVoucher: (payload) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_PURCHASE_RETURN_SAVE, payload),
  getNextPurchaseReturnVoucherNo: () => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_PURCHASE_RETURN_GET_NEXT_NO),
  getNextPartyCode: () => ipcRenderer.invoke(IPC_CHANNELS.PARTY_GET_NEXT_CODE),
  listVouchers: (type, limit = 20) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_LIST_RECENT, { type, limit }),
  getVoucher: (type, id) => ipcRenderer.invoke(IPC_CHANNELS.VOUCHER_GET_DETAIL, { type, id }),
  importExcel: () => ipcRenderer.invoke(IPC_CHANNELS.IMPORT_EXCEL),
  checkForUpdates: () => ipcRenderer.invoke(IPC_CHANNELS.UPDATE_CHECK)
};

contextBridge.exposeInMainWorld('stockOps', api);