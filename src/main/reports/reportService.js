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

  // Formatted Daily Stock Summary workbook: title + period, grouped columns,
  // 3-decimal numbers. `rows` are the per-item summary rows.
  async exportDailySummaryExcel(rows = [], meta = {}) {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Daily Stock Summary');

    const headers = [
      'Item Code', 'Item Name', 'Opening',
      'Purchase', 'Sale Return', 'Production', 'Total In',
      'Sale', 'Purch. Return', 'Issue', 'Total Out',
      'Closing'
    ];

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

    const n = (v) => Number(v || 0);
    for (const r of rows) {
      const row = ws.addRow([
        r.code || '',
        r.item || '',
        n(r.opening),
        n(r.purchase),
        n(r.sale_return),
        n(r.production_in),
        n(r.total_in),
        n(r.sale),
        n(r.purchase_return),
        n(r.issue),
        n(r.total_out),
        n(r.closing)
      ]);
      for (let c = 3; c <= headers.length; c += 1) {
        row.getCell(c).numFmt = '0.000';
        row.getCell(c).alignment = { horizontal: 'right' };
      }
    }

    ws.getColumn(1).width = 16;
    ws.getColumn(2).width = 26;
    for (let c = 3; c <= headers.length; c += 1) ws.getColumn(c).width = 13;

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