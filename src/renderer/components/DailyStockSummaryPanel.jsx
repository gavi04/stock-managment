import { useState, useEffect } from 'react';

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

export function DailyStockSummaryPanel({ products, categories }) {
  // Default view: today only.
  const [fromDate, setFromDate] = useState(todayStr());
  const [toDate, setToDate] = useState(todayStr());
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="daily-summary-view" style={{ display: 'grid', gap: '14px', minWidth: 0 }}>
      <section className="panel">
        <h2 style={{ marginBottom: '4px' }}>Daily Stock Summary</h2>
        <p className="stock-hint" style={{ marginBottom: '16px' }}>
          Auto-generated day-wise stock position per item.
          {isToday ? ' Showing today only.' : null}
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
          <button
            type="button"
            className={isToday ? 'summary-quick-active' : ''}
            onClick={setToday}
            title="Show only today's stock"
          >
            Today
          </button>
          <button type="button" className="ghost-light-btn" onClick={() => setLastNDays(7)}>
            Last 7 days
          </button>
          <button type="button" className="ghost-light-btn" onClick={() => setLastNDays(30)}>
            Last 30 days
          </button>
        </div>
      </section>

      <section className="panel">
        {loading ? (
          <p>Loading summary...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="daily-summary-table">
              <thead>
                <tr>
                  <th rowSpan={2}>Date</th>
                  <th rowSpan={2}>Item</th>
                  <th rowSpan={2} className="num">Opening</th>
                  <th colSpan={4} className="grp grp-in">Stock In</th>
                  <th colSpan={4} className="grp grp-out">Stock Out</th>
                  <th rowSpan={2} className="num">Closing</th>
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
              <tbody>
                {summary.length === 0 ? (
                  <tr>
                    <td colSpan={12} style={{ textAlign: 'center', padding: '20px' }}>
                      No stock movements found for the selected period.
                    </td>
                  </tr>
                ) : (
                  summary.map((row, idx) => (
                    <tr key={`${row.product_id}-${row.date}-${idx}`}>
                      <td>{row.date}</td>
                      <td className="item-name">{row.item}</td>
                      <td className="num">{fmt(row.opening)}</td>
                      <td className="num sub-in">{cell(row.purchase)}</td>
                      <td className="num sub-in">{cell(row.sale_return)}</td>
                      <td className="num sub-in">{cell(row.production_in)}</td>
                      <td className="num sub-in total in-total">{cell(row.total_in)}</td>
                      <td className="num sub-out">{cell(row.sale)}</td>
                      <td className="num sub-out">{cell(row.purchase_return)}</td>
                      <td className="num sub-out">{cell(row.issue)}</td>
                      <td className="num sub-out total out-total">{cell(row.total_out)}</td>
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
      </section>
    </div>
  );
}
