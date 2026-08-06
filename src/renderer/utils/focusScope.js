// Cross-section keyboard bridging.
//
// Each data-entry area (voucher header, item grid, footer, and the master forms)
// runs its own key navigation (formKeyNav / gridKeyNav) scoped to its own
// container, so those handlers stop at the container's edge. This helper carries
// focus across that edge: when a handler runs out of fields it hands off here,
// which moves to the next/previous focusable anywhere on the current page.
//
// The page scope is the closest `.content-area` (the <main> that wraps whichever
// panel is active — see AppShell), so navigation flows header -> grid -> footer
// but never leaks into the sidebar or other chrome.

const SCOPE_SELECTOR = '.content-area';

const FOCUSABLE =
  'input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';

// Every focusable on the current page, in document order, minus hidden fields and
// anything that has opted out of the tab order (tabIndex = -1, e.g. read-only grid
// cells and per-row delete buttons).
function scopeFocusables(el) {
  const root = el.closest(SCOPE_SELECTOR) || el.ownerDocument.body;
  return [...root.querySelectorAll(FOCUSABLE)].filter(
    (node) => node.offsetParent !== null && node.tabIndex !== -1
  );
}

function place(el, caret) {
  el.focus();
  if (el.tagName === 'SELECT') {
    // Pop the list open on arrival, matching the master-form dropdowns.
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker();
      } catch {
        /* needs user activation / already open */
      }
    }
    return;
  }
  if (caret === 'start' || caret === 'end') {
    if (typeof el.setSelectionRange === 'function') {
      try {
        const pos = caret === 'end' ? el.value.length : 0;
        el.setSelectionRange(pos, pos);
      } catch {
        /* date / number inputs */
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

// Move focus to the neighbour `step` places away (+1 next, -1 previous) across the
// whole page. Returns true when it moved, so callers can preventDefault only then.
export function focusAdjacent(el, step, caret) {
  const list = scopeFocusables(el);
  const idx = list.indexOf(el);
  if (idx === -1) return false;
  const target = list[idx + step];
  if (!target) return false;
  place(target, caret);
  return true;
}
