/**
 * Custom-drawn comparison indicators, the brief bans emoji marks.
 * "Yes" is two Z-angled strokes meeting (a check cut on the brand diagonal);
 * "Limited" is a clear X mark, showing that the capability is not included.
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
      <path d="M5 5 15 15M15 5 5 15" fill="none" stroke="#4A6FA5" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
