import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import recipelogo from "../../assets/recipe-book.png"

const Header = () => {
  const { currentUser, logout } = useAuth(); // Destructure logout from useAuth
  const navigate = useNavigate();

  const formatUsername = (username) => {
    if (username) {
      return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    }
    return "";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleAuthButtonClick = () => {
    if (currentUser) {
      handleLogout(); // Logout if the user is logged in
    } else {
      navigate("/login"); // Navigate to login page if the user is logged out
    }
  };

  return (
    <header className="flex text-xl items-center justify-between p-6 bg-[#f6f3fb] text-black">
      <div className="flex items-center">
        <img
          src={recipelogo}
          alt="User Icon"
          className="w-8 h-8 rounded-full"
        />
        <span className="ml-2 text-violet-950">
          Hi, {formatUsername(currentUser?.displayName || "Guest")}
        </span>
      </div>
      <button
        onClick={handleAuthButtonClick}
        className="bg-[#8d79dc] text-base hover:bg-violet-950 text-white px-4 py-2 rounded-lg"
      >
        {currentUser ? "Log Out" : "Log In"}
      </button>
    </header>
  );
};

export default Header;


