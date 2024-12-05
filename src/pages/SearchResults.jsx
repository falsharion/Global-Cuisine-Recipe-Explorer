import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FavoriteHeart from "../component/FavoriteHeart";
import Norecipe from "../component/stats-component/Norecipe";
import Loadingpage from "../component/Loadingpage";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const ingredients = searchParams.get("ingredients");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (ingredients) {
      fetchRecipes();
    }
  }, [ingredients, API_KEY]);

  const handleRecipeClick = (recipe) => {
    // Save the selected recipe in localStorage
    localStorage.setItem("recipe", JSON.stringify(recipe));

    // Navigate to the statistics page
    navigate(`/statistics`);
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl text-violet-950 font-bold mb-4">Recipes for: {ingredients}</h1>

      {isLoading ? (
        <Loadingpage />
      ) : recipes.length > 0 ? (
        <div className="grid mb-3 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="block border rounded-lg p-4 bg-white hover:shadow-lg cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-30 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{recipe.title}</h2>
              <div className="flex justify-between items-center">
              <p onClick={() => handleRecipeClick(recipe)} className="text-sm text-[#8a76db]">Read more</p>
              <FavoriteHeart recipe={recipe} />
              </div>

            </div>
          ))}
        </div>
      ) : (
        <Norecipe />
      )}
    </div>
  );
};

export default SearchResults;