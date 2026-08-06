// Keyboard navigation for data-entry grids (voucher item tables).
//
//   Up / Down    -> same column, previous / next row
//   Left / Right -> previous / next editable cell in the row, but ONLY when the
//                   text caret is already at the start / end of the field, so
//                   left/right still move the cursor while you're editing.
//   Enter        -> next editable cell (row by row). At the very end it appends a
//                   new row ONLY if the last row has data; on an empty row it
//                   stops instead of spawning blank rows.
//
// For caret detection to work, numeric cells must be <input type="text"
// inputMode="decimal"> — type="number" throws when reading selectionStart in
// Chromium, which would make left/right always jump and break editing.

import { focusAdjacent } from './focusScope.js';

const FOCUSABLE = 'input:not([readonly]):not([disabled]), select:not([disabled])';

function firstFocusable(cell) {
  return cell ? cell.querySelector(FOCUSABLE) : null;
}

// Pop a <select> open when we land on it, so item dropdowns behave like the
// master forms — the list appears without a second keystroke.
function openIfSelect(el) {
  if (el.tagName === 'SELECT' && typeof el.showPicker === 'function') {
    try {
      el.showPicker();
    } catch {
      /* needs user activation / already open */
    }
  }
}

function place(el, caret) {
  el.focus();
  if (el.tagName === 'SELECT') {
    openIfSelect(el);
    return;
  }
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

// Does the row containing `el` hold any real data? A row counts as empty when no
// item is picked and every editable input is blank or a bare zero. Used to stop
// Enter from appending blank rows on top of an already-empty row.
function rowHasData(el) {
  const tr = el.closest('tr');
  if (!tr) return true; // can't tell — don't change append behaviour
  const select = tr.querySelector('select');
  if (select && select.value) return true;
  for (const inp of tr.querySelectorAll('input:not([type=hidden])')) {
    const v = (inp.value || '').trim();
    if (v && v !== '0' && v !== '0.00' && v !== '0.000') return true;
  }
  return false;
}

// Is `el` at the grid's outer edge — the very first (dir -1) or very last
// (dir +1) focusable cell — so an arrow past it should cross into the next
// section rather than staying inside the grid?
function isEdgeFocusable(el, dir) {
  const tbody = el.closest('tbody');
  if (!tbody) return false;
  const all = [...tbody.querySelectorAll(FOCUSABLE)];
  return dir > 0 ? all[all.length - 1] === el : all[0] === el;
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
      if (atBoundary(el, 'end')) {
        if (moveCell(el, 1)) e.preventDefault();
        else if (isEdgeFocusable(el, 1) && focusAdjacent(el, 1, 'start')) e.preventDefault();
      }
      return;
    case 'ArrowLeft':
      if (atBoundary(el, 'start')) {
        if (moveCell(el, -1)) e.preventDefault();
        else if (isEdgeFocusable(el, -1) && focusAdjacent(el, -1, 'end')) e.preventDefault();
      }
      return;
    case 'Enter': {
      e.preventDefault();
      const tbody = el.closest('tbody');
      if (!tbody) return;
      const all = [...tbody.querySelectorAll(FOCUSABLE)];
      const i = all.indexOf(el);
      if (i > -1 && i < all.length - 1) {
        place(all[i + 1], 'select');
      } else if (onAppendRow && rowHasData(el)) {
        // Only grow the grid when the last row actually has data; pressing Enter
        // on a trailing empty row should not keep spawning blank rows.
        onAppendRow();
      } else {
        // Trailing empty row: cross into the next section (e.g. the footer /
        // Save area) instead of adding another blank row.
        focusAdjacent(el, 1, 'select');
      }
      return;
    }
    default:
  }
}
