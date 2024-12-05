import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesProvider";
import App from "./App";
import "./index.css";

// Suppress specific warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string') {
    // Suppress specific React Router warning
    if (args[0].includes('Relative route resolution') || 
        args[0].includes('v7_relativeSplatPath') ||
        args[0].includes('ReactDOMClient.createRoot()')) {
      return;
    }
  }
  originalWarn(...args);
};

// Ensure root is only created once
let root;
const rootElement = document.getElementById("root");

if (!root) {
  root = createRoot(rootElement);
}

const Main = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </StrictMode>
  );
};

const MainContent = () => {
  const { currentUser } = useAuth();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(currentUser ? currentUser.uid : null);
  }, [currentUser]);

  return (
    <FavoritesProvider userId={userId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesProvider>
  );
};

root.render(<Main />);
