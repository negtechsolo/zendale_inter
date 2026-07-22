import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

const container = document.getElementById("root")!;

const tree = (
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * Pages are pre-rendered to static HTML at build time, so the normal path is
 * hydration: React adopts the existing markup instead of rebuilding it, which
 * is why the footer no longer jumps when the route chunk arrives.
 * `npm run dev` serves an empty shell, so fall back to a fresh root there.
 */
if (container.firstChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
