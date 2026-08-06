import { ipcMain, dialog, BrowserWindow } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipcChannels.js';
import { AuthService } from '../services/authService.js';
import { ImportService } from '../services/importService.js';
import { categoryService, hsnService, partyService, productService, unitService, warehouseService } from '../services/lookupServices.js';
import { productionFormulaService } from '../services/productionFormulaService.js';
import { InventoryService } from '../services/inventoryService.js';
import { ReportService } from '../reports/reportService.js';
import { BackupService } from '../backup/backupService.js';
import { AuditService } from '../services/auditService.js';
import { VoucherService } from '../services/voucherService.js';

const authService = new AuthService();
const importService = new ImportService();
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
  product: productService,
  formula: productionFormulaService
};

export function registerIpcHandlers() {
  ipcMain.handle(IPC_CHANNELS.APP_INFO, () => ({ name: 'StockOps', version: '1.0.0' }));
  ipcMain.handle(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS, async () => ({ needsBootstrap: await authService.needsBootstrap() }));

  ipcMain.handle(IPC_CHANNELS.AUTH_LOGIN, async (_event, payload) => authService.login(payload));
  ipcMain.handle(IPC_CHANNELS.AUTH_CREATE_USER, async (_event, payload) => authService.createUser(payload));
  ipcMain.handle(IPC_CHANNELS.AUTH_RESET_PASSWORD, async (_event, payload) => authService.resetPassword(payload));

  ipcMain.handle(IPC_CHANNELS.MASTER_LIST, async (_event, { entity, filters }) => {
    return servicesByEntity[entity].list(filters);
  });

  ipcMain.handle(IPC_CHANNELS.MASTER_GET, async (_event, { entity, id }) => {
    return servicesByEntity[entity].get(id);
  });

  ipcMain.handle(IPC_CHANNELS.MASTER_CREATE, async (_event, { entity, payload }) => {
    return servicesByEntity[entity].create(payload);
  });

  ipcMain.handle(IPC_CHANNELS.MASTER_UPDATE, async (_event, { entity, id, payload }) => {
    return servicesByEntity[entity].update(id, payload);
  });

  ipcMain.handle(IPC_CHANNELS.MASTER_DELETE, async (_event, { entity, id }) => {
    return servicesByEntity[entity].remove(id);
  });

  ipcMain.handle(IPC_CHANNELS.STOCK_RECORD, async (_event, payload) => inventoryService.recordStockTransaction(payload));
  ipcMain.handle(IPC_CHANNELS.STOCK_BALANCE, async (_event, { productId, warehouseId }) => inventoryService.getStockBalance(productId, warehouseId));
  ipcMain.handle(IPC_CHANNELS.DASHBOARD_SUMMARY, async () => inventoryService.getDashboardSummary());
  ipcMain.handle(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, async (_event, { limit = 10, type = null } = {}) => inventoryService.getRecentVouchers(limit, type));
  ipcMain.handle(IPC_CHANNELS.STOCK_ITEM_LEDGER, async (_event, productId) => inventoryService.getItemLedger(productId));
  ipcMain.handle(IPC_CHANNELS.REPORT_DAILY_SUMMARY, async (_event, filters) => inventoryService.getDailyStockSummary(filters));

  ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_SAVE, async (_event, payload) => voucherService.savePurchaseVoucher(payload));
  ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_GET_NEXT_NO, async () => voucherService.getNextPurchaseVoucherNo());
  
  ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_RETURN_SAVE, async (_event, payload) => voucherService.saveSaleReturnVoucher(payload));
  ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_RETURN_GET_NEXT_NO, async () => voucherService.getNextSaleReturnVoucherNo());

  ipcMain.handle(IPC_CHANNELS.VOUCHER_PRODUCTION_SAVE, async (_event, payload) => voucherService.saveProductionVoucher(payload));
  ipcMain.handle(IPC_CHANNELS.VOUCHER_PRODUCTION_GET_NEXT_NO, async () => voucherService.getNextProductionVoucherNo());

  ipcMain.handle(IPC_CHANNELS.PRODUCTION_SETTINGS_GET, async () => voucherService.getProductionSettings());
  ipcMain.handle(IPC_CHANNELS.PRODUCTION_SETTINGS_UPDATE, async (_event, payload) => voucherService.updateProductionSettings(payload));

  ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_SAVE, async (_event, payload) => voucherService.saveSaleVoucher(payload));
  ipcMain.handle(IPC_CHANNELS.VOUCHER_SALE_GET_NEXT_NO, async () => voucherService.getNextSaleVoucherNo());

  ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_RETURN_SAVE, async (_event, payload) => voucherService.savePurchaseReturnVoucher(payload));
  ipcMain.handle(IPC_CHANNELS.VOUCHER_PURCHASE_RETURN_GET_NEXT_NO, async () => voucherService.getNextPurchaseReturnVoucherNo());

  ipcMain.handle(IPC_CHANNELS.VOUCHER_LIST_RECENT, async (_event, { type, limit = 20 } = {}) => voucherService.listVouchers(type, limit));
  ipcMain.handle(IPC_CHANNELS.VOUCHER_GET_DETAIL, async (_event, { type, id } = {}) => voucherService.getVoucher(type, id));

  ipcMain.handle(IPC_CHANNELS.IMPORT_EXCEL, async () => {
    const win = BrowserWindow.getFocusedWindow();
    const picked = await dialog.showOpenDialog(win ?? undefined, {
      title: 'Select the data import Excel file',
      properties: ['openFile'],
      filters: [{ name: 'Excel Workbook', extensions: ['xlsx'] }]
    });

    if (picked.canceled || !picked.filePaths?.length) {
      return { canceled: true };
    }

    const summary = await importService.importWorkbook(picked.filePaths[0]);
    return { canceled: false, summary };
  });

  ipcMain.handle(IPC_CHANNELS.PARTY_GET_NEXT_CODE, async () => partyService.getNextCode());

  ipcMain.handle(IPC_CHANNELS.REPORT_EXPORT, async (_event, { format, rows, title }) => {
    if (format === 'csv') {
      return reportService.exportCsv(rows);
    }

    if (format === 'excel') {
      return reportService.exportExcel(rows, title);
    }

    if (format === 'pdf') {
      return reportService.exportPdf(rows, title);
    }

    throw new Error('Unsupported report format');
  });

  ipcMain.handle(IPC_CHANNELS.BACKUP_CREATE, async () => backupService.createBackup());
  ipcMain.handle(IPC_CHANNELS.BACKUP_RESTORE, async (_event, backupPath) => backupService.restoreBackup(backupPath));
  ipcMain.handle(IPC_CHANNELS.AUDIT_RECENT, async (_event, limit) => auditService.recent(limit));
}