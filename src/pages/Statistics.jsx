// import React from 'react'
// import { FaRegHeart } from "react-icons/fa";

// const Statistics = () => {
//   return (
//     <div className="max-w-md mx-auto bg-white overflow-hidden">
//       {/* Header Image */}
//       <div className="relative">
//         <img
//           src="https://via.placeholder.com/400x200" // Replace with the actual image URL
//           alt="Spicy Ramen Noodle"
//           className="w-full h-56 object-cover"
//         />
//         <button className="absolute top-3 left-3 bg-gray-100 p-2 rounded-full shadow-md">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-600"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Recipe Details */}
//       <div className="p-6">
//         {/* Title and Like Button */}
//         <div className="flex justify-between pt-5 items-center">
//           <h2 className="text-lg font-bold text-gray-800">Spicy Ramen Noodle</h2>
//           <button className="bg-violet-100 p-2 rounded-full">
//           <FaRegHeart />
//           </button>
//         </div>
//         <p className="text-sm text-gray-500 mt-1">239cal</p>

//         {/* Stats */}
//         <div className="flex w-full items-center gap-2 justify-between mt-6 ">
//           <div className="text-center p-3 w-1/2 bg-violet-100 ">
//             <p className="text-violet-950 font-bold">+4.5M</p>
//             <p className="text-sm text-gray-500">recook this recipe</p>
//           </div>
//           <div className="text-center  p-3 w-1/2 bg-violet-100 ">
//             <p className="text-violet-950 font-bold">4.7</p>
//             <p className="text-sm text-gray-500">rating for this recipe</p>
//           </div>
//         </div>

//         <div className="mt-6">
//   <h3 className="text-gray-800 font-semibold mb-3">Ingredients</h3>
//   <ul className="grid grid-cols-2 gap-y-2 list-disc list-inside">
//     {["Noodle", "Chicken", "Vegetable", "Onion", "Shrimp", "Salt", "Garlic", "Pepper", "Egg", "Sesame Oil"].map(
//       (ingredient, index) => (
//         <li key={index} className="text-sm text-gray-600">
//           {ingredient}
//         </li>
//       )
//     )}
//   </ul>
// </div>

// <div className="mt-6 mb-8">
//   <h3 className="text-gray-800 font-semibold mb-3">Steps</h3>
//   <ol className="list-decimal list-inside space-y-2">
//     {[
//       "Boil water and cook the noodles according to package instructions.",
//       "Prepare the broth by mixing chicken stock with spices.",
//       "Stir-fry vegetables and shrimp in a pan until cooked.",
//       "Combine the noodles, broth, and stir-fried ingredients in a bowl.",
//       "Garnish with boiled egg, sesame oil, and chopped green onions."
//     ].map((step, index) => (
//       <li key={index} className="text-sm text-gray-600">
//         {step}
//       </li>
//     ))}
//   </ol>
// </div>
//       </div>
//     </div>
//   );
// }d2ee485ed224498e949f336f36beb3c1

// export default Statistics


// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa";
// import Nostats from "../component/stats-component/Nostats"

// const Statistics = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { recipe } = location.state || {};
//   const [steps, setSteps] = useState([]);
//   const [ingredients, setIngredients] = useState([]);

//   const API_KEY = "hi"; // Replace with your API key
//   const fetchRecipeDetails = async (id) => {
//     try {
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
//       );
//       const data = await response.json();
//       const detailedSteps = data[0]?.steps || [];
//       setSteps(detailedSteps);
//       const detailedIngredients = detailedSteps.flatMap((step) => step.ingredients);
//       setIngredients(detailedIngredients);
//     } catch (error) {
//       console.error("Error fetching recipe details:", error.message);
//     }
//   };

//   useEffect(() => {
//     if (recipe?.id) {
//       fetchRecipeDetails(recipe.id);
//     }
//   }, [recipe]);

//   if (!recipe) {
//     return <Nostats />;
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white overflow-hidden">
//       <div className="relative">
//         <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" />
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-3 left-3 bg-gray-100 p-2 rounded-full shadow-md"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-600"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//       </div>

//       <div className="p-6">
//         <div className="flex justify-between pt-5 items-center">
//           <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
//           <button className="bg-violet-100 p-2 rounded-full">
//             <FaRegHeart />
//           </button>
//         </div>
//         <p className="text-sm text-gray-500 mt-1">{recipe.calories} cal</p>

//         <div className="mt-6">
//           <h3 className="text-gray-800 font-semibold mb-3">Ingredients</h3>
//           <ul className="grid grid-cols-2 gap-y-2 list-disc list-inside">
//             {ingredients.map((ingredient, index) => (
//               <li key={index} className="text-sm text-gray-600">
//                 {ingredient.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-6 mb-8">
//           <h3 className="text-gray-800 font-semibold mb-3">Steps</h3>
//           <ol className="list-decimal list-inside space-y-2">
//             {steps.map((step, index) => (
//               <li key={index} className="text-sm text-gray-600">
//                 {step.step}
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;
// d2ee485ed224498e949f336f36beb3c1
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Nostats from "../component/stats-component/Nostats";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import FavoriteHeart from "../component/FavoriteHeart";
import Loadingpage from "../component/loadingpage";

const Statistics = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  useEffect(() => {
    // Redirect to login if user is unauthenticated
    if (!currentUser) {
      navigate("/auth", {
        state: {
          message: "Please log in to view recipe details",
          redirectPath: `/statistics`,
          recipeData: location.state?.recipe,
        },
      });
      return;
    }

    // Retrieve recipe from location state or localStorage
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
    <div className="max-w-md mx-auto bg-white overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-56 object-cover"
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
            className="w-5 h-5 text-gray-600"
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
          <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 mt-1">{recipe.calories} cal</p>
          <FavoriteHeart recipe={recipe} />
        </div>

        <div className="mt-6">
          <h3 className="text-gray-800 font-semibold mb-3">Ingredients</h3>
          <ul className="grid grid-cols-2 gap-y-2 list-disc list-inside">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm text-gray-600">
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 mb-8">
          <h3 className="text-gray-800 font-semibold mb-3">Steps</h3>
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="text-sm text-gray-600">
                {step.step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Statistics;