import { useState } from 'react';
import { handleFormKeyNav } from '../utils/formKeyNav.js';

function emptyLine() {
  return { id: Date.now() + Math.random(), product_id: '', quantity: '', pcs: '' };
}

const inputStyle = { width: '100%', border: '1px solid #d5cfc3', background: '#fff', color: '#4f6166' };

function LineGrid({ title, hint, products, lines, setLines }) {
  const change = (idx, field, val) => setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, [field]: val } : l)));
  const add = () => setLines((prev) => [...prev, emptyLine()]);
  const remove = (idx) =>
    setLines((prev) => (prev.length === 1 ? [emptyLine()] : prev.filter((_, i) => i !== idx)));

  return (
    <div style={{ display: 'grid', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ color: '#2f3a3d' }}>{title}</strong>
        <button type="button" className="ghost-light-btn" onClick={add} style={{ padding: '4px 10px' }}>
          + Row
        </button>
      </div>
      {hint ? <small className="stock-hint">{hint}</small> : null}
      <table className="voucher-grid" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8f8f6' }}>
          <tr>
            <th>Stock Item</th>
            <th style={{ width: '90px' }}>Qty</th>
            <th style={{ width: '80px' }}>Pcs</th>
            <th style={{ width: '30px' }} />
          </tr>
        </thead>
        <tbody>
          {lines.map((l, i) => (
            <tr key={l.id}>
              <td>
                <select value={l.product_id} onChange={(e) => change(i, 'product_id', e.target.value)} style={inputStyle}>
                  <option value="" />
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} - {p.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input type="text" inputMode="decimal" value={l.quantity} onChange={(e) => change(i, 'quantity', e.target.value)} style={inputStyle} />
              </td>
              <td>
                <input type="text" inputMode="decimal" value={l.pcs} onChange={(e) => change(i, 'pcs', e.target.value)} style={inputStyle} />
              </td>
              <td style={{ textAlign: 'center' }}>
                <button type="button" onClick={() => remove(i)} tabIndex={-1} style={{ padding: '2px 6px', background: 'transparent', color: 'red', border: 'none' }}>
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductionFormulaPanel({ formulas, products, onRefresh }) {
  const [name, setName] = useState('');
  const [issued, setIssued] = useState([emptyLine()]);
  const [produced, setProduced] = useState([emptyLine()]);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const productLabel = (pid) => {
    const p = products.find((x) => String(x.id) === String(pid));
    return p ? `${p.code} - ${p.name}` : `#${pid}`;
  };

  const reset = () => {
    setName('');
    setIssued([emptyLine()]);
    setProduced([emptyLine()]);
    setEditingId(null);
    setError(null);
  };

  const startEdit = (f) => {
    setEditingId(f.id);
    setName(f.name);
    const toRows = (kind) =>
      (f.lines || [])
        .filter((l) => l.kind === kind)
        .map((l) => ({
          id: Date.now() + Math.random(),
          product_id: String(l.product_id),
          quantity: String(l.quantity ?? ''),
          pcs: String(l.pcs ?? '')
        }));
    const iss = toRows('issue');
    const pro = toRows('produce');
    setIssued(iss.length ? iss : [emptyLine()]);
    setProduced(pro.length ? pro : [emptyLine()]);
    setError(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Formula name is required.');
      return;
    }
    const collect = (rows, kind) =>
      rows
        .filter((l) => l.product_id)
        .map((l) => ({ product_id: Number(l.product_id), kind, quantity: Number(l.quantity) || 0, pcs: Number(l.pcs) || 0 }));
    const lines = [...collect(issued, 'issue'), ...collect(produced, 'produce')];
    if (!lines.some((l) => l.kind === 'issue')) {
      setError('Add at least one issued (raw material) item.');
      return;
    }
    if (!lines.some((l) => l.kind === 'produce')) {
      setError('Add at least one produced (finished) item.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (editingId) await window.stockOps.updateMaster('formula', editingId, { name: name.trim(), lines });
      else await window.stockOps.createMaster('formula', { name: name.trim(), lines });
      reset();
      await onRefresh();
    } catch (err) {
      setError((err?.message || 'Save failed').replace(/^Error invoking remote method '[^']*':\s*/, '').replace(/^AppError:\s*/, ''));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this formula?')) return;
    try {
      await window.stockOps.deleteMaster('formula', id);
      if (editingId === id) reset();
      await onRefresh();
    } catch (err) {
      setError(err?.message || 'Delete failed');
    }
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <section className="panel">
        <h2>{editingId ? 'Edit Production Formula' : 'New Production Formula'}</h2>
        <p className="stock-hint">
          A recipe with a fixed ratio: define the raw materials issued and the finished goods produced.
          On a Production voucher you can pick this formula and scale it by a batch multiplier.
        </p>
        {error ? <p className="error-message">{error}</p> : null}

        <form onSubmit={submit} onKeyDown={handleFormKeyNav} style={{ display: 'grid', gap: '14px', marginTop: '10px' }}>
          <label className="field" style={{ maxWidth: '420px' }}>
            <span>Formula Name *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Steel Rod Batch" />
          </label>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
            <LineGrid title="Issued (Raw Materials)" hint="Consumed — posts as stock OUT." products={products} lines={issued} setLines={setIssued} />
            <LineGrid title="Produced (Finished Goods)" hint="Made — posts as stock IN." products={products} lines={produced} setLines={setProduced} />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" disabled={busy}>
              {editingId ? 'Update Formula' : 'Save Formula'}
            </button>
            {editingId ? (
              <button type="button" className="ghost-light-btn" onClick={reset}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Formulas ({formulas.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Issued</th>
              <th>Produced</th>
              <th style={{ width: '140px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {formulas.length === 0 ? (
              <tr>
                <td colSpan={4}>No formulas yet.</td>
              </tr>
            ) : (
              formulas.map((f) => {
                const iss = (f.lines || []).filter((l) => l.kind === 'issue');
                const pro = (f.lines || []).filter((l) => l.kind === 'produce');
                const fmt = (arr) => arr.map((l) => `${productLabel(l.product_id)} × ${l.quantity}`).join(', ') || '-';
                return (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td style={{ whiteSpace: 'normal' }}>{fmt(iss)}</td>
                    <td style={{ whiteSpace: 'normal' }}>{fmt(pro)}</td>
                    <td>
                      <div className="action-row">
                        <button type="button" className="ghost-light-btn" onClick={() => startEdit(f)}>
                          Edit
                        </button>
                        <button type="button" className="danger-btn" onClick={() => remove(f.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
