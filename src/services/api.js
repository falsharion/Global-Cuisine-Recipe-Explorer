

// const BASE_URL = "https://api.spoonacular.com";
// const API_KEY = "cc03358b7dfd4b7ea3d483c890d5fff7"; // Replace with your actual Spoonacular API key

// /**
//  * Fetch recipes by cuisine.
//  * @param {string} cuisine - The cuisine type (e.g., Cajun, Nordic).
//  * @param {number} offset - The offset for pagination.
//  * @returns {Promise<Object>} - The fetched recipes data.
//  */
// export const fetchRecipes = async (cuisine, offset = 0) => {
//   const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&offset=${offset}&number=10`;

//   try {
//     const response = await fetch(url);

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server. Please check your API key or endpoint.");
//     }

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching recipes:", error.message);
//     throw error;
//   }
// };

// export const fetchRecipes = async (cuisine, offset = 0) => {
//   const BASE_URL = "https://api.spoonacular.com";
//   const API_KEY = "your api"; // Replace with your real API key

//   const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&offset=${offset}&number=10`;

//   try {
//     const response = await fetch(url);

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server. Please check your API key or endpoint.");
//     }

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching recipes:", error.message);
//     throw error;
//   }
// };
