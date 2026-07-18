import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { initializeDatabase, closeDatabase } from './db/database.js';
import { ensureDirectory, logger } from './utils/logger.js';
import { registerIpcHandlers } from './ipc/handlers.js';

const isDev = !app.isPackaged;

function configureSessionPaths() {
  const userDataPath = app.getPath('userData');
  ensureDirectory(userDataPath);

  // Keep Chromium cache/session files in a dedicated writable location.
  const sessionDataPath = path.join(userDataPath, 'session-data');
  const cachePath = path.join(sessionDataPath, 'Cache');
  ensureDirectory(sessionDataPath);
  ensureDirectory(cachePath);

  app.setPath('sessionData', sessionDataPath);
  app.commandLine.appendSwitch('disk-cache-dir', cachePath);
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1200,
    minHeight: 780,
    backgroundColor: '#0b1220',
    title: 'StockOps',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(app.getAppPath(), 'out/preload/index.js')
    }
  });

  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'out/renderer/index.html'));
  }

  return mainWindow;
}

configureSessionPaths();

app.whenReady().then(() => {
  initializeDatabase();
  registerIpcHandlers();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeDatabase();
    app.quit();
  }
});

process.on('uncaughtException', (error) => {
  logger.error('uncaught exception', { message: error.message, stack: error.stack });
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandled rejection', { reason });
});