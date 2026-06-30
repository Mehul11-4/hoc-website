import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { signUp, logIn } from "../firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (form.name.trim().length < 2) {
          throw new Error("Please enter your full name.");
        }
        if (form.password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }
        await signUp(
          form.name.trim(),
          form.email.trim(),
          form.password,
          form.phone.trim(),
        );
      } else {
        await logIn(form.email.trim(), form.password);
      }
      navigate("/");
    } catch (err) {
      setError(friendlyError(err.code || err.message));
    } finally {
      setLoading(false);
    }
  }

  // Convert Firebase error codes into beginner-friendly messages
  function friendlyError(code) {
    if (code.includes("email-already-in-use"))
      return "An account with this email already exists.";
    if (code.includes("invalid-email"))
      return "Please enter a valid email address.";
    if (code.includes("weak-password"))
      return "Password must be at least 6 characters.";
    if (code.includes("user-not-found") || code.includes("invalid-credential"))
      return "Incorrect email or password.";
    if (code.includes("wrong-password")) return "Incorrect email or password.";
    if (code.includes("too-many-requests"))
      return "Too many attempts. Please try again later.";
    return code || "Something went wrong. Please try again.";
  }

  return (
    <div className="min-h-[calc(100vh-200px)] bg-brand-cream flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-brand overflow-hidden">
        {/* Left panel — desktop only */}
        <div className="hidden md:flex flex-col justify-center items-center bg-brand-brown p-10 text-center">
          <img
            src="/images/logo.jpg"
            alt="HOC"
            className="h-20 w-20 rounded-full object-cover scale-150 mb-6"
          />
          <h2 className="font-display text-2xl text-brand-cream font-bold">
            Welcome to HOC
          </h2>
          <p className="font-body text-brown-muted text-sm mt-3 max-w-xs">
            Sign in to order your favourite cakes, pastries, and treats — fresh
            from Bijainagar.
          </p>
        </div>

        {/* Right panel — form */}
        <div className="p-8 md:p-10">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-cream-dark rounded-lg p-1">
            <button
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 rounded-md font-body text-sm font-semibold transition-all duration-200
                ${mode === "login" ? "bg-brand-red text-white" : "text-brown-light"}`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-2 rounded-md font-body text-sm font-semibold transition-all duration-200
                ${mode === "signup" ? "bg-brand-red text-white" : "text-brown-light"}`}
            >
              Sign Up
            </button>
          </div>

          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <h1 className="font-display text-2xl text-brand-brown font-bold mb-1">
              {mode === "login" ? "Welcome Back" : "Create Your Account"}
            </h1>

            {error && (
              <div className="bg-red-soft text-error text-sm font-body px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {mode === "signup" && (
              <>
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
              </>
            )}

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-muted"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-brown-muted focus:border-brand-red outline-none font-body text-sm transition-colors"
              />
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-muted"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-3 rounded-sm border border-brown-muted focus:border-brand-red outline-none font-body text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-brand-red text-white font-body font-semibold py-3 rounded-md hover:bg-red-hover transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Log In"
                  : "Create Account"}
            </button>

            <p className="text-center font-body text-sm text-brown-light mt-2">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                }}
                className="text-brand-red font-semibold hover:underline"
              >
                {mode === "login" ? "Sign Up" : "Log In"}
              </button>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
