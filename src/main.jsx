import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Add useAuth to the import
import { FavoritesProvider } from "./context/FavoritesProvider";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

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

