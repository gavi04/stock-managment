import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled])';

// Returns a ref to attach to a page/panel root. On mount (i.e. when the user
// navigates to the page and it mounts fresh) it moves the cursor to the first
// editable field, so keyboard-driven data entry can start immediately.
export function useFocusFirstField() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    // Defer a tick so it lands after initial layout and beats any autoFocus.
    const id = setTimeout(() => {
      const first = [...root.querySelectorAll(FOCUSABLE)].find(
        (el) => el.offsetParent !== null && el.tabIndex !== -1
      );
      if (first) {
        first.focus();
        if (typeof first.select === 'function') {
          try {
            first.select();
          } catch {
            /* date/number inputs */
          }
        }
      }
    }, 0);

    return () => clearTimeout(id);
  }, []);

  return ref;
}
