import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cake, Truck, Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "../hooks/useCart";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function HomeCartStepper({ item, quantity, onAdd, onIncrease, onDecrease }) {
  if (quantity === 0) {
    return (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-brand-red text-white font-body text-sm font-medium px-4 py-2 rounded-md hover:bg-red-hover transition-all duration-200 hover:scale-105"
      >
        <ShoppingCart size={16} />
        Add
      </button>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 bg-brand-red rounded-md px-2 py-1.5"
    >
      <button
        onClick={onDecrease}
        className="text-white hover:scale-110 transition-transform duration-150 w-5 flex items-center justify-center"
      >
        <Minus size={16} />
      </button>
      <motion.span
        key={quantity}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15 }}
        className="text-white font-body font-semibold text-sm w-4 text-center"
      >
        {quantity}
      </motion.span>
      <button
        onClick={onIncrease}
        className="text-white hover:scale-110 transition-transform duration-150 w-5 flex items-center justify-center"
      >
        <Plus size={16} />
      </button>
    </motion.div>
  );
}

export default function Home() {
  const { addToCart, increaseQuantity, decreaseQuantity, getItemQuantity } =
    useCart();
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="bg-brand-cream min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-body text-brand-red text-sm font-semibold uppercase tracking-widest"
            >
              Bijainagar's Favourite Bakery
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl md:text-6xl text-brand-brown font-bold leading-tight"
            >
              Baked With Love,
              <br />
              <span className="text-brand-red">Delivered</span> To You
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-body text-brown-light text-lg leading-relaxed max-w-md"
            >
              From celebration cakes to everyday treats — HOC brings freshly
              baked happiness right to your door in Bijainagar.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="flex gap-4 flex-wrap"
            >
              <Link
                to="/menu"
                className="bg-brand-red text-white font-body font-semibold px-8 py-3 rounded-md hover:bg-red-hover transition-all duration-200 hover:scale-105"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="border-2 border-brand-brown text-brand-brown font-body font-semibold px-8 py-3 rounded-md hover:bg-brand-brown hover:text-brand-cream transition-all duration-200"
              >
                View Menu
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-brand">
              <img
                src="/images/cake1.webp"
                alt="Beautiful celebration cake from HOC"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="absolute bottom-6 left-6 bg-white rounded-lg px-4 py-3 shadow-lg"
              >
                <p className="font-body text-xs text-brown-light">
                  Fresh Daily
                </p>
                <p className="font-display text-brand-brown font-bold text-sm">
                  100% Handcrafted
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY HOC SECTION ── */}
      <section className="bg-brand-brown py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl text-brand-cream text-center font-bold mb-12"
          >
            Why Choose HOC?
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Cake,
                title: "Baked Fresh Daily",
                desc: "Every cake, pastry, and dessert is made fresh every single day — never frozen, never stale.",
              },
              {
                icon: Truck,
                title: "Fast Local Delivery",
                desc: "Quick delivery across Bijainagar. Order online and get your treats at your door.",
              },
              {
                icon: Star,
                title: "Premium Quality",
                desc: "Only the finest ingredients go into every HOC creation — taste the difference.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="bg-brown-light rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-red/20 flex items-center justify-center mx-auto mb-5">
                    <Icon
                      size={28}
                      className="text-brand-red"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-display text-xl text-brand-cream font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-brown-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── BESTSELLERS SECTION ── */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-body text-brand-red text-sm font-semibold uppercase tracking-widest">
              Customer Favourites
            </span>
            <h2 className="font-display text-4xl text-brand-brown font-bold mt-2">
              Our Most Loved Cakes
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                id: "home-cake1",
                image: "/images/cake1.webp",
                name: "Butterfly Wedding Cake",
                desc: "Elegant white & gold with butterfly toppers",
                price: 1800,
              },
              {
                id: "home-cake2",
                image: "/images/cake2.webp",
                name: "Custom Birthday Cake",
                desc: "Personalised cakes for every occasion",
                price: 1200,
              },
              {
                id: "home-cake3",
                image: "/images/cake3.webp",
                name: "Bear 1st Birthday Cake",
                desc: "Adorable theme cakes for little ones",
                price: 950,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-brand hover:-translate-y-1 transition-all duration-300"
              >
                <div className="overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-brand-brown font-semibold">
                    {item.name}
                  </h3>
                  <p className="font-body text-brown-light text-sm mt-1 mb-4">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-brand-red font-bold text-lg">
                      ₹{item.price}
                    </span>
                    <HomeCartStepper
                      item={item}
                      quantity={getItemQuantity(item.id)}
                      onAdd={() => addToCart(item)}
                      onIncrease={() => increaseQuantity(item.id)}
                      onDecrease={() => decreaseQuantity(item.id)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="font-body text-brand-red font-semibold hover:underline underline-offset-4 text-lg"
            >
              View Full Menu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND STORY STRIP ── */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-xl overflow-hidden shadow-brand"
          >
            <img
              src="/images/cake4.png"
              alt="HOC Bakery"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <span className="font-body text-brand-red text-sm font-semibold uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="font-display text-4xl text-brand-brown font-bold leading-tight">
              Made in Bijainagar,
              <br />
              With Love
            </h2>
            <p className="font-body text-brown-light text-base leading-relaxed">
              HOC — House of Cakes started as a small bakery in the heart of
              Bijainagar, Rajasthan. What began as a passion for baking has
              grown into the town's favourite destination for cakes, pastries,
              desserts, and café delights.
            </p>
            <p className="font-body text-brown-light text-base leading-relaxed">
              Every item on our menu is crafted by hand, baked fresh daily, and
              made with only the finest ingredients — because we believe every
              occasion deserves something truly special.
            </p>
            <Link
              to="/about"
              className="font-body text-brand-red font-semibold hover:underline underline-offset-4 w-fit"
            >
              Read Our Full Story →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-body text-brand-red text-sm font-semibold uppercase tracking-widest">
              Simple & Easy
            </span>
            <h2 className="font-display text-4xl text-brand-brown font-bold mt-2">
              How It Works
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Browse Our Menu",
                desc: "Explore our full menu of cakes, pastries, drinks, and snacks.",
              },
              {
                step: "02",
                title: "Place Your Order",
                desc: "Add items to your cart and check out securely in minutes.",
              },
              {
                step: "03",
                title: "Enjoy Your Treats",
                desc: "We deliver fresh to your door anywhere in Bijainagar.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center shadow-brand">
                  <span className="font-display text-white font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-xl text-brand-brown font-semibold">
                  {item.title}
                </h3>
                <p className="font-body text-brown-light text-sm leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-brand-red py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <h2 className="font-display text-4xl text-white font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="font-body text-white text-lg mb-8 opacity-90">
            Fresh cakes and treats, delivered to your door in Bijainagar.
          </p>
          <Link
            to="/menu"
            className="bg-white text-brand-red font-body font-bold px-10 py-4 rounded-md hover:bg-brand-cream transition-all duration-200 hover:scale-105 inline-block"
          >
            Explore Our Menu
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
