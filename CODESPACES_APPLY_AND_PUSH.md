# Apply the Final Zendale Package in GitHub Codespaces

## 1. Upload

Upload `ZENDALE_FINAL_READY_TO_PUSH.zip` into the Codespaces project root beside `package.json`.

## 2. Confirm the project location

```bash
pwd
```

Expected:

```text
/workspaces/zendale_inter
```

## 3. Back up the current working files

```bash
rm -rf /tmp/zendale-before-final
mkdir -p /tmp/zendale-before-final
cp -a src public index.html package.json package-lock.json /tmp/zendale-before-final/
```

## 4. Extract the final package

```bash
rm -rf /tmp/zendale-final-package
mkdir -p /tmp/zendale-final-package
unzip -q ZENDALE_FINAL_READY_TO_PUSH.zip -d /tmp/zendale-final-package
```

## 5. Copy the final files into the repository

```bash
cp -a /tmp/zendale-final-package/zendale-final-ready/. .
```

## 6. Remove the uploaded ZIP and temporary extraction

```bash
rm ZENDALE_FINAL_READY_TO_PUSH.zip
rm -rf /tmp/zendale-final-package
```

## 7. Remove generated caches

```bash
rm -rf dist node_modules/.vite
```

Do not delete the full `node_modules` folder.

## 8. Verify the editorial cleanup

```bash
grep -R "—" -n src
```

Expected: no output.

```bash
grep -R "TODO (legal review)\|A note on how these are written\|Where you see no numbers\|still being prepared\|being finalised" -n src
```

Expected: no output.

## 9. Build and test

```bash
npm run build
```

Then:

```bash
npx vitest run smoke.test.tsx
```

Expected: 16 tests passed.

## 10. Preview

```bash
npm run dev -- --host 0.0.0.0
```

Open port 5173. Close any older preview tab first, reopen the port, and use `Ctrl + Shift + R`.

Check the homepage at desktop width and at a narrow mobile width. On mobile, the headline must appear before the animated ecosystem graphic. On desktop, the interactive 3D graphic must remain inside the right-hand hero column.

## 11. Commit and push

Stop the development server with `Ctrl + C`, then run:

```bash
git status
git add src public index.html ZENDALE_FINAL_HANDOFF.md CODESPACES_APPLY_AND_PUSH.md
git commit -m "Finalise Zendale hero and website editorial polish"
git push
```

Vercel will redeploy from the pushed commit.

## Rollback

Before pushing, restore the backup with:

```bash
rm -rf src public
cp -a /tmp/zendale-before-final/src .
cp -a /tmp/zendale-before-final/public .
cp /tmp/zendale-before-final/index.html .
cp /tmp/zendale-before-final/package.json .
cp /tmp/zendale-before-final/package-lock.json .
npm run build
```
