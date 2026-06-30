import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const DELIVERY_FEE = 30;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [justAdded, setJustAdded] = useState(false);

  // Add an item to the cart (or increase quantity if it already exists)
  function addToCart(menuItem) {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === menuItem.id);

      if (existing) {
        return prevItems.map((i) =>
          i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [
        ...prevItems,
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          imageUrl: menuItem.imageUrl || "",
          quantity: 1,
        },
      ];
    });

    // Trigger a brief "bounce" flag the Navbar can react to
    setJustAdded(true);
  }

  // Used by the Navbar after it plays the bounce animation
  function clearJustAdded() {
    setJustAdded(false);
  }

  function increaseQuantity(itemId) {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  }

  function decreaseQuantity(itemId) {
    setItems((prevItems) =>
      prevItems
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  function getItemQuantity(itemId) {
    const item = items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  }

  function removeFromCart(itemId) {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const value = {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    justAdded,
    clearJustAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
