import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold mb-3">HOC</h3>
          <p className="font-body text-sm text-brown-muted leading-relaxed">
            House of Cakes — Bijainagar's favourite bakery & café. Baked fresh,
            delivered with love.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-widest mb-4 text-brown-muted">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-body text-sm text-brand-cream hover:text-brand-red transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-widest mb-4 text-brown-muted">
            Find Us
          </h4>
          <div className="flex flex-col gap-2 font-body text-sm text-brand-cream">
            <p>📍 Bijainagar, Rajasthan</p>
            <p>🕐 Open Daily: 8am – 10pm</p>
            <p>📱 Instagram: @houseofcakes</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brown-light px-4 py-4 text-center">
        <p className="font-body text-xs text-brown-muted">
          © 2025 House of Cakes, Bijainagar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
