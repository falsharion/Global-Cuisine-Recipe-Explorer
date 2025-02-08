import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./component/home-component/Header";
import Banner from "./component/home-component/Banner";
import Recipe from "./component/home-component/Recipe";
import AuthPage from "./component/auth/AuthPage";
import Statistics from "./pages/Statistics";
import Saved from "./pages/Saved";
import ProtectedRoute from "./component/ProtectedRoute";
import Layout from "./component/Layout";
import SearchResults from "./pages/SearchResults";
import { useAuth } from "./context/AuthContext";
import { useFavorites } from "./hooks/useFavorite";

function App() {
  const [query, setQuery] = useState("");
  const { currentUser } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!currentUser) {
      // If not logged in, redirect to authentication page
      navigate("/auth", { 
        state: { 
          message: "Please log in to search for recipes", 
          redirectPath: `/search?ingredients=${e.target.elements.searchInput.value.trim()}` 
        } 
      });
      return;
    }

    const searchQuery = e.target.elements.searchInput.value.trim();

    // Ensure the ingredients are comma separated
    const formattedQuery = searchQuery
      .split(/[,\s]+/) 
      .map((ingredient) => ingredient.trim())
      .filter(Boolean) 
      .join(",");

    if (!formattedQuery) {
      alert("Please enter at least one ingredient.");
      return;
    }

    setQuery(formattedQuery);
    // Pass the validated and formatted query to the search page
    navigate(`/search?ingredients=${formattedQuery}`);
  };

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <form onSubmit={handleSearch} className="flex justify-center px-6 mt-4">
                  <div className="relative w-full md:max-w-xl lg:max-w-2xl max-w-md">
                    <input
                      type="text"
                      name="searchInput"
                      placeholder="Enter ingredients with comma (e.g flour,sugar)"
                      className="p-3 pr-12 md:text-2xl border h-14 w-full rounded-full focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#8a76db] text-white rounded-full h-10 w-10 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35M16.65 16.65A8.001 8.001 0 1112 4a8.001 8.001 0 014.65 12.65z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
                <Banner />
                <Recipe
                  query={query}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              </>
            }
          />

          {/* Other routes remain the same */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="login" element={<Navigate to="/auth" replace />} />
          <Route path="search" element={<SearchResults />} />
          
          <Route 
            path="statistics" 
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="saved" 
            element={
              <ProtectedRoute>
                <Saved />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
