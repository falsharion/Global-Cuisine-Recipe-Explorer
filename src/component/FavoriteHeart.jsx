

import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesProvider";

const FavoriteHeart = ({ recipe }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite(recipe.id) ? <FaHeart className="text-red-500" />  : <FaRegHeart />}
    </button>
  );
};

export default FavoriteHeart;
