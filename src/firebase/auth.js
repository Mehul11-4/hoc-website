import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

// Sign up a new customer
export async function signUp(name, email, password, phone = "", address = "") {
  // 1. Create the account in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  // 2. Create their profile document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    phone,
    address,
    role: "customer", // default role — never admin from signup
    createdAt: serverTimestamp(),
  });

  return user;
}

// Log in an existing user
export async function logIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
}

// Log out the current user
export async function logOut() {
  await signOut(auth);
}

// Fetch a user's profile document from Firestore (includes their role)
export async function getUserProfile(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

// Listen for login/logout changes anywhere in the app
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
