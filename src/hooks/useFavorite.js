import { useEffect, useState } from "react";
import { saveFavoritesToFirebase, fetchFavoritesFromFirebase } from "../utils/firebaseHelpers";

export const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      if (storedFavorites) {
        setFavorites(storedFavorites);
      } else if (userId) {
        const fetchedFavorites = await fetchFavoritesFromFirebase(userId);
        setFavorites(fetchedFavorites);
        localStorage.setItem("favorites", JSON.stringify(fetchedFavorites));
      }
    };

    loadFavorites();
  }, [userId]);

  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      if (userId) {
        saveFavoritesToFirebase(userId, favorites);
      }
    }
  }, [favorites, userId]);

  return { favorites, setFavorites };
};
