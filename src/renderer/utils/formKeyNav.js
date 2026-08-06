// Keyboard navigation for ordinary (non-grid) forms: voucher headers and the
// master entry forms. Attach to a container via onKeyDown={handleFormKeyNav}.
//
//   Enter / Right -> field to the RIGHT on the same visual row; at the end of a
//                    row it wraps to the first field of the next row.
//   Left          -> field to the left (wraps to previous row's last field).
//   Up / Down     -> field directly above / below.
//   Dropdowns     -> when navigation lands on a <select>, its list opens so you
//                    can browse with up/down; Enter picks and moves on.
//   Buttons       -> Save / Submit / Cancel buttons are part of the tab order,
//                    so navigating past the last field lands on them (press
//                    Enter or Space to activate). Buttons that opt out with
//                    tabIndex={-1} (e.g. per-row delete) are skipped.
//
// Left/Right on a text input only jump cells when the caret is at the field
// edge, so they keep moving the cursor while you're editing.
//
// At a section's first/last field, Enter/Left/Right hand off to focusAdjacent so
// focus crosses into the neighbouring section (header <-> grid <-> footer).

import { focusAdjacent } from './focusScope.js';

const FOCUSABLE =
  'input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';

function visibleFocusables(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null && el.tabIndex !== -1
  );
}

function openIfSelect(el) {
  if (el.tagName === 'SELECT' && typeof el.showPicker === 'function') {
    try {
      el.showPicker();
    } catch {
      /* already open / no user activation */
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
        /* date inputs etc. */
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

function geoNav(el, container, dir) {
  const r0 = el.getBoundingClientRect();
  const cx = r0.left + r0.width / 2;
  const cy = r0.top + r0.height / 2;
  // For left/right we only consider fields on (roughly) the same row.
  const rowTol = Math.max(r0.height * 0.6, 14);
  let best = null;
  let bestScore = Infinity;
  for (const it of visibleFocusables(container)) {
    if (it === el) continue;
    const r = it.getBoundingClientRect();
    const dx = r.left + r.width / 2 - cx;
    const dy = r.top + r.height / 2 - cy;
    let primary;
    let secondary;
    if (dir === 'down') {
      if (dy <= 2) continue;
      primary = dy;
      secondary = Math.abs(dx);
    } else if (dir === 'up') {
      if (dy >= -2) continue;
      primary = -dy;
      secondary = Math.abs(dx);
    } else if (dir === 'right') {
      if (dx <= 2 || Math.abs(dy) > rowTol) continue;
      primary = dx;
      secondary = Math.abs(dy);
    } else {
      if (dx >= -2 || Math.abs(dy) > rowTol) continue;
      primary = -dx;
      secondary = Math.abs(dy);
    }
    const score = primary + secondary * 3;
    if (score < bestScore) {
      bestScore = score;
      best = it;
    }
  }
  return best;
}

// First field of the next row (below) / last field of the previous row (above).
// A "different row" is one that does NOT vertically overlap el. We compare edges
// (top/bottom) rather than centres so a taller same-row cell — e.g. the Item Code
// field that carries a hint line under it — doesn't make its shorter neighbour
// look like it's on the row below.
function rowEdge(el, container, below) {
  const r0 = el.getBoundingClientRect();
  let best = null;
  let bestRect = null;
  for (const it of visibleFocusables(container)) {
    if (it === el) continue;
    const r = it.getBoundingClientRect();
    if (below ? r.top < r0.bottom - 2 : r.bottom > r0.top + 2) continue;
    if (!best) {
      best = it;
      bestRect = r;
      continue;
    }
    if (below) {
      if (r.top < bestRect.top - 2 || (Math.abs(r.top - bestRect.top) <= 2 && r.left < bestRect.left)) {
        best = it;
        bestRect = r;
      }
    } else if (r.top > bestRect.top + 2 || (Math.abs(r.top - bestRect.top) <= 2 && r.left > bestRect.left)) {
      best = it;
      bestRect = r;
    }
  }
  return best;
}

// Fallback: the neighbour in document order. Geometry can miss the Save/Submit
// button when it sits in its own actions row below the grid; DOM order always
// finds it (it's the next focusable after the last field).
function domSibling(el, container, step) {
  const list = visibleFocusables(container);
  const idx = list.indexOf(el);
  if (idx === -1) return null;
  return list[idx + step] || null;
}

function nextField(el, container) {
  return geoNav(el, container, 'right') || rowEdge(el, container, true) || domSibling(el, container, 1);
}

function prevField(el, container) {
  return geoNav(el, container, 'left') || rowEdge(el, container, false) || domSibling(el, container, -1);
}

function atStart(el) {
  try {
    return el.selectionStart === 0 && el.selectionEnd === 0;
  } catch {
    return true;
  }
}

function atEnd(el) {
  try {
    return el.selectionStart === el.value.length && el.selectionEnd === el.value.length;
  } catch {
    return true;
  }
}

export function handleFormKeyNav(e) {
  const el = e.target;
  if (!el || !['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) return;
  const container = e.currentTarget;

  if (el.tagName === 'TEXTAREA') {
    // Enter moves on like every other field so the flow reaches the Save button;
    // Shift+Enter still inserts a real newline. Left/Right leave at the caret edge.
    if (e.key === 'Enter' && !e.shiftKey) {
      const n = nextField(el, container);
      if (n) {
        e.preventDefault();
        place(n, 'select');
      } else if (focusAdjacent(el, 1, 'select')) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowRight' && atEnd(el)) {
      const n = nextField(el, container);
      if (n) {
        e.preventDefault();
        place(n, 'start');
      } else if (focusAdjacent(el, 1, 'start')) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowLeft' && atStart(el)) {
      const n = prevField(el, container);
      if (n) {
        e.preventDefault();
        place(n, 'end');
      } else if (focusAdjacent(el, -1, 'end')) {
        e.preventDefault();
      }
    }
    return;
  }

  if (el.tagName === 'SELECT') {
    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      const n = nextField(el, container);
      if (n) {
        e.preventDefault();
        place(n, 'start');
      } else if (focusAdjacent(el, 1, 'start')) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowLeft') {
      const n = prevField(el, container);
      if (n) {
        e.preventDefault();
        place(n, 'end');
      } else if (focusAdjacent(el, -1, 'end')) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Open the list so the options are visible; native handles traversal.
      e.preventDefault();
      openIfSelect(el);
    }
    return;
  }

  const type = (el.getAttribute('type') || 'text').toLowerCase();
  const textLike = ['text', 'search', 'tel', 'url', 'email', 'password'].includes(type);

  if (e.key === 'Enter') {
    const n = nextField(el, container);
    if (n) {
      e.preventDefault();
      place(n, 'select');
    } else if (focusAdjacent(el, 1, 'select')) {
      e.preventDefault();
    }
    return;
  }

  if (!textLike) return; // date / number keep native arrow behaviour

  if (e.key === 'ArrowDown') {
    const t = geoNav(el, container, 'down');
    if (t) {
      e.preventDefault();
      place(t, 'select');
    }
  } else if (e.key === 'ArrowUp') {
    const t = geoNav(el, container, 'up');
    if (t) {
      e.preventDefault();
      place(t, 'select');
    }
  } else if (e.key === 'ArrowRight' && atEnd(el)) {
    const t = nextField(el, container);
    if (t) {
      e.preventDefault();
      place(t, 'start');
    } else if (focusAdjacent(el, 1, 'start')) {
      e.preventDefault();
    }
  } else if (e.key === 'ArrowLeft' && atStart(el)) {
    const t = prevField(el, container);
    if (t) {
      e.preventDefault();
      place(t, 'end');
    } else if (focusAdjacent(el, -1, 'end')) {
      e.preventDefault();
    }
  }
}
