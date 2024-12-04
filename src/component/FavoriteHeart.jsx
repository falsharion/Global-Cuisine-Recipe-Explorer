// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { useFavorites } from "../context/FavoritesContext";

// const FavoriteHeart = ({ recipe  }) => {
//   const { addFavorite, removeFavorite, isFavorite } = useFavorites();
//   const isFav = isFavorite(recipe.id);

//   const toggleFavorite = () => {
//     if (isFav) {
//       removeFavorite(recipe.id);
//     } else {
//       addFavorite(recipe);
//     }
//   };

//   return (
//     <button onClick={toggleFavorite} className="focus:outline-none">
//       {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//     </button>
//   );
// };

// export default FavoriteHeart;

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
