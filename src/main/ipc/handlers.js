import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipcChannels.js';
import { AuthService } from '../services/authService.js';
import { categoryService, partyService, productService, unitService, warehouseService } from '../services/lookupServices.js';
import { InventoryService } from '../services/inventoryService.js';
import { ReportService } from '../reports/reportService.js';
import { BackupService } from '../backup/backupService.js';
import { AuditService } from '../services/auditService.js';

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

export function registerIpcHandlers() {
  ipcMain.handle(IPC_CHANNELS.APP_INFO, () => ({ name: 'StockOps', version: '1.0.0' }));
  ipcMain.handle(IPC_CHANNELS.AUTH_BOOTSTRAP_STATUS, async () => ({ needsBootstrap: authService.needsBootstrap() }));

  ipcMain.handle(IPC_CHANNELS.AUTH_LOGIN, async (_event, payload) => authService.login(payload));
  ipcMain.handle(IPC_CHANNELS.AUTH_CREATE_USER, async (_event, payload) => authService.createUser(payload));

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
  ipcMain.handle(IPC_CHANNELS.STOCK_RECENT_VOUCHERS, async (_event, { limit = 10 } = {}) => inventoryService.getRecentVouchers(limit));

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