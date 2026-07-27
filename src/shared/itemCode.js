// Builds a stock item code from name/size/length:
//   name + size + length  -> name/size/length
//   name + length         -> name/length      (size missing)
//   name + size           -> name/size        (length missing)
//   name only             -> name
// Spaces within any part are replaced with underscores. The result can be
// overridden by the user in the form; this is only the auto-generated default.
export function buildItemCode(name, size, length) {
  return [name, size, length]
    .map((value) => (value ?? '').toString().trim())
    .filter(Boolean)
    .map((value) => value.replace(/\s+/g, '_'))
    .join('/');
}
