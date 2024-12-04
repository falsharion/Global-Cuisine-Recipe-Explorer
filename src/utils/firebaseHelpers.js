import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export const saveFavoritesToFirebase = async (userId, favorites) => {
  const favoritesRef = doc(db, "favorites", userId);
  await updateDoc(favoritesRef, { favorites });
};

export const fetchFavoritesFromFirebase = async (userId) => {
  const favoritesRef = doc(db, "favorites", userId);
  const snapshot = await getDoc(favoritesRef);
  return snapshot.exists() ? snapshot.data().favorites : [];
};
