import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Route-level code-splitting is handled with React.lazy in App.tsx.
// The three.js stack is isolated into its own chunk so first paint never pays
// for it. The client build also emits a manifest, which scripts/prerender.mjs
// reads to preload the exact page chunk each pre-rendered route needs.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // The three.js chunk is intentionally large and lazy-loaded only when the
    // home hero mounts; raise the warning threshold accordingly.
    chunkSizeWarningLimit: 1024,
    manifest: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              // three.js is reached only through the lazy EcosystemScene
              // import, so it is left to split naturally: listing it here
              // made it a static chunk that every page preloaded.
              motion: ["framer-motion"],
            },
          },
        },
  },
}));
