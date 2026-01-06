import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./css/globals.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
    <App />
  </Suspense>
);
