import { auth } from "../firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User 
} from "firebase/auth";

// Sign up new user
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out user
export const logout = async () => {
  return await signOut(auth);
};

// Listen to user state
export const listenToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
export { auth, User };

