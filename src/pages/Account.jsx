import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Check,
  X,
  Package,
} from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import { getUserOrders } from "../firebase/firestore";
import OrderCard from "../components/OrderCard";

export default function Account() {
  const { currentUser, userProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [form, setForm] = useState({
    name: userProfile?.name || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address || "",
  });

  useEffect(() => {
    if (userProfile) {
      setForm({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
      });
    }
  }, [userProfile]);

  useEffect(() => {
    async function fetchRecentOrders() {
      try {
        const orders = await getUserOrders(currentUser.uid);
        setRecentOrders(orders.slice(0, 3)); // just the 3 most recent
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    }
    if (currentUser) fetchRecentOrders();
  }, [currentUser]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      });
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setForm({
      name: userProfile?.name || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
    });
    setEditing(false);
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl text-brand-brown font-bold mb-8"
        >
          My Account
        </motion.h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-brand-brown font-semibold">
              Profile Details
            </h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 text-brand-red font-body text-sm font-semibold hover:underline underline-offset-4"
              >
                <Edit2 size={15} />
                Edit
              </button>
            )}
          </div>

          {!editing ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-brown-muted flex-shrink-0" />
                <span className="font-body text-sm text-brand-brown">
                  {userProfile?.name || "—"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-brown-muted flex-shrink-0" />
                <span className="font-body text-sm text-brand-brown">
                  {currentUser?.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-brown-muted flex-shrink-0" />
                <span className="font-body text-sm text-brand-brown">
                  {userProfile?.phone || "—"}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-brown-muted flex-shrink-0 mt-0.5"
                />
                <span className="font-body text-sm text-brand-brown">
                  {userProfile?.address || "No address saved yet"}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-muted"
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-brown-muted focus:border-brand-red outline-none font-body text-sm transition-colors"
                />
              </div>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-muted"
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-brown-muted focus:border-brand-red outline-none font-body text-sm transition-colors"
                />
              </div>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3 text-brown-muted"
                />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Delivery Address"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-brown-muted focus:border-brand-red outline-none font-body text-sm transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 bg-brand-red text-white font-body text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-red-hover transition-all duration-200 disabled:opacity-60"
                >
                  <Check size={16} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 border-2 border-brown-muted text-brown-light font-body text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-cream-dark transition-all duration-200"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-brand-brown font-semibold flex items-center gap-2">
              <Package size={20} />
              Recent Orders
            </h2>
            <Link
              to="/orders"
              className="text-brand-red font-body text-sm font-semibold hover:underline underline-offset-4"
            >
              View All →
            </Link>
          </div>

          {loadingOrders && (
            <p className="font-body text-brown-light text-sm">Loading...</p>
          )}

          {!loadingOrders && recentOrders.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="font-body text-brown-light text-sm mb-4">
                You haven't placed any orders yet.
              </p>
              <Link
                to="/menu"
                className="text-brand-red font-body text-sm font-semibold hover:underline underline-offset-4"
              >
                Browse Menu →
              </Link>
            </div>
          )}

          {!loadingOrders && recentOrders.length > 0 && (
            <div className="flex flex-col gap-3">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
