import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IngredientSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=12&ranking=1&ignorePantry=true`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      
      // Filter recipes with at least 10 used ingredients
      const filteredRecipes = data.filter(
        (recipe) => recipe.usedIngredientCount >= 10
      ).map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        cuisine: "Mixed" 
      }));

      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/statistics`, { state: { recipe } });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            name="ingredientSearch"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, tomato, cheese)"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#8a76db]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#8a76db] text-white px-6 py-2 rounded-r-lg hover:bg-[#cdc1ff] transition disabled:opacity-50"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Tip: Separate ingredients with commas
        </p>
      </form>

      {isLoading && (
        <p className="text-center text-gray-600">Searching for recipes...</p>
      )}

      <div className="grid mb-3 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => handleRecipeClick(recipe)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-30 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              {recipe.title}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#8a76db]">Read more</p>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && recipes.length === 0 && ingredients.trim() && (
        <p className="text-center text-gray-600">
          No recipes found with the given ingredients.
        </p>
      )}
    </div>
  );
};

export default IngredientSearch;