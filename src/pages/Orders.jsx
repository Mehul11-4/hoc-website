import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getUserOrders } from "../firebase/firestore";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders(currentUser.uid);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(
          "Could not load your orders right now. Please try again shortly.",
        );
      } finally {
        setLoading(false);
      }
    }
    if (currentUser) fetchOrders();
  }, [currentUser]);

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl text-brand-brown font-bold mb-8"
        >
          My Orders
        </motion.h1>

        {loading && (
          <p className="font-body text-brown-light text-center py-12">
            Loading your orders...
          </p>
        )}

        {error && (
          <p className="font-body text-error text-center py-12">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <PackageSearch
              size={64}
              className="text-brown-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-2xl text-brand-brown font-bold mb-3">
              No orders yet
            </h2>
            <p className="font-body text-brown-light mb-8">
              When you place an order, it'll show up here.
            </p>
            <Link
              to="/menu"
              className="bg-brand-red text-white font-body font-semibold px-8 py-3 rounded-md hover:bg-red-hover transition-all duration-200 hover:scale-105 inline-block"
            >
              Browse Menu
            </Link>
          </motion.div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
