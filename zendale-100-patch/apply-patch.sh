#!/usr/bin/env bash
#
# Zendale — apply the SEO / performance / accessibility patch.
#
# Usage, from the root of the zendale_inter repository:
#
#   bash zendale-100-patch/apply-patch.sh
#
# The script is safe to run twice. It makes a timestamped backup of every
# file it replaces before touching anything.
#
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$REPO/.patch-backup-$STAMP"

blue()  { printf "\033[0;34m%s\033[0m\n" "$1"; }
green() { printf "\033[0;32m%s\033[0m\n" "$1"; }
red()   { printf "\033[0;31m%s\033[0m\n" "$1"; }

# ---------------------------------------------------------------- sanity ----
if [ ! -f "$REPO/package.json" ] || [ ! -d "$REPO/src/pages" ]; then
  red "This does not look like the zendale_inter repository root."
  red "cd into the folder that contains package.json and src/, then run again."
  exit 1
fi

if [ ! -d "$HERE/files" ]; then
  red "Could not find $HERE/files — is the patch folder complete?"
  exit 1
fi

blue "Repository : $REPO"
blue "Backup     : $BACKUP"
echo

# ---------------------------------------------------------------- backup ----
mkdir -p "$BACKUP"
COUNT=0
while IFS= read -r -d '' src; do
  rel="${src#"$HERE/files/"}"
  if [ -f "$REPO/$rel" ]; then
    mkdir -p "$BACKUP/$(dirname "$rel")"
    cp "$REPO/$rel" "$BACKUP/$rel"
    COUNT=$((COUNT + 1))
  fi
done < <(find "$HERE/files" -type f -print0)
green "Backed up $COUNT existing files."

# ----------------------------------------------------------------- copy -----
FILES=0
while IFS= read -r -d '' src; do
  rel="${src#"$HERE/files/"}"
  mkdir -p "$REPO/$(dirname "$rel")"
  cp "$src" "$REPO/$rel"
  FILES=$((FILES + 1))
done < <(find "$HERE/files" -type f -print0)
green "Copied $FILES patched files into the repository."

# ------------------------------------------------------------- retire old ---
# The sitemap is now generated at build time with the real domain and the
# real route list, so the hand-written one would only go stale.
if [ -f "$REPO/public/sitemap.xml" ]; then
  mkdir -p "$BACKUP/public"
  mv "$REPO/public/sitemap.xml" "$BACKUP/public/sitemap.xml"
  green "Retired public/sitemap.xml (now generated into dist/ at build time)."
fi

# ------------------------------------------------------------ dependency ----
if ! node -e "require('./package.json').devDependencies.sharp" >/dev/null 2>&1; then
  blue "Installing sharp (used to generate responsive image variants)…"
  npm install -D sharp --no-audit --no-fund
fi

blue "Installing dependencies…"
npm install --no-audit --no-fund

echo
green "Patch applied."
echo
echo "Next:"
echo "  npm run build     # type-check, bundle, pre-render every page"
echo "  npm run serve     # serve dist/ exactly as Vercel will, on port 4173"
echo
echo "To undo everything:  cp -r $BACKUP/. $REPO/"
