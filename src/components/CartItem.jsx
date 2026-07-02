import { motion } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
    >
      {/* Top row on mobile: image + name + remove */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-cream-dark flex items-center justify-center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              width="80"
              height="80"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display text-brown-muted text-xs">HOC</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-brand-brown font-semibold text-base truncate">
            {item.name}
          </h3>
          <p className="font-body text-brown-light text-sm mt-1">
            ₹{item.price} each
          </p>
        </div>

        {/* Remove button — visible on mobile top row */}
        <button
          onClick={onRemove}
          className="text-brown-muted hover:text-error transition-colors duration-200 flex-shrink-0 sm:hidden"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Bottom row on mobile: stepper + total + remove (desktop) */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 flex-shrink-0">
        <div className="flex items-center gap-3 bg-cream-dark rounded-md px-2 py-1.5">
          <button
            onClick={onDecrease}
            className="text-brand-brown hover:scale-110 transition-transform duration-150 w-5 flex items-center justify-center"
          >
            <Minus size={16} />
          </button>
          <motion.span
            key={item.quantity}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-brand-brown font-body font-semibold text-sm w-4 text-center"
          >
            {item.quantity}
          </motion.span>
          <button
            onClick={onIncrease}
            className="text-brand-brown hover:scale-110 transition-transform duration-150 w-5 flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="font-body text-brand-red font-bold text-base w-16 sm:w-20 text-right flex-shrink-0">
          ₹{item.price * item.quantity}
        </div>

        <button
          onClick={onRemove}
          className="hidden sm:block text-brown-muted hover:text-error transition-colors duration-200 flex-shrink-0"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
