import { useState, useEffect, useRef } from 'react';
import { handleGridKeyNav } from '../utils/gridKeyNav.js';
import { handleFormKeyNav } from '../utils/formKeyNav.js';
import { todayDdmmyyyy } from '../utils/dateFormat.js';
import { VoucherHistory } from './VoucherHistory.jsx';
import { useFocusFirstField } from '../utils/useFocusFirstField.js';

// A single row holds both the issued (raw material) and produced (finished goods)
// amounts for a stock item. `base` is set only when the row came from a formula,
// and remembers the ratio numbers so the voucher can be scaled.
function emptyRow() {
  return {
    id: Date.now() + Math.random(),
    product_id: '',
    batch_no: '',
    issued_qty: '',
    issued_pcs: '',
    production_qty: '',
    production_pcs: '',
    base: null // { kind: 'issue'|'produce', qty, pcs }
  };
}

function fmt(n) {
  const r = Math.round((Number(n) || 0) * 1000) / 1000;
  return Number.isFinite(r) ? String(r) : '';
}

const inputStyle = { width: '100%', border: '1px solid #d5cfc3', background: '#fff', color: '#4f6166' };
const issuedBorder = { borderLeft: '2px solid #d5cfc3' };
const producedBorder = { borderLeft: '2px solid #c8b27a' };

export function ProductionVoucherPanel({ products, formulas = [], busy, onSave }) {
  const [voucherNo, setVoucherNo] = useState('');
  const [productionDate, setProductionDate] = useState(todayDdmmyyyy());
  const [isRecurring, setIsRecurring] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [formulaId, setFormulaId] = useState('');
  const [multiplier, setMultiplier] = useState('1');

  const [items, setItems] = useState([emptyRow()]);
  const [error, setError] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);
  const rootRef = useFocusFirstField();
  const gridRef = useRef(null);

  useEffect(() => {
    window.stockOps.getNextProductionVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);

  // Scale every formula-derived row (base != null) by a factor.
  const scaleRowsBy = (factor) => {
    setItems((prev) =>
      prev.map((r) => {
        if (!r.base) return r;
        const q = fmt(Number(r.base.qty) * factor);
        const p = r.base.pcs ? fmt(Number(r.base.pcs) * factor) : '';
        return r.base.kind === 'issue'
          ? { ...r, issued_qty: q, issued_pcs: p }
          : { ...r, production_qty: q, production_pcs: p };
      })
    );
  };

  const applyFormula = (fid) => {
    setFormulaId(fid);
    setMultiplier('1');
    const f = formulas.find((x) => String(x.id) === String(fid));
    if (!f) {
      setItems([emptyRow()]);
      return;
    }
    const rows = (f.lines || []).map((l) => {
      const base = { kind: l.kind, qty: Number(l.quantity) || 0, pcs: Number(l.pcs) || 0 };
      const q = fmt(l.quantity);
      const p = l.pcs ? fmt(l.pcs) : '';
      const row = { ...emptyRow(), id: Date.now() + Math.random(), product_id: String(l.product_id), base };
      return l.kind === 'issue'
        ? { ...row, issued_qty: q, issued_pcs: p }
        : { ...row, production_qty: q, production_pcs: p };
    });
    setItems(rows.length ? rows : [emptyRow()]);
  };

  const onMultiplierChange = (v) => {
    setMultiplier(v);
    scaleRowsBy(Number(v) || 0);
  };

  const changeField = (idx, field, value) => {
    const row = items[idx];
    // Editing the Qty of a formula row rescales everything to keep the fixed ratio.
    const isIssueQtyEdit = field === 'issued_qty' && row.base?.kind === 'issue' && Number(row.base.qty) > 0;
    const isProdQtyEdit = field === 'production_qty' && row.base?.kind === 'produce' && Number(row.base.qty) > 0;
    if (isIssueQtyEdit || isProdQtyEdit) {
      const factor = (Number(value) || 0) / Number(row.base.qty);
      setMultiplier(fmt(factor));
      scaleRowsBy(factor);
      return;
    }
    setItems((prev) => prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const appendRow = () => setItems((prev) => [...prev, emptyRow()]);
  const removeRow = (idx) => setItems((prev) => (prev.length === 1 ? [emptyRow()] : prev.filter((_, i) => i !== idx)));
  const onGridKey = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });

  const totals = items.reduce(
    (acc, r) => {
      acc.issued += Number(r.issued_qty) || 0;
      acc.produced += Number(r.production_qty) || 0;
      return acc;
    },
    { issued: 0, produced: 0 }
  );

  const handleSave = async () => {
    setError(null);
    try {
      const validItems = items
        .filter(
          (r) =>
            r.product_id &&
            (Number(r.issued_qty) > 0 || Number(r.issued_pcs) > 0 || Number(r.production_qty) > 0 || Number(r.production_pcs) > 0)
        )
        .map((r) => ({
          product_id: Number(r.product_id),
          batch_no: r.batch_no,
          issued_qty: Number(r.issued_qty) || 0,
          issued_pcs: Number(r.issued_pcs) || 0,
          production_qty: Number(r.production_qty) || 0,
          production_pcs: Number(r.production_pcs) || 0
        }));
      if (validItems.length === 0) throw new Error('Add at least one item with an issued or produced quantity.');

      await onSave({
        voucher_no: voucherNo,
        warehouse_id: 1,
        production_date: productionDate,
        is_recurring: isRecurring,
        remarks,
        items: validItems
      });

      setRemarks('');
      setIsRecurring(false);
      setFormulaId('');
      setMultiplier('1');
      setItems([emptyRow()]);
      const nextNo = await window.stockOps.getNextProductionVoucherNo();
      setVoucherNo(nextNo);
      setHistoryKey((k) => k + 1);
    } catch (err) {
      setError(err.message || 'Failed to save voucher');
    }
  };

  return (
    <div ref={rootRef} style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* HEADER */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2>Production Voucher</h2>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '12px' }}>
          <label className="field">
            <span>Date</span>
            <input type="text" placeholder="dd/mm/yyyy" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} />
          </label>
          <label className="field">
            <span>Voucher No.</span>
            <input value={voucherNo} readOnly style={{ background: '#f2f0ea' }} />
          </label>
          <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
            <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} style={{ width: 'auto' }} />
            <span>Make it Recurring</span>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <label className="field">
            <span>Production Formula (fixed ratio)</span>
            <select value={formulaId} onChange={(e) => applyFormula(e.target.value)}>
              <option value="">— None (manual entry) —</option>
              {formulas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Batch (× multiplier)</span>
            <input
              type="text"
              inputMode="decimal"
              value={multiplier}
              disabled={!formulaId}
              onChange={(e) => onMultiplierChange(e.target.value)}
              style={!formulaId ? { background: '#f2f0ea' } : undefined}
            />
          </label>
        </div>
      </section>

      {/* SINGLE GRID: issued + produced per row */}
      <section className="panel" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px 0' }}>
          <button type="button" className="ghost-light-btn" onClick={appendRow} style={{ padding: '4px 10px' }}>
            + Row
          </button>
        </div>
        <div style={{ overflow: 'auto', flex: 1 }}>
          <table ref={gridRef} className="voucher-grid" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8f8f6', zIndex: 1 }}>
              <tr>
                <th rowSpan={2} style={{ width: '30px' }}>#</th>
                <th rowSpan={2}>Stock Item</th>
                <th rowSpan={2} style={{ width: '110px' }}>Batch No.</th>
                <th colSpan={2} style={{ ...issuedBorder, textAlign: 'center' }}>Issued (Raw Material)</th>
                <th colSpan={2} style={{ ...producedBorder, textAlign: 'center' }}>Produced (Finished Goods)</th>
                <th rowSpan={2} style={{ width: '28px' }} />
              </tr>
              <tr>
                <th style={{ ...issuedBorder, width: '85px' }}>Qty</th>
                <th style={{ width: '75px' }}>Pcs</th>
                <th style={{ ...producedBorder, width: '85px' }}>Qty</th>
                <th style={{ width: '75px' }}>Pcs</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center' }}>{i + 1}</td>
                  <td>
                    <select value={row.product_id} onChange={(e) => changeField(i, 'product_id', e.target.value)} onKeyDown={onGridKey} style={inputStyle}>
                      <option value="" />
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.code} - {p.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input value={row.batch_no} onChange={(e) => changeField(i, 'batch_no', e.target.value)} onKeyDown={onGridKey} style={inputStyle} />
                  </td>
                  <td style={issuedBorder}>
                    <input type="text" inputMode="decimal" value={row.issued_qty} onChange={(e) => changeField(i, 'issued_qty', e.target.value)} onKeyDown={onGridKey} style={inputStyle} />
                  </td>
                  <td>
                    <input type="text" inputMode="decimal" value={row.issued_pcs} onChange={(e) => changeField(i, 'issued_pcs', e.target.value)} onKeyDown={onGridKey} style={inputStyle} />
                  </td>
                  <td style={producedBorder}>
                    <input type="text" inputMode="decimal" value={row.production_qty} onChange={(e) => changeField(i, 'production_qty', e.target.value)} onKeyDown={onGridKey} style={inputStyle} />
                  </td>
                  <td>
                    <input type="text" inputMode="decimal" value={row.production_pcs} onChange={(e) => changeField(i, 'production_pcs', e.target.value)} onKeyDown={onGridKey} style={inputStyle} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button type="button" onClick={() => removeRow(i)} tabIndex={-1} style={{ padding: '2px 6px', background: 'transparent', color: 'red', border: 'none' }}>
                      x
                    </button>
                  </td>
                </tr>
              ))}
              <tr style={{ background: '#f8f8f6', fontWeight: 'bold' }}>
                <td colSpan={3} style={{ textAlign: 'right', paddingRight: '10px' }}>Total Qty:</td>
                <td style={issuedBorder}>{totals.issued.toFixed(2)}</td>
                <td />
                <td style={producedBorder}>{totals.produced.toFixed(2)}</td>
                <td colSpan={2} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <label className="field" style={{ flex: 1 }}>
            <span>Remarks</span>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} style={{ resize: 'vertical' }} />
          </label>
          <button type="button" onClick={handleSave} disabled={busy} style={{ minWidth: '140px' }}>
            {busy ? 'Saving...' : 'Save Voucher'}
          </button>
        </div>
      </section>

      <VoucherHistory
        type="production"
        refreshToken={historyKey}
        title="Recent Production Vouchers"
        showParty={false}
        showAmount={false}
      />
    </div>
  );
}
