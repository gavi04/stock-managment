import { useState, useEffect } from 'react';

export function ItemLedgerPanel({ products }) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedProduct = products.find((p) => String(p.id) === String(selectedProductId));
  
  useEffect(() => {
    if (!selectedProductId) {
      setLedger([]);
      return;
    }

    let active = true;

    const fetchLedger = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await window.stockOps.getItemLedger(selectedProductId);
        if (active) {
          setLedger(data || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to fetch ledger');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchLedger();

    return () => {
      active = false;
    };
  }, [selectedProductId]);

  const currentBalance = ledger.length > 0 ? ledger[ledger.length - 1].balance : 0;

  return (
    <div className="ledger-view" style={{ display: 'grid', gap: '14px', minWidth: 0 }}>
      <section className="panel">
        <h2>Item Stock Ledger</h2>
        <div className="inline-form" style={{ gridTemplateColumns: '1fr', maxWidth: '400px' }}>
          <label>
            Select Item
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">-- Choose an Item --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.code})
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {selectedProduct && (
        <section className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ marginBottom: 0 }}>{selectedProduct.name}</h2>
              <p className="stock-hint" style={{ marginTop: '4px' }}>Code: {selectedProduct.code}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="stock-hint" style={{ margin: 0 }}>Current Balance</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '32px', color: 'var(--title)' }}>
                {Number(currentBalance).toFixed(3)}
              </h3>
            </div>
          </div>

          {loading ? (
            <p>Loading ledger...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Voucher</th>
                  <th>Type</th>
                  <th>In</th>
                  <th>Out</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {ledger.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No transactions found for this item.</td>
                  </tr>
                ) : (
                  ledger.map((row, idx) => (
                    <tr key={idx}>
                      <td>{new Date(row.date).toLocaleString()}</td>
                      <td>{row.voucher}</td>
                      <td>{row.type}</td>
                      <td style={{ color: row.qty_in > 0 ? 'var(--good)' : 'inherit' }}>
                        {row.qty_in > 0 ? Number(row.qty_in).toFixed(3) : '-'}
                      </td>
                      <td style={{ color: row.qty_out > 0 ? 'var(--bad)' : 'inherit' }}>
                        {row.qty_out > 0 ? Number(row.qty_out).toFixed(3) : '-'}
                      </td>
                      <td style={{ fontWeight: 600 }}>{Number(row.balance).toFixed(3)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
}
