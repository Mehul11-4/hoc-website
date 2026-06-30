import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu as MenuIcon, X, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { logOut } from "../firebase/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const { itemCount, justAdded, clearJustAdded } = useCart();

  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => clearJustAdded(), 400);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  async function handleLogout() {
    await logOut();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <nav className="bg-brand-brown text-brand-cream sticky top-0 z-50 shadow-brand">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center overflow-hidden h-14 w-14 rounded-full bg-white"
        >
          <img
            src="/images/logo.jpg"
            alt="HOC - House of Cakes"
            className="h-full w-full object-cover scale-150"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-sm font-medium transition-colors duration-200 hover:text-brand-red
                ${isActive(link.path) ? "text-brand-red" : "text-brand-cream"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side — Cart + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 font-body text-sm text-brand-cream hover:text-brand-red transition-colors duration-200"
          >
            <motion.div
              animate={justAdded ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <ShoppingCart size={18} />
            </motion.div>
            Cart
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-3 bg-brand-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-brown-light text-brand-cream font-body text-sm font-medium px-4 py-2 rounded-md hover:bg-brand-red transition-colors duration-200"
              >
                <User size={16} />
                {userProfile?.name?.split(" ")[0] || "Account"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden">
                  <Link
                    to="/account"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-body text-brand-brown hover:bg-cream-dark transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-body text-brand-brown hover:bg-cream-dark transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm font-body text-error hover:bg-red-soft transition-colors"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-brand-red text-white font-body text-sm font-medium px-4 py-2 rounded-md hover:bg-red-hover transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-brand-cream"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <MenuIcon size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-brown px-4 pb-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`font-body text-sm font-medium transition-colors duration-200
                ${isActive(link.path) ? "text-brand-red" : "text-brand-cream"}`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 font-body text-sm text-brand-cream"
          >
            <ShoppingCart size={18} />
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm text-brand-cream"
              >
                My Account
              </Link>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm text-brand-cream"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-body text-sm text-error text-left"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-brand-red text-white font-body text-sm font-medium px-4 py-2 rounded-md text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
