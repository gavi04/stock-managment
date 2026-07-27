import { useEffect, useRef, useState } from 'react';

// Async searchable HSN picker: queries the HSN master by text (there are ~21k
// codes, far too many for a plain dropdown). Keyboard: type to filter, Up/Down
// to highlight, Enter to pick, Esc to close.
export function HsnSelect({ value, onChange, inputStyle }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    let alive = true;
    const q = query.trim();
    const t = setTimeout(async () => {
      try {
        const rows = await window.stockOps.listMaster('hsn', { search: q, pageSize: 50 });
        if (alive) {
          setResults(rows || []);
          setActive(0);
        }
      } catch {
        if (alive) setResults([]);
      }
    }, 150);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [query, open]);

  const pick = (row) => {
    onChange(row.code);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown') {
        setOpen(true);
        e.stopPropagation();
        e.preventDefault();
      }
      return; // let form navigation handle Enter/arrows when closed
    }
    // Dropdown is open — handle internally and don't let the form nav steal keys.
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (results[active]) {
        e.preventDefault();
        e.stopPropagation();
        pick(results[active]);
      }
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      setOpen(false);
      setQuery('');
    }
  };

  const display = open ? query : value || '';

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <input
        value={display}
        placeholder={value ? value : 'Search HSN…'}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        style={inputStyle}
      />
      {open ? (
        <ul
          style={{
            position: 'absolute',
            zIndex: 30,
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            maxHeight: '260px',
            overflowY: 'auto',
            background: '#ffffff',
            border: '1px solid #d5cfc3',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(47,58,61,0.14)'
          }}
        >
          {results.length === 0 ? (
            <li style={{ padding: '8px 10px', opacity: 0.6 }}>
              {query.trim() ? 'No matches' : 'Type to search…'}
            </li>
          ) : (
            results.map((row, i) => (
              <li
                key={row.id}
                onMouseDown={() => pick(row)}
                onMouseEnter={() => setActive(i)}
                style={{
                  padding: '7px 10px',
                  cursor: 'pointer',
                  color: '#4f6166',
                  background: i === active ? '#f2f0ea' : 'transparent'
                }}
              >
                <strong>{row.code}</strong>
                {row.description ? <span style={{ opacity: 0.7 }}> — {row.description}</span> : null}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
