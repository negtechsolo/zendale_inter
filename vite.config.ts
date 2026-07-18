import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Route-level code-splitting is handled with React.lazy in App.tsx.
// The three.js stack is isolated into its own chunk so first paint never pays for it.
export default defineConfig({
  plugins: [react()],
  build: {
    // The three.js chunk (~266 kB gzip) is intentionally large and lazy-loaded
    // only when the home hero mounts; raise the warning threshold accordingly.
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
