import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Route-level code-splitting is handled with React.lazy in App.tsx.
// The three.js stack is isolated into its own chunk so first paint never pays for it.
export default defineConfig({
  plugins: [react()],
  build: {
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
