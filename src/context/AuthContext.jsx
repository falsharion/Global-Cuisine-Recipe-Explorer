
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../db/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth'; 

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
      throw error; 
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
      logout
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