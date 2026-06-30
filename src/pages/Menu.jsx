import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { getAllMenuItems } from "../firebase/firestore";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Menu() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchMenu() {
      try {
        const items = await getAllMenuItems();
        setAllItems(items);
      } catch (err) {
        console.error(err);
        setError(
          "Could not load the menu right now. Please try again shortly.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Build category list dynamically from the actual data
  const categories = ["All", ...new Set(allItems.map((item) => item.category))];

  const filteredItems =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ── PAGE HEADER ── */}
      <section className="py-16 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-brand-red text-sm font-semibold uppercase tracking-widest">
            Fresh Daily
          </span>
          <h1 className="font-display text-5xl text-brand-brown font-bold mt-3">
            Our Menu
          </h1>
          <p className="font-body text-brown-light text-lg mt-4 max-w-xl mx-auto">
            From celebration cakes to café favourites — everything made fresh in
            Bijainagar.
          </p>
        </motion.div>
      </section>

      {/* ── CATEGORY FILTER BAR ── */}
      {!loading && categories.length > 1 && (
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm font-medium px-5 py-2 rounded-full transition-all duration-200
                  ${
                    activeCategory === cat
                      ? "bg-brand-red text-white shadow-sm"
                      : "bg-white text-brand-brown hover:bg-cream-dark"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── LOADING STATE ── */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="font-body text-brown-light">Loading our menu...</p>
        </div>
      )}

      {/* ── ERROR STATE ── */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="font-body text-error">{error}</p>
        </div>
      )}

      {/* ── MENU GRID ── */}
      {!loading && !error && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-brand hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {item.imageUrl ? (
                    <div className="overflow-hidden h-48">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-cream-dark flex items-center justify-center">
                      <span className="font-display text-brown-muted text-sm">
                        HOC
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <span className="font-body text-xs text-brand-red font-semibold uppercase tracking-wide mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg text-brand-brown font-semibold leading-snug">
                      {item.name}
                    </h3>
                    <p className="font-body text-brown-light text-sm mt-1 mb-4 flex-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-display text-brand-red font-bold text-lg">
                        ₹{item.price}
                      </span>
                      <button className="flex items-center gap-2 bg-brand-red text-white font-body text-sm font-medium px-4 py-2 rounded-md hover:bg-red-hover transition-all duration-200 hover:scale-105">
                        <ShoppingCart size={16} />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <p className="text-center font-body text-brown-light py-20">
              No items found in this category.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
