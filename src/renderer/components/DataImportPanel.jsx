import { useState } from 'react';

function ResultCard({ title, result }) {
  if (!result) return null;
  const hasErrors = result.errors && result.errors.length > 0;
  return (
    <div className="import-result-card">
      <div className="import-result-head">
        <strong>{title}</strong>
        <span>
          <span className="import-badge good">{result.created} created</span>
          {result.skipped ? <span className="import-badge warn">{result.skipped} skipped</span> : null}
          {hasErrors ? <span className="import-badge bad">{result.errors.length} issue(s)</span> : null}
        </span>
      </div>
      {hasErrors ? (
        <ul className="import-error-list">
          {result.errors.map((e, i) => (
            <li key={i}>
              {e.row ? <span className="import-row-no">Row {e.row}:</span> : null} {e.message}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function DataImportPanel({ onRefresh }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [canceled, setCanceled] = useState(false);

  const runImport = async () => {
    setBusy(true);
    setError(null);
    setSummary(null);
    setCanceled(false);
    try {
      const res = await window.stockOps.importExcel();
      if (res?.canceled) {
        setCanceled(true);
        return;
      }
      setSummary(res.summary);
      // Pull the newly imported products/parties into the rest of the app.
      if (onRefresh) await onRefresh();
    } catch (err) {
      setError(err?.message || 'Import failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '14px', minWidth: 0 }}>
      <section className="panel">
        <h2 style={{ marginBottom: '4px' }}>Import from Excel</h2>
        <p className="stock-hint" style={{ marginBottom: '16px' }}>
          Bulk-load stock items and parties from the import template instead of typing them one by one.
        </p>

        <div className="import-help">
          <p>The workbook must have two sheets:</p>
          <ul>
            <li>
              <strong>STOCK ITEM</strong> — columns: Stock Name, Group, HSN Code, UOM, Size, Length, GST Rate,
              Sale Rate, Purchase Rate, Size Difference, Batch No., Opening Stock Qty, Opening Stock Date, Item Code.
            </li>
            <li>
              <strong>PARTY</strong> — columns: GST No., Party Name, Party Code, Address, City, District, State,
              PIN Code, Mobile Number.
            </li>
          </ul>
          <p className="stock-hint">
            Groups and units are matched by name and created automatically if new. Item/Party codes are auto-generated
            when blank. Rows with a duplicate code are skipped. Measurement basis defaults to Quantity — adjust in
            Stock Master afterwards if an item is counted in Pcs.
          </p>
        </div>

        <div style={{ marginTop: '16px' }}>
          <button type="button" onClick={runImport} disabled={busy}>
            {busy ? 'Importing…' : 'Choose Excel File & Import'}
          </button>
        </div>

        {error ? <p className="error-message" style={{ marginTop: '12px' }}>{error}</p> : null}
        {canceled ? <p className="stock-hint" style={{ marginTop: '12px' }}>No file selected.</p> : null}
      </section>

      {summary ? (
        <section className="panel">
          <h3 style={{ marginTop: 0 }}>Import Results</h3>
          <ResultCard title="Stock Items" result={summary.stock} />
          <ResultCard title="Parties" result={summary.party} />
        </section>
      ) : null}
    </div>
  );
}
