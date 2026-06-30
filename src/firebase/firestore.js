import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./config";

// Fetch all available menu items, grouped naturally by category
export async function getAllMenuItems() {
  const q = query(
    collection(db, "menuItems"),
    where("available", "==", true),
    orderBy("category"),
    orderBy("sortOrder"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Fetch menu items for one specific category
export async function getMenuItemsByCategory(category) {
  const q = query(
    collection(db, "menuItems"),
    where("available", "==", true),
    where("category", "==", category),
    orderBy("sortOrder"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
