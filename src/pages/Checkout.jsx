import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  User,
  Phone,
  Check,
  CreditCard,
  Home,
  Edit3,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../firebase/firestore";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function Checkout() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();

  const [step, setStep] = useState(1); // 1 = address, 2 = review, 3 = processing
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: userProfile?.name || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address || "",
  });
  const [useNewAddress, setUseNewAddress] = useState(!userProfile?.address);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddressSubmit(e) {
    e.preventDefault();
    if (useNewAddress || !userProfile?.address) {
      if (
        form.name.trim().length < 2 ||
        form.phone.trim().length < 10 ||
        form.address.trim().length < 10
      ) {
        setError("Please fill in all fields correctly.");
        return;
      }
    } else {
      setForm({
        name: userProfile.name,
        phone: userProfile.phone,
        address: userProfile.address,
      });
    }
    setError("");
    setStep(2);
  }

  function handlePayment() {
    setProcessing(true);
    setError("");

    const options = {
      key: RAZORPAY_KEY,
      amount: total * 100, // Razorpay expects paise, not rupees
      currency: "INR",
      name: "House of Cakes",
      description: `Order for ${form.name}`,
      image: "/images/logo.jpg",
      handler: async function (response) {
        // Payment succeeded — save the order to Firestore
        try {
          const orderData = {
            userId: currentUser.uid,
            customerName: form.name,
            customerPhone: form.phone,
            deliveryAddress: form.address,
            items: items.map((i) => ({
              itemId: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
            })),
            subtotal,
            deliveryFee,
            total,
            paymentId: response.razorpay_payment_id,
            paymentStatus: "paid",
          };

          const orderId = await createOrder(orderData);
          clearCart();
          navigate(`/orders/${orderId}`, { state: { justPlaced: true } });
        } catch (err) {
          console.error(err);
          setError(
            "Payment succeeded but we could not save your order. Please contact support.",
          );
          setProcessing(false);
        }
      },
      prefill: {
        name: form.name,
        contact: form.phone,
        email: currentUser?.email || "",
      },
      theme: {
        color: "#D9242A",
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-display text-3xl text-brand-brown font-bold mb-4">
            Your cart is empty
          </h1>
          <Link
            to="/menu"
            className="text-brand-red font-body font-semibold hover:underline"
          >
            Browse Menu →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[
            { num: 1, label: "Address" },
            { num: 2, label: "Review & Pay" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold
                    ${step >= s.num ? "bg-brand-red text-white" : "bg-white text-brown-muted"}`}
                >
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span
                  className={`font-body text-sm font-medium ${step >= s.num ? "text-brand-brown" : "text-brown-muted"}`}
                >
                  {s.label}
                </span>
              </div>
              {i === 0 && <div className="w-12 h-px bg-brown-muted" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1 — Address */}
              {step === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleAddressSubmit}
                  className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4"
                >
                  <h2 className="font-display text-xl text-brand-brown font-semibold mb-2">
                    Delivery Details
                  </h2>

                  {error && (
                    <div className="bg-red-soft text-error text-sm font-body px-4 py-3 rounded-md">
                      {error}
                    </div>
                  )}

                  {userProfile?.address && !useNewAddress && (
                    <div className="border-2 border-brand-red rounded-lg p-4 flex items-start gap-3">
                      <Home
                        size={20}
                        className="text-brand-red flex-shrink-0 mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="font-body text-sm font-semibold text-brand-brown">
                          Saved Address
                        </p>
                        <p className="font-body text-sm text-brown-light mt-1">
                          {userProfile.name} · {userProfile.phone}
                        </p>
                        <p className="font-body text-sm text-brown-light">
                          {userProfile.address}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUseNewAddress(true)}
                        className="text-brand-red flex-shrink-0"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  )}

                  {(useNewAddress || !userProfile?.address) && (
                    <>
                      {userProfile?.address && (
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(false)}
                          className="text-brand-red font-body text-sm font-semibold text-left hover:underline underline-offset-4 w-fit"
                        >
                          ← Use saved address instead
                        </button>
                      )}

                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-muted"
                        />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={form.name}
                          onChange={handleChange}
                          required
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
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{10}"
                          title="Enter a 10-digit phone number"
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
                          placeholder="Full Delivery Address"
                          value={form.address}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-sm border border-brown-muted focus:border-brand-red outline-none font-body text-sm transition-colors resize-none"
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="bg-brand-red text-white font-body font-semibold py-3 rounded-md hover:bg-red-hover transition-all duration-200 mt-2"
                  >
                    Continue to Review →
                  </button>
                </motion.form>
              )}

              {/* STEP 2 — Review & Pay */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-5"
                >
                  <h2 className="font-display text-xl text-brand-brown font-semibold">
                    Review Your Order
                  </h2>

                  {error && (
                    <div className="bg-red-soft text-error text-sm font-body px-4 py-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="bg-cream-dark rounded-lg p-4">
                    <h3 className="font-body text-sm font-semibold text-brand-brown mb-2">
                      Delivering To
                    </h3>
                    <p className="font-body text-sm text-brown-light">
                      {form.name} · {form.phone}
                    </p>
                    <p className="font-body text-sm text-brown-light mt-1">
                      {form.address}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-body text-sm font-semibold text-brand-brown mb-3">
                      Items ({items.length})
                    </h3>
                    <div className="flex flex-col gap-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
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
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-brand-brown text-brand-brown font-body font-semibold py-3 rounded-md hover:bg-brand-brown hover:text-white transition-all duration-200"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className="flex-[2] flex items-center justify-center gap-2 bg-brand-red text-white font-body font-semibold py-3 rounded-md hover:bg-red-hover transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CreditCard size={18} />
                      {processing ? "Processing..." : `Pay ₹${total}`}
                    </button>
                  </div>

                  <p className="text-center font-body text-xs text-brown-muted">
                    This is a test payment — no real money will be charged.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary — always visible */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-24"
          >
            <h2 className="font-display text-lg text-brand-brown font-semibold mb-4">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2 font-body text-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-brown-light"
                >
                  <span className="truncate pr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="flex-shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-cream-dark mt-2 pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-brown-light">
                  <span>Items Total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-brown-light">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-brown-light">
                  <span>Handling Fee</span>
                  <span>₹0</span>
                </div>
              </div>
              <div className="border-t border-cream-dark pt-3 flex justify-between font-bold text-brand-brown text-base">
                <span>Grand Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
