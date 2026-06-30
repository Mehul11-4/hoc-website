import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";

export default function Cart() {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <ShoppingBag
            size={64}
            className="text-brown-muted mx-auto mb-6"
            strokeWidth={1.5}
          />
          <h1 className="font-display text-3xl text-brand-brown font-bold mb-3">
            Your cart is empty
          </h1>
          <p className="font-body text-brown-light mb-8">
            Looks like you haven't added anything yet. Let's fix that.
          </p>
          <Link
            to="/menu"
            className="bg-brand-red text-white font-body font-semibold px-8 py-3 rounded-md hover:bg-red-hover transition-all duration-200 hover:scale-105 inline-block"
          >
            Browse Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl text-brand-brown font-bold mb-8"
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => increaseQuantity(item.id)}
                  onDecrease={() => decreaseQuantity(item.id)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </AnimatePresence>

            <Link
              to="/menu"
              className="font-body text-brand-red font-semibold hover:underline underline-offset-4 mt-4 inline-block w-fit"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-24"
          >
            <h2 className="font-display text-xl text-brand-brown font-semibold mb-5">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 font-body text-sm">
              <div className="flex justify-between text-brown-light">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-brown-light">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="border-t border-cream-dark pt-3 flex justify-between font-body text-lg text-brand-brown font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-brand-red text-white font-body font-semibold py-3 rounded-md hover:bg-red-hover transition-all duration-200 hover:scale-105 mt-6"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
