// import { createContext, useContext, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, logout } from "../db/firebase"; // Import logout

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// AuthContext.js
// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../db/firebase'; // Adjust the import path as needed
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth'; // Add this import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add logout method
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("lastRecipe"); // Clear recipe data
    } catch (error) {
      console.error("Error during logout:", error);
      throw error; // Re-throw to be caught in the calling function
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      loading,
      logout // Add logout to the context value
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};