import { useCallback, useEffect, useState } from 'react';
import { handleFormKeyNav } from '../utils/formKeyNav.js';

// Generic little master editor: a create/edit form + a list, driven by a
// `fields` config. Static mode (`staticRows`) is used for the small UOM list;
// `searchable` mode queries the backend (used for the ~21k HSN codes).
function MasterSection({ title, entity, fields, onRefresh, searchable = false, staticRows = [] }) {
  const emptyForm = () => Object.fromEntries(fields.map((f) => [f.key, '']));
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [fetched, setFetched] = useState([]);

  const reloadSearch = useCallback(async () => {
    if (!searchable) return;
    try {
      setFetched(await window.stockOps.listMaster(entity, { search: search.trim(), pageSize: 50 }));
    } catch {
      setFetched([]);
    }
  }, [searchable, entity, search]);

  useEffect(() => {
    if (!searchable) return undefined;
    const t = setTimeout(reloadSearch, 150);
    return () => clearTimeout(t);
  }, [reloadSearch, searchable]);

  const rows = searchable ? fetched : staticRows;

  const afterChange = async () => {
    if (searchable) await reloadSearch();
    else await onRefresh();
  };

  const reset = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError(null);
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm(Object.fromEntries(fields.map((f) => [f.key, row[f.key] ?? ''])));
    setError(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !String(form[f.key] || '').trim()) {
        setError(`${f.label} is required`);
        return;
      }
    }
    setBusy(true);
    setError(null);
    try {
      const payload = {};
      for (const f of fields) payload[f.key] = form[f.key];
      if (editingId) {
        await window.stockOps.updateMaster(entity, editingId, payload);
      } else {
        await window.stockOps.createMaster(entity, payload);
      }
      reset();
      await afterChange();
    } catch (err) {
      const clean = (err?.message || 'Save failed')
        .replace(/^Error invoking remote method '[^']*':\s*/, '')
        .replace(/^AppError:\s*/, '');
      setError(clean);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm(`Delete this ${title.replace(/s$/, '').toLowerCase()}?`)) return;
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.deleteMaster(entity, id);
      if (editingId === id) reset();
      await afterChange();
    } catch (err) {
      setError(err?.message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="panel">
      <h2>{editingId ? `Edit ${title}` : title}</h2>
      {error ? <p className="error-message">{error}</p> : null}

      <form className="inline-form" onSubmit={submit} onKeyDown={handleFormKeyNav}>
        {fields.map((f) => (
          <label key={f.key}>
            {f.label}
            {f.required ? ' *' : ''}
            <input
              value={form[f.key]}
              placeholder={f.placeholder || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
            />
          </label>
        ))}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
          <button type="submit" disabled={busy}>
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId ? (
            <button type="button" className="ghost-light-btn" onClick={reset}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      {searchable ? (
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search HSN code or description…"
          style={{ marginTop: '14px', width: '100%', padding: '8px 10px', border: '1px solid #d5cfc3', borderRadius: '8px' }}
        />
      ) : null}

      <table style={{ marginTop: '12px' }}>
        <thead>
          <tr>
            {fields.map((f) => (
              <th key={f.key}>{f.label}</th>
            ))}
            <th style={{ width: '140px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={fields.length + 1}>{searchable && search ? 'No matches.' : 'No entries yet.'}</td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {fields.map((f) => (
                  <td key={f.key}>{row[f.key] || '-'}</td>
                ))}
                <td>
                  <div className="action-row">
                    <button type="button" className="ghost-light-btn" onClick={() => startEdit(row)}>
                      Edit
                    </button>
                    <button type="button" className="danger-btn" onClick={() => remove(row.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {searchable ? (
        <p className="stock-hint" style={{ marginTop: '8px' }}>
          Showing up to 50 results — type above to narrow the ~21,000 HSN codes.
        </p>
      ) : null}
    </section>
  );
}

export function CodesUnitsPanel({ units, onRefresh }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        alignItems: 'start'
      }}
    >
      <MasterSection
        title="HSN Codes"
        entity="hsn"
        searchable
        onRefresh={onRefresh}
        fields={[
          { key: 'code', label: 'HSN Code', required: true, placeholder: 'e.g. 7208' },
          { key: 'description', label: 'Description', placeholder: 'Optional' }
        ]}
      />
      <MasterSection
        title="Units (UOM)"
        entity="unit"
        staticRows={units}
        onRefresh={onRefresh}
        fields={[
          { key: 'name', label: 'Unit Name', required: true, placeholder: 'e.g. Kilogram' },
          { key: 'symbol', label: 'Symbol', placeholder: 'e.g. kg' }
        ]}
      />
    </div>
  );
}
