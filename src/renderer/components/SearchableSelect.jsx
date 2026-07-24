import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Lightweight combobox: a text input with a filtered dropdown of options.
 * options: [{ value, label, hint }]. Calls onChange(value) on pick.
 */
export function SearchableSelect({ options, value, onChange, placeholder = 'Search…', autoFocus = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef(null);

  const selected = useMemo(
    () => options.find((option) => String(option.value) === String(value)) || null,
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) =>
      `${option.label} ${option.hint ?? ''}`.toLowerCase().includes(q)
    );
  }, [options, query]);

  const display = open ? query : selected?.label ?? '';

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <input
        autoFocus={autoFocus}
        value={display}
        placeholder={selected ? selected.label : placeholder}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        style={{ width: '100%' }}
      />
      {open ? (
        <ul
          style={{
            position: 'absolute',
            zIndex: 20,
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            maxHeight: '240px',
            overflowY: 'auto',
            background: '#ffffff',
            border: '1px solid #d5cfc3',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(47,58,61,0.12)'
          }}
        >
          {filtered.length === 0 ? (
            <li style={{ padding: '8px 10px', opacity: 0.6 }}>No matches</li>
          ) : (
            filtered.map((option) => (
              <li
                key={option.value}
                onMouseDown={() => {
                  onChange(String(option.value));
                  setOpen(false);
                  setQuery('');
                }}
                style={{ padding: '8px 10px', cursor: 'pointer', color: '#4f6166' }}
                onMouseEnter={(event) => (event.currentTarget.style.background = '#f2f0ea')}
                onMouseLeave={(event) => (event.currentTarget.style.background = 'transparent')}
              >
                {option.label}
                {option.hint ? <span style={{ opacity: 0.6 }}> {option.hint}</span> : null}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
