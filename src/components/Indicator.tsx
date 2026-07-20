/**
 * Custom-drawn comparison indicators, the brief bans emoji marks.
 * "Yes" is two Z-angled strokes meeting (a check cut on the brand diagonal);
 * "Limited" is a single short diagonal stroke.
 */
export function MarkYes() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M3.5 11 8 15.5 16.5 5" fill="none" stroke="#C89B5A" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function MarkLimited() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M5 13 15 7" fill="none" stroke="#4A6FA5" strokeWidth="2" strokeLinecap="square" opacity="0.45" />
    </svg>
  );
}
