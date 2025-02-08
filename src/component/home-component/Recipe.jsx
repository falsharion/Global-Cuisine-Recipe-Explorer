
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import FavoriteHeart from "../FavoriteHeart";
import { useAuth } from "../../context/AuthContext";

const Recipe = () => {
  const [selectedCategory, setSelectedCategory] = useState("Cajun");
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const RECIPES_PER_PAGE = 10;
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

  const fetchFromApi = async (category, currentOffset) => {
    const url = `${BASE_URL}?apiKey=${API_KEY}&cuisine=${category}&offset=${currentOffset}&number=${RECIPES_PER_PAGE}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch from API");
    }
    const data = await response.json();
    return data?.results || [];
  };

  const fetchRecipes = async (category, currentOffset = 0, append = false) => {
    setIsLoading(true);
    const cacheKey = `${category}-${currentOffset}`;

    try {
      let fetchedRecipes;

      if (currentUser) {
        // Firestore caching for authenticated users
        const cacheRef = doc(db, "recipes", cacheKey);
        const cacheSnap = await getDoc(cacheRef);

        if (cacheSnap.exists()) {
          fetchedRecipes = cacheSnap.data().recipes;
        } else {
          fetchedRecipes = await fetchFromApi(category, currentOffset);
          await setDoc(cacheRef, { recipes: fetchedRecipes });
        }
      } else {
        // LocalStorage caching for unauthenticated users
        const localStorageData = localStorage.getItem(cacheKey);
        if (localStorageData) {
          fetchedRecipes = JSON.parse(localStorageData);
        } else {
          fetchedRecipes = await fetchFromApi(category, currentOffset);
          localStorage.setItem(cacheKey, JSON.stringify(fetchedRecipes));
        }
      }

      if (fetchedRecipes.length < RECIPES_PER_PAGE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setRecipes((prev) => (append ? [...prev, ...fetchedRecipes] : fetchedRecipes));
    } catch (err) {
      console.error("Error fetching recipes:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
      setOffset(0);
      setHasMore(true);
      fetchRecipes(category);
    }
  };

  const handleLoadMore = () => {
    const newOffset = offset + RECIPES_PER_PAGE;
    setOffset(newOffset);
    fetchRecipes(selectedCategory, newOffset, true);
  };

  const handleRecipeClick = (recipe) => {
    const recipeWithCuisine = {
      ...recipe,
      cuisine: selectedCategory,
    };

    if (!currentUser) {
      navigate("/auth", {
        state: {
          message: "Please log in to view recipe details",
          redirectPath: `/statistics`,
          recipeData: recipeWithCuisine,
        },
      });
      return;
    }

    navigate(`/statistics`, {
      state: {
        recipe: recipeWithCuisine,
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex overflow-x-auto lg:justify-center md:space-x-6 space-x-4 pb-4 scrollbar-hide">
        {["Cajun", "Italian", "Nordic", "Mediterranean", "Korean", "Thai"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-[#8a76db] text-white"
                : "bg-white text-gray-800"
            } hover:bg-[#8a76db] md:text-xl  hover:text-white transition`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid mb-3 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {isLoading && !recipes.length ? (
          <p className="text-center col-span-full md:text-3xl text-gray-600">Loading...</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg md:p-6 p-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-30 md:h-36  lg:h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-sm md:text-xl font-semibold text-gray-800">{recipe.title}</h3>
              <div className="flex justify-between items-center">
                <p
                  onClick={() => handleRecipeClick(recipe)}
                  className="text-sm lg:text-lg md:text-base text-[#8a76db] cursor-pointer hover:underline"
                >
                  {currentUser ? "Read more" : "View Details"}
                </p>
                {currentUser && (
                  <FavoriteHeart recipe={{ ...recipe, cuisine: selectedCategory }} />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-[#8a76db] text-white my-4 py-2 px-6 rounded-full hover:bg-[#cdc1ff] transition disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipe;
