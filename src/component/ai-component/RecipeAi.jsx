import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RecipeAI = ({ recipeInfo, recipeSteps }) => {
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [dietaryType, setDietaryType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const { currentUser } = useAuth();

  
  const API_URL = "https://api-inference.huggingface.co/models/";

  const MODELS = {
    summarization: "facebook/bart-large-cnn",
    textGeneration: "gpt2"  // Fallback to a simpler model if BART fails
  };
  const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN 

  const summarizeRecipe = async () => {
    if (!recipeSteps || recipeSteps.length === 0) {
      setError('No recipe steps available to summarize');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const stepsText = recipeSteps.map(step => step.step).join(' ');
      
      // Call Hugging Face API for summarization
      const response = await fetch(`${API_URL}${MODELS.summarization}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: stepsText,
          parameters: {
            max_length: 150,
            min_length: 30,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to summarize recipe');
      }

      const result = await response.json();
    //   console.log("Summary API Response:", result); Debugging
      
      // Handle different response formats
      let summaryText;
      if (Array.isArray(result) && result.length > 0) {
        if (result[0].summary_text) {
          summaryText = result[0].summary_text;
        } else if (result[0].generated_text) {
          summaryText = result[0].generated_text;
        }
      }
      
      // If we couldn't extract the summary from the API response, generate a simple one
      if (!summaryText) {
        summaryText = generateSimpleSummary(recipeSteps);
      }
      
      setSummary(summaryText);
      setActiveTab('summary');
    } catch (err) {
      console.error('Error summarizing recipe:', err);
      
      // Fallback to local summary generation if API fails
      const simpleSummary = generateSimpleSummary(recipeSteps);
      setSummary(simpleSummary);
      setActiveTab('summary');
      
      setError('API request failed - showing simplified summary instead.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to generate a simple summary without the API
  const generateSimpleSummary = (steps) => {
    if (!steps || steps.length === 0) return "No steps available to summarize.";
    
    // Take the first step and the last two steps
    let summary = steps[0].step;
    
    // Add middle step if available
    if (steps.length > 3) {
      const middleIndex = Math.floor(steps.length / 2);
      summary += ` Then, ${steps[middleIndex].step.toLowerCase()}`;
    }
    
    // Add last step if different from first
    if (steps.length > 1) {
      summary += ` Finally, ${steps[steps.length - 1].step.toLowerCase()}`;
    }
    
    return summary;
  };

  const categorizeRecipe = async (type) => {
    if (!recipeInfo || !recipeInfo.title) {
      setError('No recipe information available');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      let prompt = '';
      
      if (type === 'mealTime') {
        prompt = `Classify the following recipe as breakfast, lunch, dinner, or snack: ${recipeInfo.title}`;
        setActiveTab('category');
      } else if (type === 'dietaryType') {
        prompt = `Classify if the following recipe is keto, vegan, vegetarian, gluten-free, or none: ${recipeInfo.title}`;
        setActiveTab('dietary');
      }
      
      const response = await fetch(`${API_URL}facebook/bart-large-cnn`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 10,
            min_length: 1,
            do_sample: false
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to categorize recipe');
      }

      const result = await response.json();
      //console.log("API Response:", result); Debugging
      
      // Extract the generated text from the response
      const generatedText = Array.isArray(result) && result.length > 0 && result[0].generated_text 
        ? result[0].generated_text.toLowerCase().trim() 
        : '';
      
      if (type === 'mealTime') {
        // Process the result to extract meal category
        const mealCategory = determineMealTime(generatedText, recipeInfo.title);
        setCategory(mealCategory);
      } else if (type === 'dietaryType') {
        // Process the result to extract dietary type
        const diet = determineDietaryType(generatedText, recipeInfo.title);
        setDietaryType(diet);
      }
    } catch (err) {
      console.error('Error categorizing recipe:', err);
      setError('Failed to categorize. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Improved function to determine meal time based on recipe title and AI response
  const determineMealTime = (aiResponse, title) => {
    // If AI response contains clear indicators, use them
    if (aiResponse.includes('breakfast')) return 'Breakfast';
    if (aiResponse.includes('lunch')) return 'Lunch';
    if (aiResponse.includes('dinner')) return 'Dinner';
    if (aiResponse.includes('snack')) return 'Snack';
    
    // Fallback to title analysis
    const titleLower = title.toLowerCase();
    if (titleLower.includes('breakfast') || titleLower.includes('pancake') || 
        titleLower.includes('waffle') || titleLower.includes('oatmeal') || 
        titleLower.includes('cereal') || titleLower.includes('toast')) {
      return 'Breakfast';
    }
    
    if (titleLower.includes('sandwich') || titleLower.includes('salad') || 
        titleLower.includes('wrap') || titleLower.includes('soup')) {
      return 'Lunch';
    }
    
    if (titleLower.includes('dinner') || titleLower.includes('roast') || 
        titleLower.includes('steak') || titleLower.includes('casserole') || 
        titleLower.includes('pasta')) {
      return 'Dinner';
    }
    
    if (titleLower.includes('snack') || titleLower.includes('cookie') || 
        titleLower.includes('bite') || titleLower.includes('dip')) {
      return 'Snack';
    }
    
    // Default based on complexity
    if (title.split(' ').length > 3) {
      return 'Dinner'; 
    }
    
    return 'Meal'; 
  };
  
  //  determine dietary type based on recipe title and AI response
  const determineDietaryType = (aiResponse, title) => {
    // If AI response contains clear indicators, use them
    if (aiResponse.includes('keto')) return 'Keto';
    if (aiResponse.includes('vegan')) return 'Vegan';
    if (aiResponse.includes('vegetarian')) return 'Vegetarian';
    if (aiResponse.includes('gluten-free') || aiResponse.includes('gluten free')) return 'Gluten-Free';
    
    // Fallback to title analysis
    const titleLower = title.toLowerCase();
    if (titleLower.includes('keto')) return 'Keto';
    if (titleLower.includes('vegan')) return 'Vegan';
    if (titleLower.includes('vegetarian') || 
        (!titleLower.includes('meat') && !titleLower.includes('chicken') && 
         !titleLower.includes('beef') && !titleLower.includes('pork') && 
         !titleLower.includes('fish'))) {
      return 'Vegetarian';
    }
    if (titleLower.includes('gluten-free') || titleLower.includes('gluten free')) return 'Gluten-Free';
    
    return 'Standard'; 
  };

  
  if (!currentUser) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recipe AI Tools</h3>
      
      <div className="flex text-xs md:text-sm space-x-2 mb-4">
        <button
          onClick={summarizeRecipe}
          className="px-4 py-2 bg-[#8a76db] text-white rounded-lg hover:bg-[#cdc1ff] transition"
          disabled={isLoading}
        >
          Summarize Recipe
        </button>
        <button
          onClick={() => categorizeRecipe('mealTime')}
          className="px-4 py-2 bg-[#8a76db] text-white rounded-lg hover:bg-[#cdc1ff] transition"
          disabled={isLoading}
        >
          Suggest Meal Time
        </button>
        <button
          onClick={() => categorizeRecipe('dietaryType')}
          className="px-4 py-2 bg-[#8a76db] text-white rounded-lg hover:bg-[#cdc1ff] transition"
          disabled={isLoading}
        >
          Identify Diet Type
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Processing with AI...</p>
          <div className="mt-2 w-8 h-8 border-4 border-[#8a76db] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          {error.includes('API') && (
            <p className="mt-2 text-sm">
              Note: This feature requires a valid token. Make sure you've set up the environment variable correctly.
            </p>
          )}
        </div>
      )}
      
      {(summary || category || dietaryType) && (
        <div className="mt-4">
          <div className="flex border-b">
            {summary && (
              <button 
                className={`${activeTab === 'summary' ? 'border-b-2 border-[#8a76db] -mb-px' : ''} px-4 py-2`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </button>
            )}
            {category && (
              <button 
                className={`${activeTab === 'category' ? 'border-b-2 border-[#8a76db] -mb-px' : ''} px-4 py-2`}
                onClick={() => setActiveTab('category')}
              >
                Meal Time
              </button>
            )}
            {dietaryType && (
              <button 
                className={`${activeTab === 'dietary' ? 'border-b-2 border-[#8a76db] -mb-px' : ''} px-4 py-2`}
                onClick={() => setActiveTab('dietary')}
              >
                Diet Type
              </button>
            )}
          </div>
          
          <div className="py-4">
            {activeTab === 'summary' && summary && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Recipe Summary:</h4>
                <p className="text-gray-500">{summary}</p>
              </div>
            )}
            
            {activeTab === 'category' && category && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Recommended Meal Time:</h4>
                <p className="text-gray-600">This recipe is best suited for <span className="font-semibold">{category}</span>.</p>
              </div>
            )}
            
            {activeTab === 'dietary' && dietaryType && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Dietary Classification:</h4>
                <p className="text-gray-600">This recipe appears to be <span className="font-semibold">{dietaryType}</span>.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeAI;