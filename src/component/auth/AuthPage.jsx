import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useAuth } from "../../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();


  const [redirectMessage, setRedirectMessage] = useState("");
  const [redirectData, setRedirectData] = useState(null);

  useEffect(() => {
    // Check for redirect information in location state
    if (location.state?.message) {
      setRedirectMessage(location.state.message);
    }

    // Store any redirect data (like recipe details)
    if (location.state?.recipeData) {
      setRedirectData(location.state.recipeData);
    }

    // If user is already logged in, redirect to home or intended page
    if (currentUser) {
      // Prioritize specific redirect path or recipe redirect
      if (location.state?.redirectPath) {
        navigate(location.state.redirectPath, { 
          state: { 
            recipe: redirectData || location.state.recipeData 
          },
          replace: true 
        });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [currentUser, location.state, navigate, redirectData]);

  const toggleAuth = () => {
    setIsLogin((prev) => !prev);
    // Clear any redirect message when switching between login/signup
    setRedirectMessage("");
  };

  return (
    <div className="min-h-full overflow-hidden flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 rounded-xl hadow-lg">
        {/* Redirect message */}
        {redirectMessage && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{redirectMessage}</span>
          </div>
        )}

        {/* Login/Signup Form */}
        <div className="flex flex-col">
          {isLogin ? <Login /> : <Signup />}

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button onClick={toggleAuth} className="z-40 w-full">
            {isLogin ? (
              <div className="rounded-full bg-[#f5efff] border border-violet-950 text-violet-950 py-3 w-full">
                Create Account
              </div>
            ) : (
              <div className="rounded-full bg-[#f5efff] border border-violet-950 text-violet-950 py-3 w-full">
                Log In
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;