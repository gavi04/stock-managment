import electronUpdater from 'electron-updater';
import { app, dialog, BrowserWindow } from 'electron';
import { logger } from './utils/logger.js';

const { autoUpdater } = electronUpdater;

// True while a check was triggered by the user (so we can tell them "you're up to
// date" / show errors); automatic startup checks stay silent when nothing's new.
let manualCheck = false;
let initialised = false;

function activeWindow() {
  return BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0] ?? null;
}

export function initAutoUpdater() {
  if (initialised) return;
  initialised = true;

  // Notify-only: never download or install without the user asking.
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.logger = logger;

  autoUpdater.on('update-available', async (info) => {
    const { response } = await dialog.showMessageBox(activeWindow(), {
      type: 'info',
      title: 'Update available',
      message: `A new version of StockOps (${info.version}) is available.`,
      detail: 'Would you like to download it now? Your data will not be affected.',
      buttons: ['Download', 'Later'],
      defaultId: 0,
      cancelId: 1,
      noLink: true
    });
    manualCheck = false;
    if (response === 0) {
      autoUpdater.downloadUpdate().catch((err) => reportError(err));
    }
  });

  autoUpdater.on('update-not-available', () => {
    if (manualCheck) {
      dialog.showMessageBox(activeWindow(), {
        type: 'info',
        title: 'No updates',
        message: `StockOps ${app.getVersion()} is the latest version.`,
        buttons: ['OK'],
        noLink: true
      });
    }
    manualCheck = false;
  });

  autoUpdater.on('update-downloaded', async (info) => {
    const { response } = await dialog.showMessageBox(activeWindow(), {
      type: 'info',
      title: 'Update ready',
      message: `Version ${info.version} has been downloaded.`,
      detail: 'Restart StockOps now to install it? You can also keep working and it will install next time you close the app.',
      buttons: ['Restart now', 'Later'],
      defaultId: 0,
      cancelId: 1,
      noLink: true
    });
    if (response === 0) {
      // Defer so the dialog closes cleanly before quitting.
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  });

  autoUpdater.on('error', (err) => reportError(err));
}

function reportError(err) {
  logger.error('auto-update error', { message: err?.message });
  if (manualCheck) {
    dialog.showMessageBox(activeWindow(), {
      type: 'error',
      title: 'Update check failed',
      message: 'Could not check for updates.',
      detail: err?.message || String(err),
      buttons: ['OK'],
      noLink: true
    });
  }
  manualCheck = false;
}

// Kick off a check. `manual: true` when the user asked (surfaces "up to date"
// and errors); automatic startup checks pass false and stay quiet unless there's
// an update to offer.
export function checkForUpdates({ manual = false } = {}) {
  if (!app.isPackaged) {
    if (manual) {
      dialog.showMessageBox(activeWindow(), {
        type: 'info',
        title: 'Updates',
        message: 'Update checks only run in the installed app, not in development.',
        buttons: ['OK'],
        noLink: true
      });
    }
    return;
  }
  initAutoUpdater();
  manualCheck = manual;
  autoUpdater.checkForUpdates().catch((err) => reportError(err));
}
