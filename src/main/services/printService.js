import fs from 'node:fs';
import path from 'node:path';
import { app, BrowserWindow } from 'electron';
import { getPrismaClient } from '../db/database.js';
import { VoucherService } from './voucherService.js';
// Layouts live as plain HTML files; `?raw` inlines their text at build time so
// they stay editable on their own with no JS around them.
import tradeTemplate from '../print/voucher-template.html?raw';
import productionTemplate from '../print/production-template.html?raw';

const voucherService = new VoucherService();

const TITLES = {
  purchase: 'Purchase Voucher',
  sale: 'Sales Voucher',
  sale_return: 'Sales Return Voucher',
  purchase_return: 'Purchase Return Voucher',
  production: 'Production Voucher'
};

const PARTY_LABELS = {
  purchase: 'Supplier',
  sale: 'Party Name',
  sale_return: 'Party Name',
  purchase_return: 'Supplier'
};

const MIN_ROWS = 0; // receipt paper is dynamic length — no empty padding rows

// Receipt printer paper: fixed 5.5" width, length grows with content.
const RECEIPT_WIDTH_IN = 5.5;
const PX_PER_IN = 96;
const MICRON_PER_IN = 25400;

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const n2 = (v) => Number(v || 0).toFixed(2);
const n3 = (v) => Number(v || 0).toFixed(3);
const itemQty = (it) => (Number(it.quantity) > 0 ? n3(it.quantity) : Number(it.pcs) > 0 ? n3(it.pcs) : '-');

// Replace {{KEY}} tokens from a value map; unknown tokens become ''.
function fill(str, values) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => (values[key] != null ? String(values[key]) : ''));
}

// Expand the row block (wrapped by <!--ROW-->…<!--/ROW-->) once per row, pad to
// minRows, then fill page-level tokens. We pick the marker pair whose content is an
// actual <tr> so stray mentions of the markers (e.g. in a doc comment) are ignored.
function renderTemplate(template, pageValues, rowValues, minRows = 0) {
  const re = /<!--ROW-->([\s\S]*?)<!--\/ROW-->/g;
  let chosen = null;
  let match;
  while ((match = re.exec(template)) !== null) {
    if (match[1].includes('<tr')) {
      chosen = match;
      break;
    }
  }

  if (!chosen) return fill(template, pageValues);

  const rowTpl = chosen[1];
  let rows = rowValues.map((v) => fill(rowTpl, v)).join('');
  for (let i = rowValues.length; i < minRows; i += 1) {
    rows += fill(rowTpl, {}); // blank filler row
  }

  const withRows = template.slice(0, chosen.index) + rows + template.slice(chosen.index + chosen[0].length);
  return fill(withRows, pageValues);
}

function buildTradeHtml(voucher, companyName) {
  const grand = voucher.items.reduce((sum, it) => sum + Number(it.taxable_value || 0), 0);

  const pageValues = {
    COMPANY_NAME: esc(companyName),
    TITLE: esc(TITLES[voucher.type] || 'Voucher'),
    DATE: esc(voucher.date),
    SERIAL_NO: esc(voucher.voucher_no),
    PARTY_LABEL: esc((PARTY_LABELS[voucher.type] || 'Party Name').toUpperCase()),
    PARTY_NAME: esc(voucher.party),
    TERMS: '—'.repeat(10),
    GRAND_TOTAL: n2(grand)
  };

  const rowValues = voucher.items.map((it, i) => ({
    SNO: i + 1,
    ITEM_CODE: esc(it.product_code || it.product_name || '-'),
    QTY: itemQty(it),
    RATE: n2(it.base_rate),
    DIFF: n2(it.size_diff),
    TOTAL: n2(it.taxable_value)
  }));

  return renderTemplate(tradeTemplate, pageValues, rowValues, MIN_ROWS);
}

function buildProductionHtml(voucher, companyName) {
  const pageValues = {
    COMPANY_NAME: esc(companyName),
    TITLE: esc(TITLES.production),
    DATE: esc(voucher.date),
    SERIAL_NO: esc(voucher.voucher_no),
    REMARKS: esc(voucher.remarks || '')
  };

  const rowValues = voucher.items.map((it, i) => ({
    SNO: i + 1,
    ITEM_CODE: esc(it.product_code || it.product_name || '-'),
    BATCH: esc(it.batch_no || '-'),
    ISSUED_QTY: n3(it.issued_qty),
    ISSUED_PCS: n3(it.issued_pcs),
    PROD_QTY: n3(it.production_qty),
    PROD_PCS: n3(it.production_pcs)
  }));

  return renderTemplate(productionTemplate, pageValues, rowValues, MIN_ROWS);
}

function buildHtml(voucher, companyName) {
  return voucher.type === 'production'
    ? buildProductionHtml(voucher, companyName)
    : buildTradeHtml(voucher, companyName);
}

export class PrintService {
  async getCompanyName() {
    try {
      const setting = await getPrismaClient().setting.findUnique({ where: { id: 1 } });
      return setting?.companyName || 'StockOps';
    } catch {
      return 'StockOps';
    }
  }

  async printVoucher(type, id) {
    const voucher = await voucherService.getVoucher(type, id);
    const companyName = await this.getCompanyName();
    const html = buildHtml(voucher, companyName);

    // Load from a real file (not a data: URL) — data URLs can yield an
    // "empty content/page size" print job on Windows. A sized window plus a
    // short settle delay ensures the page is laid out before the job runs.
    const tmpFile = path.join(app.getPath('temp'), `stockops-voucher-${Date.now()}.html`);
    await fs.promises.writeFile(tmpFile, html, 'utf8');

    const widthPx = Math.round(RECEIPT_WIDTH_IN * PX_PER_IN);
    const win = new BrowserWindow({
      show: false,
      width: widthPx,
      height: 1200,
      webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false }
    });

    const cleanup = () => {
      if (!win.isDestroyed()) win.close();
      fs.promises.unlink(tmpFile).catch(() => {});
    };

    try {
      await win.loadFile(tmpFile);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Measure the rendered content height so the "page" is exactly as long as
      // the receipt content — fixed 5.5" width, dynamic length.
      let contentHeightPx = 800;
      try {
        contentHeightPx = await win.webContents.executeJavaScript(
          'Math.ceil(document.body.getBoundingClientRect().height)'
        );
      } catch {
        /* fall back to default height */
      }

      const widthMicron = Math.round(RECEIPT_WIDTH_IN * MICRON_PER_IN);
      const heightMicron = Math.max(Math.round(((contentHeightPx + 24) / PX_PER_IN) * MICRON_PER_IN), MICRON_PER_IN);

      const result = await new Promise((resolve) => {
        win.webContents.print(
          {
            silent: false,
            printBackground: true,
            margins: { marginType: 'none' },
            pageSize: { width: widthMicron, height: heightMicron }
          },
          (success, failureReason) => resolve({ success, failureReason })
        );
      });
      return result;
    } finally {
      cleanup();
    }
  }
}
