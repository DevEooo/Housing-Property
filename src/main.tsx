import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./LoginPage.tsx";
import SignUpPage from "./SignUpPage.tsx";
import Dashboard from "./Dashboard.tsx";
import "./index.css";
import "../src/styles/globals.css"
import '../src/styles/login.css';
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
