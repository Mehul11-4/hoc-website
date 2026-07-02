import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, LayoutDashboard } from "lucide-react";
import { getAllOrders, updateOrderStatus } from "../firebase/firestore";
import Badge from "../components/Badge";

const STATUS_OPTIONS = ["Placed", "Preparing", "Out for Delivery", "Delivered"];
const FILTER_OPTIONS = ["All", ...STATUS_OPTIONS];

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Could not load orders right now.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      console.error(err);
      alert("Could not update order status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status !== "Delivered").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
            <LayoutDashboard size={20} className="text-brand-red" />
          </div>
          <h1 className="font-display text-3xl text-brand-brown font-bold">
            Admin Dashboard
          </h1>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Package} label="Total Orders" value={stats.total} />
          <StatCard icon={Clock} label="Pending" value={stats.pending} />
          <StatCard
            icon={CheckCircle2}
            label="Delivered"
            value={stats.delivered}
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
                ${
                  activeFilter === f
                    ? "bg-brand-red text-white shadow-sm"
                    : "bg-white text-brand-brown hover:bg-cream-dark"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {loading && (
          <p className="font-body text-brown-light text-center py-12">
            Loading orders...
          </p>
        )}
        {error && (
          <p className="font-body text-error text-center py-12">{error}</p>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cream-dark">
                    <th className="text-left font-body text-xs font-semibold text-brown-muted uppercase tracking-wide px-5 py-4">
                      Order ID
                    </th>
                    <th className="text-left font-body text-xs font-semibold text-brown-muted uppercase tracking-wide px-5 py-4">
                      Customer
                    </th>
                    <th className="text-left font-body text-xs font-semibold text-brown-muted uppercase tracking-wide px-5 py-4">
                      Total
                    </th>
                    <th className="text-left font-body text-xs font-semibold text-brown-muted uppercase tracking-wide px-5 py-4">
                      Status
                    </th>
                    <th className="text-left font-body text-xs font-semibold text-brown-muted uppercase tracking-wide px-5 py-4">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/30 transition-colors"
                    >
                      <td className="px-5 py-4 font-body text-sm text-brand-brown">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-brown-light">
                        {order.customerName}
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-brand-brown font-medium">
                        ₹{order.total}
                      </td>
                      <td className="px-5 py-4">
                        <Badge status={order.status} />
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          disabled={updatingId === order.id}
                          className="font-body text-sm border border-brown-muted rounded-md px-3 py-1.5 outline-none focus:border-brand-red transition-colors disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <p className="text-center font-body text-brown-light py-12">
                No orders found for this filter.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-brand-red" />
      </div>
      <div>
        <p className="font-body text-2xl text-brand-brown font-bold">{value}</p>
        <p className="font-body text-xs text-brown-muted">{label}</p>
      </div>
    </div>
  );
}
