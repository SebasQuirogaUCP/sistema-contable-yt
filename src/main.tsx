import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App.tsx";
import { Dashboard } from "./components/Dashboard.tsx";
import { TransactionTable } from "./components/TransactionTable.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/sistema-contable-yt">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transacciones" element={<TransactionTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
