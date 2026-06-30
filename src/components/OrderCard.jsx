import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "./Badge";

export default function OrderCard({ order }) {
  const itemCount = order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const date = order.createdAt?.toDate
    ? order.createdAt
        .toDate()
        .toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
    : "Just now";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-brand transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-xs text-brown-muted mb-1">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </p>
          <p className="font-body text-sm text-brown-light">
            {itemCount} item{itemCount !== 1 ? "s" : ""} · ₹{order.total} ·{" "}
            {date}
          </p>
        </div>
        <Badge status={order.status} />
      </div>

      <div className="flex justify-end mt-4">
        <Link
          to={`/orders/${order.id}`}
          className="font-body text-sm text-brand-red font-semibold hover:underline underline-offset-4"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}
