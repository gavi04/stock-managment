import fs from 'node:fs';

function writeLog(level, message, meta = {}) {
  const entry = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString()
  };

  console[level === 'error' ? 'error' : 'log'](JSON.stringify(entry));
}

export const logger = {
  info(message, meta) {
    writeLog('info', message, meta);
  },
  warn(message, meta) {
    writeLog('warn', message, meta);
  },
  error(message, meta) {
    writeLog('error', message, meta);
  }
};

export function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}