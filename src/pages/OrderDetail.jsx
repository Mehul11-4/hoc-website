import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, PartyPopper } from "lucide-react";
import { getOrderById } from "../firebase/firestore";
import Badge from "../components/Badge";

const STATUS_STEPS = ["Placed", "Preparing", "Out for Delivery", "Delivered"];

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(id);
        if (!data) {
          setError("Order not found.");
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load this order right now.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="font-body text-brown-light">Loading order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <p className="font-body text-error mb-4">
            {error || "Order not found."}
          </p>
          <Link
            to="/orders"
            className="text-brand-red font-body font-semibold hover:underline"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);
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
    <div className="bg-brand-cream min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Banner */}
        {justPlaced && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-success/10 border border-success/30 rounded-xl p-5 mb-6 flex items-center gap-3"
          >
            <PartyPopper size={24} className="text-success flex-shrink-0" />
            <div>
              <p className="font-body font-semibold text-success">
                Order placed successfully!
              </p>
              <p className="font-body text-sm text-brown-light mt-0.5">
                We've received your order and will start preparing it shortly.
              </p>
            </div>
          </motion.div>
        )}

        <Link
          to="/orders"
          className="flex items-center gap-2 font-body text-sm text-brand-red font-semibold hover:underline underline-offset-4 mb-6 w-fit"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
            <h1 className="font-display text-3xl text-brand-brown font-bold">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <Badge status={order.status} />
          </div>
          <p className="font-body text-brown-light mb-8">Placed on {date}</p>

          {/* Status Tracker */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between relative">
              {STATUS_STEPS.map((step, i) => (
                <div
                  key={step}
                  className="flex-1 flex flex-col items-center relative z-10"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center mb-2
                      ${i <= currentStepIndex ? "bg-brand-red text-white" : "bg-cream-dark text-brown-muted"}`}
                  >
                    {i <= currentStepIndex ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </div>
                  <span
                    className={`font-body text-xs text-center ${i <= currentStepIndex ? "text-brand-brown font-semibold" : "text-brown-muted"}`}
                  >
                    {step}
                  </span>
                </div>
              ))}
              {/* Connecting line */}
              <div className="absolute top-[18px] left-0 right-0 h-0.5 bg-cream-dark -z-0">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-brand-red"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Items */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-lg text-brand-brown font-semibold mb-4">
                Items Ordered
              </h2>
              <div className="flex flex-col gap-3">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between font-body text-sm"
                  >
                    <span className="text-brown-light">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-brand-brown font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-dark mt-4 pt-4 flex flex-col gap-2 font-body text-sm">
                <div className="flex justify-between text-brown-light">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-brown-light">
                  <span>Delivery</span>
                  <span>₹{order.deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-brand-brown text-base pt-1">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-lg text-brand-brown font-semibold mb-4">
                Delivery Information
              </h2>
              <div className="flex flex-col gap-3 font-body text-sm">
                <div>
                  <p className="text-brown-muted text-xs mb-1">Name</p>
                  <p className="text-brand-brown">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-brown-muted text-xs mb-1">Phone</p>
                  <p className="text-brand-brown">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-brown-muted text-xs mb-1">Address</p>
                  <p className="text-brand-brown">{order.deliveryAddress}</p>
                </div>
                <div>
                  <p className="text-brown-muted text-xs mb-1">Payment</p>
                  <p className="text-brand-brown">
                    Test Payment · {order.paymentId?.slice(0, 14)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
