import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
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

// Save a new order to Firestore after successful payment
export async function createOrder(orderData) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    status: "Placed",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Fetch all orders belonging to a specific customer
export async function getUserOrders(userId) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Fetch a single order by its ID
export async function getOrderById(orderId) {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}
// Fetch ALL orders (admin only) — no userId filter
export async function getAllOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Update an order's status (admin only)
export async function updateOrderStatus(orderId, newStatus) {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, { status: newStatus });
}
