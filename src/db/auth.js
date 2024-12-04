import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebase"; // Assuming firebase app is exported here


const db = getFirestore(app);

export const signup = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update the user's profile with the username
  await updateProfile(user, { displayName: username });

  // Add user data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    createdAt: new Date().toISOString(),
  });

  return user; // Return the user object to update the state in UI
};
// Log in function
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Log out function
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("lastOpenedRecipe"); // Clear the recipe from local storage
    setFavorites([]);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Check user authentication state
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
export const getCurrentUser = () => auth.currentUser;


