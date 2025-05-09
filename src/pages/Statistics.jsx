import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import FavoriteHeart from "../component/FavoriteHeart";
import Nostats from "../component/stats-component/Nostats";
import Loadingpage from "../component/Loadingpage";
import { useAuth } from "../context/AuthContext";
import RecipeAI from "../component/ai-component/RecipeAi";

const Statistics = () => {
  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth", {
        state: {
          message: "Please log in to view recipe details",
          redirectPath: "/statistics",
        },
      });
      return;
    }

    const locationRecipe = location.state?.recipe;
    const savedRecipe = localStorage.getItem("recipe");

    if (locationRecipe) {
      setRecipe(locationRecipe);
      localStorage.setItem("recipe", JSON.stringify(locationRecipe));
    } else if (savedRecipe) {
      setRecipe(JSON.parse(savedRecipe));
    }
  }, [currentUser, navigate, location.state]);

  const fetchRecipeDetails = async (id) => {
    setIsLoading(true);
    try {
      // Check Firestore cache
      const recipeDocRef = doc(db, "recipeDetails", id.toString());
      const recipeSnapshot = await getDoc(recipeDocRef);

      if (recipeSnapshot.exists()) {
        const { steps: storedSteps, ingredients: storedIngredients } = recipeSnapshot.data();
        setSteps(storedSteps);
        setIngredients(storedIngredients);
      } else {
        // Fetch from API if not in cache
        const [instructionsResponse, nutritionResponse] = await Promise.all([
          fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`),
          fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`),
        ]);

        const instructionsData = await instructionsResponse.json();
        const nutritionData = await nutritionResponse.json();

        const detailedSteps = instructionsData[0]?.steps || [];
        const detailedIngredients = detailedSteps.flatMap((step) => step.ingredients);

        setSteps(detailedSteps);
        setIngredients(detailedIngredients);

        // Cache in Firestore
        await setDoc(recipeDocRef, {
          steps: detailedSteps,
          ingredients: detailedIngredients,
          calories: nutritionData?.calories || "N/A",
        });
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recipe?.id) {
      fetchRecipeDetails(recipe.id);
    }
  }, [recipe]);

  if (!recipe) {
    return <Nostats />;
  }

  if (isLoading) {
    return <Loadingpage />;
  }

  return (
    <div className="max-w-md md:max-w-6xl mx-auto bg-white overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-56 md:h-72 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 bg-gray-100 p-2 rounded-full shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 md:w-8 md:h-8 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between pt-5 items-center">
          <h2 className="text-lg font-bold md:text-2xl text-gray-800">{recipe.title}</h2>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 mt-1">{recipe.calories} cal</p>
          <FavoriteHeart recipe={recipe} />
        </div>
        
        <div className="lg:flex lg:justify-between">
          <div className="mt-6">
            <h3 className="text-gray-800 md:text-lg font-semibold mb-3">Ingredients</h3>
            <ul className="grid grid-cols-2 gap-y-2 list-disc list-inside">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm md:text-md lg:text-lg text-gray-600">
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 mb-8 lg:max-w-lg">
            <h3 className="text-gray-800 font-semibold mb-3">Steps</h3>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="text-sm md:text-md lg:text-lg text-gray-600">
                  {step.step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <RecipeAI recipeInfo={recipe} recipeSteps={steps} />
      </div>
    </div>
  );
};

export default Statistics;
