import ExcelJS from 'exceljs';
import { stringify } from 'csv-stringify/sync';
import PDFDocument from 'pdfkit';

export class ReportService {
  exportCsv(rows) {
    return stringify(rows, { header: true });
  }

  async exportExcel(rows, sheetName = 'Report') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    if (rows.length > 0) {
      worksheet.columns = Object.keys(rows[0]).map((key) => ({ header: key, key }));
      worksheet.addRows(rows);
    }
    return workbook.xlsx.writeBuffer();
  }

  // Formatted Daily Stock Summary workbook: title + period, Item Name/Size/Length
  // columns, grouped by size with a subtotal row per size, 3-decimal numbers.
  async exportDailySummaryExcel(rows = [], meta = {}) {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Daily Stock Summary');

    const headers = [
      'Item Name', 'Size', 'Length', 'Opening',
      'Purchase', 'Sale Return', 'Production', 'Total In',
      'Sale', 'Purch. Return', 'Issue', 'Total Out',
      'Closing', 'Size Total'
    ];
    const NUM_START = 4; // first numeric column (Opening)
    const TOTAL_COL = headers.length; // rightmost "Size Total" column
    const fields = ['opening', 'purchase', 'sale_return', 'production_in', 'total_in', 'sale', 'purchase_return', 'issue', 'total_out', 'closing'];
    const n = (v) => Number(v || 0);

    const titleRow = ws.addRow(['Daily Stock Summary']);
    titleRow.font = { bold: true, size: 14 };
    ws.mergeCells(titleRow.number, 1, titleRow.number, headers.length);

    const periodRow = ws.addRow([`Period: ${meta.fromDate || ''} to ${meta.toDate || ''}`]);
    periodRow.font = { italic: true, size: 10 };
    ws.mergeCells(periodRow.number, 1, periodRow.number, headers.length);

    ws.addRow([]); // spacer

    const headerRow = ws.addRow(headers);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1EFE9' } };
      cell.border = { bottom: { style: 'thin', color: { argb: 'FF999999' } } };
      cell.alignment = { horizontal: 'center' };
    });

    const applyNumFmt = (row) => {
      for (let c = NUM_START; c <= headers.length; c += 1) {
        row.getCell(c).numFmt = '0.000';
        row.getCell(c).alignment = { horizontal: 'right' };
      }
    };

    // Group consecutive same-size rows; the per-size total (sum of Closing) is a
    // single merged cell in the rightmost "Size Total" column.
    let i = 0;
    while (i < rows.length) {
      const size = rows[i].size || '';
      let end = i;
      let closingTotal = 0;
      while (end < rows.length && (rows[end].size || '') === size) {
        closingTotal += n(rows[end].closing);
        end += 1;
      }

      const startRowNum = ws.rowCount + 1;
      for (let k = i; k < end; k += 1) {
        const r = rows[k];
        const row = ws.addRow([r.item || '', r.size || '', r.length || '', ...fields.map((f) => n(r[f])), null]);
        applyNumFmt(row);
      }
      const endRowNum = ws.rowCount;

      if (end - i > 1) ws.mergeCells(startRowNum, TOTAL_COL, endRowNum, TOTAL_COL);
      const totalCell = ws.getCell(startRowNum, TOTAL_COL);
      totalCell.value = closingTotal;
      totalCell.numFmt = '0.000';
      totalCell.font = { bold: true };
      totalCell.alignment = { horizontal: 'right', vertical: 'middle' };
      totalCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1EFE7' } };

      i = end;
    }

    ws.getColumn(1).width = 24;
    ws.getColumn(2).width = 14;
    ws.getColumn(3).width = 12;
    for (let c = NUM_START; c <= headers.length; c += 1) ws.getColumn(c).width = 12;

    return workbook.xlsx.writeBuffer();
  }

  exportPdf(rows, title = 'Report') {
    return new Promise((resolve) => {
      const chunks = [];
      const doc = new PDFDocument({ margin: 32 });
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.fontSize(18).text(title);
      doc.moveDown();
      rows.forEach((row) => {
        doc.fontSize(10).text(JSON.stringify(row));
      });
      doc.end();
    });
  }
}