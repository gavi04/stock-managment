import { useEffect, useState } from 'react';

const money = (v) => `₹ ${Number(v || 0).toFixed(2)}`;
const num = (v) => Number(v || 0).toFixed(3);

// Modal showing a single voucher's header + line items.
function VoucherDetailModal({ type, detail, loading, error, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isProduction = type === 'production';

  return (
    <div className="voucher-modal-overlay" onMouseDown={onClose}>
      <div className="voucher-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="voucher-modal-head">
          <h3>{detail ? `Voucher ${detail.voucher_no}` : 'Voucher'}</h3>
          <button type="button" className="voucher-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : !detail ? null : (
          <div className="voucher-modal-body">
            <div className="voucher-meta">
              <div>
                <span>Date</span>
                <strong>{detail.date}</strong>
              </div>
              {!isProduction && detail.party ? (
                <div>
                  <span>Party</span>
                  <strong>{detail.party}</strong>
                </div>
              ) : null}
              {!isProduction && detail.invoice_no ? (
                <div>
                  <span>Invoice No</span>
                  <strong>{detail.invoice_no}</strong>
                </div>
              ) : null}
              {!isProduction && detail.batch_no ? (
                <div>
                  <span>Batch No</span>
                  <strong>{detail.batch_no}</strong>
                </div>
              ) : null}
              {!isProduction && detail.vehicle_no ? (
                <div>
                  <span>Vehicle No</span>
                  <strong>{detail.vehicle_no}</strong>
                </div>
              ) : null}
              {!isProduction && detail.bilty_no ? (
                <div>
                  <span>Bilty No</span>
                  <strong>{detail.bilty_no}</strong>
                </div>
              ) : null}
              {!isProduction && detail.broker ? (
                <div>
                  <span>Broker</span>
                  <strong>{detail.broker}</strong>
                </div>
              ) : null}
              {isProduction ? (
                <div>
                  <span>Recurring</span>
                  <strong>{detail.is_recurring ? 'Yes' : 'No'}</strong>
                </div>
              ) : null}
              {detail.remarks ? (
                <div>
                  <span>Remarks</span>
                  <strong>{detail.remarks}</strong>
                </div>
              ) : null}
            </div>

            <div style={{ overflowX: 'auto' }}>
              {isProduction ? (
                <table className="voucher-detail-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Batch</th>
                      <th className="num">Issued Qty</th>
                      <th className="num">Issued Pcs</th>
                      <th className="num">Prod. Qty</th>
                      <th className="num">Prod. Pcs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.items.map((it, i) => (
                      <tr key={i}>
                        <td>{it.product_name || it.product_code || '-'}</td>
                        <td>{it.batch_no || '-'}</td>
                        <td className="num">{num(it.issued_qty)}</td>
                        <td className="num">{num(it.issued_pcs)}</td>
                        <td className="num">{num(it.production_qty)}</td>
                        <td className="num">{num(it.production_pcs)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="voucher-detail-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>HSN</th>
                      <th className="num">Pcs</th>
                      <th className="num">Qty</th>
                      <th className="num">Base</th>
                      <th className="num">Net</th>
                      <th className="num">Taxable</th>
                      <th className="num">GST%</th>
                      <th className="num">GST Amt</th>
                      <th className="num">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.items.map((it, i) => (
                      <tr key={i}>
                        <td>{it.product_name || it.product_code || '-'}</td>
                        <td>{it.hsn || '-'}</td>
                        <td className="num">{Number(it.pcs) > 0 ? num(it.pcs) : '-'}</td>
                        <td className="num">{Number(it.quantity) > 0 ? num(it.quantity) : '-'}</td>
                        <td className="num">{Number(it.base_rate).toFixed(2)}</td>
                        <td className="num">{Number(it.net_rate).toFixed(2)}</td>
                        <td className="num">{Number(it.taxable_value).toFixed(2)}</td>
                        <td className="num">{Number(it.gst_rate).toFixed(2)}</td>
                        <td className="num">{Number(it.gst_amount).toFixed(2)}</td>
                        <td className="num">{Number(it.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {!isProduction ? (
              <div className="voucher-modal-totals">
                <div>
                  <span>Taxable Value</span>
                  <strong>{money(detail.taxable_value)}</strong>
                </div>
                <div>
                  <span>GST Amount</span>
                  <strong>{money(detail.gst_amount)}</strong>
                </div>
                <div className="grand">
                  <span>Grand Total</span>
                  <strong>{money(detail.total_amount)}</strong>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

// Bottom-of-page history for the voucher screens: lists the most recent vouchers
// of `type`. Re-fetches whenever `refreshToken` changes (bumped after a save).
// Click a row to open the full voucher.
export function VoucherHistory({
  type,
  refreshToken,
  title = 'Recent Vouchers',
  partyLabel = 'Party',
  showParty = true,
  showAmount = true,
  limit = 20
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openId, setOpenId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    window.stockOps
      .listVouchers(type, limit)
      .then((data) => {
        if (alive) setRows(data || []);
      })
      .catch((err) => {
        if (alive) setError(err?.message || 'Unable to load history');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [type, refreshToken, limit]);

  const openVoucher = async (row) => {
    setOpenId(row.id);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    try {
      const data = await window.stockOps.getVoucher(type, row.id);
      setDetail(data);
    } catch (err) {
      setDetailError(err?.message || 'Unable to load voucher');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeVoucher = () => {
    setOpenId(null);
    setDetail(null);
    setDetailError(null);
  };

  const colCount = 3 + (showParty ? 1 : 0) + (showAmount ? 1 : 0);

  return (
    <section className="panel voucher-history">
      <div className="voucher-history-head">
        <h3>{title}</h3>
        <span className="stock-hint">{rows.length ? `${rows.length} shown · click a row to view` : ''}</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="voucher-history-table">
          <thead>
            <tr>
              <th>Voucher No</th>
              <th>Date</th>
              {showParty ? <th>{partyLabel}</th> : null}
              <th className="num">Items</th>
              {showAmount ? <th className="num">Amount</th> : null}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colCount}>Loading…</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={colCount} className="error-message">
                  {error}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} style={{ opacity: 0.6 }}>
                  No vouchers saved yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="clickable-row"
                  onClick={() => openVoucher(row)}
                  title="View voucher details"
                >
                  <td style={{ fontWeight: 600 }}>{row.voucher_no}</td>
                  <td>{row.date}</td>
                  {showParty ? <td>{row.party || '-'}</td> : null}
                  <td className="num">{row.items_count}</td>
                  {showAmount ? (
                    <td className="num">
                      {row.total_amount != null ? money(row.total_amount) : '-'}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openId != null ? (
        <VoucherDetailModal
          type={type}
          detail={detail}
          loading={detailLoading}
          error={detailError}
          onClose={closeVoucher}
        />
      ) : null}
    </section>
  );
}
