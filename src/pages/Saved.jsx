
import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesProvider";
import { useNavigate } from "react-router-dom";
import savedrecipe from "../assets/savedrecipe.png";
import FavoriteHeart from "../component/FavoriteHeart";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 

const Saved = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [isLifo, setIsLifo] = useState(false); // State to toggle between FIFO and LIFO of recipe list

  // Sorted favorites based on the state
  const sortedFavorites = isLifo ? [...favorites].reverse() : favorites;

  const toggleSortOrder = () => {
    setIsLifo((prev) => !prev); // Toggle between FIFO and LIFO of recipe list
  };

  return (
    <div className="p-6  h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-violet-950 text-lg md:text-2xl font-semibold">
          Favorite Recipes
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSortOrder}
            className="text-gray-600 hover:text-[#8a76db] transition"
            title={isLifo ? "Sort FIFO (Oldest First)" : "Sort LIFO (Newest First)"}
          >
            {isLifo ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
          </button>
        </div>
      </div>
      {sortedFavorites.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-center text-gray-600">No favorites yet!</p>
          <img
            src={savedrecipe}
            alt="No saved recipes"
            className="w-3/4 opacity-10 max-w-xs mb-6"
          />
        </div>
      ) : (
        <div className="flex pt-6 flex-col">
          {sortedFavorites.map((recipe) => (
            <div
              key={recipe.id}
              className="flex items-center bg-white shadow-md mb-4 rounded-lg p-4"
            >
              {/* Recipe Image */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
              />
              
              {/* Recipe Details */}
              <div className="flex flex-col items-start flex-1 px-4">
                <h3 className="text-sm md:text-2xl font-semibold text-gray-800">
                  {recipe.title}
                </h3>
                <p className="text-sm md:text-xl text-gray-600">
                  {recipe.cuisine || "Cuisine not available"}
                </p>
                <button
                  onClick={() => navigate(`/statistics`, { state: { recipe } })}
                  className="text-sm md:text-lg text-[#8a76db] hover:underline mt-1"
                >
                  Read More
                </button>
              </div>
              
              {/* Favorite Icon */}
              <div className="ml-4">
                <FavoriteHeart recipe={recipe} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;

