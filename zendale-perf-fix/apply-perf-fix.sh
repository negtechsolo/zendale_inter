#!/usr/bin/env bash
# Zendale — performance fix. Replaces the earlier zendale-lag-fix.
# Run from the repository root:  bash zendale-perf-fix/apply-perf-fix.sh
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[ -f package.json ] && [ -d src/pages ] || { echo "Run this from the repository root."; exit 1; }
STAMP="$(date +%Y%m%d-%H%M%S)"; BACKUP=".perffix-backup-$STAMP"
N=0
while IFS= read -r -d '' src; do
  rel="${src#"$HERE/files/"}"
  if [ -f "$rel" ]; then mkdir -p "$BACKUP/$(dirname "$rel")"; cp "$rel" "$BACKUP/$rel"; fi
  mkdir -p "$(dirname "$rel")"; cp "$src" "$rel"; N=$((N+1))
done < <(find "$HERE/files" -type f -print0)
echo "Updated $N files. Backup in $BACKUP/"

# Vercel Analytics and Speed Insights are now imported by the app.
echo "Installing dependencies (includes @vercel/analytics and @vercel/speed-insights)…"
npm install --no-audit --no-fund

echo
echo "Done. Now run:  npm run build   then   npm run serve"
