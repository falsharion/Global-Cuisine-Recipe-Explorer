

import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children, userId }) => {
  const [favorites, setFavorites] = useState([]);

  // Reset favorites when userId changes or becomes null
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
    }
  }, [userId]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        const favoritesDocRef = doc(db, "favorites", userId);
        const docSnapshot = await getDoc(favoritesDocRef);
        if (docSnapshot.exists()) {
          setFavorites(docSnapshot.data().favorites);
        }
      }
    };

    fetchFavorites();
  }, [userId]);

  const addFavorite = async (recipe) => {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    await setDoc(doc(db, "favorites", userId), { favorites: updatedFavorites });
  };

  const removeFavorite = async (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    await setDoc(doc(db, "favorites", userId), { favorites: updatedFavorites });
  };

  const isFavorite = (recipeId) => {
    return favorites.some((recipe) => recipe.id === recipeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};