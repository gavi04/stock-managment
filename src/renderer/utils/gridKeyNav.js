// Keyboard navigation for data-entry grids (voucher item tables).
//
//   Up / Down    -> same column, previous / next row
//   Left / Right -> previous / next editable cell in the row, but ONLY when the
//                   text caret is already at the start / end of the field, so
//                   left/right still move the cursor while you're editing.
//   Enter        -> next editable cell (row by row); appends a new row at the end.
//
// For caret detection to work, numeric cells must be <input type="text"
// inputMode="decimal"> — type="number" throws when reading selectionStart in
// Chromium, which would make left/right always jump and break editing.

const FOCUSABLE = 'input:not([readonly]):not([disabled]), select:not([disabled])';

function firstFocusable(cell) {
  return cell ? cell.querySelector(FOCUSABLE) : null;
}

function place(el, caret) {
  el.focus();
  if (caret === 'start' || caret === 'end') {
    if (typeof el.setSelectionRange === 'function') {
      try {
        const pos = caret === 'end' ? el.value.length : 0;
        el.setSelectionRange(pos, pos);
      } catch {
        /* select / number inputs don't support setSelectionRange */
      }
    }
  } else if (typeof el.select === 'function') {
    try {
      el.select();
    } catch {
      /* ignore */
    }
  }
}

function moveRow(el, direction) {
  const td = el.closest('td');
  const tr = td && td.closest('tr');
  if (!td || !tr) return false;
  const colIndex = [...tr.children].indexOf(td);
  const targetRow = direction > 0 ? tr.nextElementSibling : tr.previousElementSibling;
  const target = firstFocusable(targetRow && targetRow.children[colIndex]);
  if (target) {
    place(target, 'select');
    return true;
  }
  return false;
}

function moveCell(el, direction) {
  const td = el.closest('td');
  let cell = td && (direction > 0 ? td.nextElementSibling : td.previousElementSibling);
  while (cell) {
    const target = firstFocusable(cell);
    if (target) {
      place(target, direction > 0 ? 'start' : 'end');
      return true;
    }
    cell = direction > 0 ? cell.nextElementSibling : cell.previousElementSibling;
  }
  return false;
}

function atBoundary(el, side) {
  if (el.tagName === 'SELECT') return true; // no text caret
  let start;
  let end;
  let len;
  try {
    start = el.selectionStart;
    end = el.selectionEnd;
    len = el.value.length;
  } catch {
    return true; // e.g. type="number" — treat as boundary
  }
  if (start == null) return true;
  return side === 'start' ? start === 0 && end === 0 : start === len && end === len;
}

export function handleGridKeyNav(e, { onAppendRow } = {}) {
  const el = e.currentTarget;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault(); // also suppresses the number-spinner
      moveRow(el, 1);
      return;
    case 'ArrowUp':
      e.preventDefault();
      moveRow(el, -1);
      return;
    case 'ArrowRight':
      if (atBoundary(el, 'end') && moveCell(el, 1)) e.preventDefault();
      return;
    case 'ArrowLeft':
      if (atBoundary(el, 'start') && moveCell(el, -1)) e.preventDefault();
      return;
    case 'Enter': {
      e.preventDefault();
      const tbody = el.closest('tbody');
      if (!tbody) return;
      const all = [...tbody.querySelectorAll(FOCUSABLE)];
      const i = all.indexOf(el);
      if (i > -1 && i < all.length - 1) {
        place(all[i + 1], 'select');
      } else if (onAppendRow) {
        onAppendRow();
      }
      return;
    }
    default:
  }
}
