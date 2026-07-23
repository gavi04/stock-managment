import { useState, useEffect, useMemo } from 'react';

export function DailyStockSummaryPanel({ products, categories }) {
  const [fromDate, setFromDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        </p>
        
        <div className="inline-form" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          <label>
            From
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <label style={{ gridColumn: 'span 2' }}>
            Item
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
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
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="">All</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="panel">
        {loading ? (
          <p>Loading summary...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: '900px' }}>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>ITEM</th>
                  <th>OPENING</th>
                  <th>PURCHASE</th>
                  <th>SALE RETURN</th>
                  <th>PRODUCTION</th>
                  <th style={{ color: 'var(--good)' }}>TOTAL IN</th>
                  <th>SALE</th>
                  <th>PURCH. RETURN</th>
                  <th>ISSUE</th>
                  <th style={{ color: 'var(--bad)' }}>TOTAL OUT</th>
                  <th>CLOSING</th>
                </tr>
              </thead>
              <tbody>
                {summary.length === 0 ? (
                  <tr>
                    <td colSpan={12}>No stock movements found for the selected period.</td>
                  </tr>
                ) : (
                  summary.map((row, idx) => (
                    <tr key={`${row.product_id}-${row.date}-${idx}`}>
                      <td>{row.date}</td>
                      <td style={{ fontWeight: 600 }}>{row.item}</td>
                      <td>{Number(row.opening).toFixed(3)}</td>
                      <td>{row.purchase > 0 ? Number(row.purchase).toFixed(3) : '-'}</td>
                      <td>{row.sale_return > 0 ? Number(row.sale_return).toFixed(3) : '-'}</td>
                      <td>{row.production_in > 0 ? Number(row.production_in).toFixed(3) : '-'}</td>
                      <td style={{ color: 'var(--good)', fontWeight: 600 }}>
                        {row.total_in > 0 ? Number(row.total_in).toFixed(3) : '-'}
                      </td>
                      <td>{row.sale > 0 ? Number(row.sale).toFixed(3) : '-'}</td>
                      <td>{row.purchase_return > 0 ? Number(row.purchase_return).toFixed(3) : '-'}</td>
                      <td>{row.issue > 0 ? Number(row.issue).toFixed(3) : '-'}</td>
                      <td style={{ color: 'var(--bad)', fontWeight: 600 }}>
                        {row.total_out > 0 ? Number(row.total_out).toFixed(3) : '-'}
                      </td>
                      <td style={{ fontWeight: 700 }}>{Number(row.closing).toFixed(3)}</td>
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
