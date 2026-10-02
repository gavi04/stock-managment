import { useState, useEffect } from 'react';
import { formatDdmmyyyy } from '../utils/dateFormat.js';

// Local calendar date as yyyy-mm-dd (date inputs expect this format). Using local
// time — not UTC — so "today" matches the user's wall clock near midnight.
function todayStr() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function daysAgoStr(n) {
  const d = new Date(Date.now() - n * 24 * 60 * 60 * 1000);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const fmt = (value) => Number(value || 0).toFixed(3);
const cell = (value) => (Number(value) > 0 ? fmt(value) : '-');

// Two-row grouped header (Stock In / Stock Out). `leadCols` is the list of
// leftmost column labels (Item Name/Size/Length on the summary, Date in the
// drill-down).
function GroupedHead({ leadCols, trailCol }) {
  return (
    <thead>
      <tr>
        {leadCols.map((label) => (
          <th key={label} rowSpan={2}>{label}</th>
        ))}
        <th rowSpan={2} className="num">Opening</th>
        <th colSpan={4} className="grp grp-in">Stock In</th>
        <th colSpan={4} className="grp grp-out">Stock Out</th>
        <th rowSpan={2} className="num">Closing</th>
        {trailCol ? <th rowSpan={2} className="num">{trailCol}</th> : null}
      </tr>
      <tr>
        <th className="num sub-in">Purchase</th>
        <th className="num sub-in">Sale Return</th>
        <th className="num sub-in">Production</th>
        <th className="num sub-in total">Total In</th>
        <th className="num sub-out">Sale</th>
        <th className="num sub-out">Purch. Return</th>
        <th className="num sub-out">Issue</th>
        <th className="num sub-out total">Total Out</th>
      </tr>
    </thead>
  );
}

// The 8 in/out cells; `show` turns zeros into '-' (data rows) or keeps them (totals).
function MovementCells(row, show = cell) {
  return (
    <>
      <td className="num sub-in">{show(row.purchase)}</td>
      <td className="num sub-in">{show(row.sale_return)}</td>
      <td className="num sub-in">{show(row.production_in)}</td>
      <td className="num sub-in total in-total">{show(row.total_in)}</td>
      <td className="num sub-out">{show(row.sale)}</td>
      <td className="num sub-out">{show(row.purchase_return)}</td>
      <td className="num sub-out">{show(row.issue)}</td>
      <td className="num sub-out total out-total">{show(row.total_out)}</td>
    </>
  );
}

// Build summary rows grouped by size. The per-size total (sum of Closing) is a
// single cell on the far right, merged (rowSpan) across the group's rows — like
// the reference Excel — instead of a subtotal row in between.
function renderGroupedSummary(summary, onRowClick) {
  const out = [];
  let i = 0;

  while (i < summary.length) {
    const size = summary[i].size || '';
    let end = i;
    let closingTotal = 0;
    while (end < summary.length && (summary[end].size || '') === size) {
      closingTotal += Number(summary[end].closing) || 0;
      end += 1;
    }
    const groupCount = end - i;

    for (let k = i; k < end; k += 1) {
      const row = summary[k];
      out.push(
        <tr key={row.product_id} className="clickable-row" onClick={() => onRowClick(row)} title="View day-wise entries">
          <td className="item-name">{row.item}</td>
          <td>{row.size || '-'}</td>
          <td>{row.length || '-'}</td>
          <td className="num">{fmt(row.opening)}</td>
          {MovementCells(row)}
          <td className="num closing" style={{ color: Number(row.closing) < 0 ? 'var(--bad)' : undefined }}>
            {fmt(row.closing)}
          </td>
          {k === i ? (
            <td className="num size-total" rowSpan={groupCount}>{fmt(closingTotal)}</td>
          ) : null}
        </tr>
      );
    }
    i = end;
  }
  return out;
}

// Popup: the day-by-day entries for one item over the selected range.
function BreakdownModal({ item, rows, loading, error, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="voucher-modal-overlay" onMouseDown={onClose}>
      <div className="voucher-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="voucher-modal-head">
          <h3>{item} — day-wise entries</h3>
          <button type="button" className="voucher-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="daily-summary-table">
              <GroupedHead leadCols={['Date']} />
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={11} style={{ textAlign: 'center', padding: '16px' }}>
                      No movements in this period.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={`${row.date}-${idx}`}>
                      <td>{formatDdmmyyyy(row.date)}</td>
                      <td className="num">{fmt(row.opening)}</td>
                      {MovementCells(row)}
                      <td className="num closing" style={{ color: Number(row.closing) < 0 ? 'var(--bad)' : undefined }}>
                        {fmt(row.closing)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function DailyStockSummaryPanel({ products, categories }) {
  // Default view: today only.
  const [fromDate, setFromDate] = useState(todayStr());
  const [toDate, setToDate] = useState(todayStr());
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Drill-down popup state.
  const [openItem, setOpenItem] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [breakdownLoading, setBreakdownLoading] = useState(false);
  const [breakdownError, setBreakdownError] = useState(null);

  // Excel export state.
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState(null);

  const isToday = fromDate === todayStr() && toDate === todayStr();

  const setToday = () => {
    const t = todayStr();
    setFromDate(t);
    setToDate(t);
  };

  const setLastNDays = (n) => {
    setFromDate(daysAgoStr(n));
    setToDate(todayStr());
  };

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await window.stockOps.getDailyStockSummary({
        fromDate,
        toDate,
        productId: selectedProductId ? Number(selectedProductId) : null,
        categoryId: selectedCategoryId ? Number(selectedCategoryId) : null
      });
      setSummary(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch daily summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [fromDate, toDate, selectedProductId, selectedCategoryId]);

  const downloadExcel = async () => {
    if (!summary.length) {
      setExportMsg('Nothing to export for this period.');
      return;
    }
    setExporting(true);
    setExportMsg(null);
    try {
      const res = await window.stockOps.exportDailySummary({ rows: summary, fromDate, toDate });
      if (res?.canceled) return;
      setExportMsg(`Saved to ${res.path}`);
    } catch (err) {
      setExportMsg(err.message || 'Export failed');
    } finally {
      setExporting(false);
    }
  };

  const openBreakdown = async (row) => {
    setOpenItem(row.code ? `${row.code}${row.item ? ` — ${row.item}` : ''}` : row.item);
    setBreakdown([]);
    setBreakdownError(null);
    setBreakdownLoading(true);
    try {
      const data = await window.stockOps.getDailyStockBreakdown({
        fromDate,
        toDate,
        productId: row.product_id,
        categoryId: selectedCategoryId ? Number(selectedCategoryId) : null
      });
      setBreakdown(data || []);
    } catch (err) {
      setBreakdownError(err.message || 'Failed to load entries');
    } finally {
      setBreakdownLoading(false);
    }
  };

  return (
    <div className="daily-summary-view" style={{ display: 'grid', gap: '14px', minWidth: 0 }}>
      <section className="panel">
        <h2 style={{ marginBottom: '4px' }}>Daily Stock Summary</h2>
        <p className="stock-hint" style={{ marginBottom: '16px' }}>
          Opening = closing balance the day before “From”; Closing = balance on the “To” date.
          Click an item to see its day-wise entries.
        </p>

        <div className="inline-form" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <label>
            From
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label>
            To
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>
          <label style={{ gridColumn: 'span 2' }}>
            Item
            <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
              <option value="">All Items</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
              <option value="">All</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="summary-quick-row">
          <button type="button" className={isToday ? 'summary-quick-active' : ''} onClick={setToday} title="Show only today">
            Today
          </button>
          <button type="button" className="ghost-light-btn" onClick={() => setLastNDays(7)}>
            Last 7 days
          </button>
          <button type="button" className="ghost-light-btn" onClick={() => setLastNDays(30)}>
            Last 30 days
          </button>
          <button
            type="button"
            onClick={downloadExcel}
            disabled={exporting || loading}
            style={{ marginLeft: 'auto' }}
          >
            {exporting ? 'Exporting…' : 'Download Excel'}
          </button>
        </div>
        {exportMsg ? (
          <p className="stock-hint" style={{ marginTop: '8px' }}>{exportMsg}</p>
        ) : null}
      </section>

      <section className="panel">
        {loading ? (
          <p>Loading summary...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="daily-summary-table">
              <GroupedHead leadCols={['Item Name', 'Size', 'Length']} trailCol="Size Total" />
              <tbody>
                {summary.length === 0 ? (
                  <tr>
                    <td colSpan={14} style={{ textAlign: 'center', padding: '20px' }}>
                      No stock to show for the selected period.
                    </td>
                  </tr>
                ) : (
                  renderGroupedSummary(summary, openBreakdown)
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {openItem != null ? (
        <BreakdownModal
          item={openItem}
          rows={breakdown}
          loading={breakdownLoading}
          error={breakdownError}
          onClose={() => setOpenItem(null)}
        />
      ) : null}
    </div>
  );
}
