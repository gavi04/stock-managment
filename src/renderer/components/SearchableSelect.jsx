import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Lightweight combobox: a text input with a filtered dropdown of options.
 * options: [{ value, label, hint }]. Calls onChange(value) on pick.
 * Keyboard: type to filter, Up/Down to highlight, Enter to pick, Esc to close.
 */
export function SearchableSelect({ options, value, onChange, placeholder = 'Search…', autoFocus = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const listRef = useRef(null);

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

  // Reset the highlight to the top whenever the visible list changes.
  useEffect(() => {
    setActive(0);
  }, [query, open]);

  // Keep the highlighted row scrolled into view as Up/Down move through it.
  useEffect(() => {
    const el = listRef.current?.children?.[active];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [active]);

  const pick = (option) => {
    onChange(String(option.value));
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
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (filtered[active]) {
        e.preventDefault();
        e.stopPropagation();
        pick(filtered[active]);
      }
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      setOpen(false);
      setQuery('');
    }
  };

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
        onBlur={() => {
          // Close when focus leaves (keyboard nav / tab). Option picks use
          // onMouseDown, which fires before blur, so selection still works.
          setOpen(false);
          setQuery('');
        }}
        onKeyDown={onKeyDown}
        style={{ width: '100%' }}
      />
      {open ? (
        <ul
          ref={listRef}
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
            filtered.map((option, i) => (
              <li
                key={option.value}
                onMouseDown={() => pick(option)}
                onMouseEnter={() => setActive(i)}
                style={{
                  padding: '8px 10px',
                  cursor: 'pointer',
                  color: '#4f6166',
                  background: i === active ? '#f2f0ea' : 'transparent'
                }}
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
