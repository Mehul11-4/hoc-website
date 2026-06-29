import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-brand-brown text-brand-cream sticky top-0 z-50 shadow-brand">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-2xl font-bold text-brand-cream tracking-wide"
        >
          HOC
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

        {/* Right Side — Cart + Login */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/cart"
            className="font-body text-sm text-brand-cream hover:text-brand-red transition-colors duration-200"
          >
            🛒 Cart
          </Link>
          <Link
            to="/login"
            className="bg-brand-red text-white font-body text-sm font-medium px-4 py-2 rounded-md hover:bg-red-hover transition-colors duration-200"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-brand-cream text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
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
            className="font-body text-sm text-brand-cream"
          >
            🛒 Cart
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-brand-red text-white font-body text-sm font-medium px-4 py-2 rounded-md text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
