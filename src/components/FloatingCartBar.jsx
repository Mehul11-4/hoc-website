import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function FloatingCartBar() {
  const { itemCount, total } = useCart();
  const location = useLocation();

  // Don't show on cart/checkout pages — redundant there
  const hiddenPaths = ["/cart", "/checkout"];
  const shouldHide = hiddenPaths.includes(location.pathname);

  return (
    <AnimatePresence>
      {itemCount > 0 && !shouldHide && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto will-change-transform"
        >
          <Link
            to="/cart"
            className="flex items-center justify-between bg-brand-red text-white rounded-xl px-5 py-4 shadow-lg hover:bg-red-hover transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} />
              <div>
                <p className="font-body text-xs opacity-90">
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </p>
                <p className="font-body text-sm font-semibold">₹{total}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-body text-sm font-semibold">
              View Cart
              <ChevronRight size={18} />
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
