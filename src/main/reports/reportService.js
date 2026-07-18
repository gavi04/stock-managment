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