import { Wheat, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO STRIP ── */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/cake2.webp"
          alt="HOC Bakery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-brown/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <span className="font-body text-brand-cream text-sm font-semibold uppercase tracking-widest">
            Our Journey
          </span>
          <h1 className="font-display text-5xl text-white font-bold mt-3">
            The Story Behind HOC
          </h1>
        </motion.div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-brand-cream py-20">
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
              alt="HOC bakery interior"
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
              How It Started
            </span>
            <h2 className="font-display text-4xl text-brand-brown font-bold leading-tight">
              A Small Bakery,
              <br />A Big Passion
            </h2>
            <p className="font-body text-brown-light text-base leading-relaxed">
              HOC — House of Cakes began in Bijainagar, Rajasthan, with a simple
              idea: bring genuinely fresh, handcrafted cakes and desserts to a
              town that deserved better than store-bought, mass-produced sweets.
            </p>
            <p className="font-body text-brown-light text-base leading-relaxed">
              What started as a small kitchen experiment has grown into a full
              bakery and café, loved by families celebrating birthdays,
              anniversaries, weddings, and everyday cravings alike. Every cake
              that leaves our kitchen is made by hand, decorated with care, and
              baked fresh — never frozen, never rushed.
            </p>
            <p className="font-body text-brown-light text-base leading-relaxed">
              Today, HOC is proud to be Bijainagar's go-to destination for
              celebration cakes, pastries, and café favourites — and this
              website is the next step in making that experience even easier for
              our customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="bg-brand-brown py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl text-brand-cream text-center font-bold mb-12"
          >
            What We Stand For
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
                icon: Wheat,
                title: "Fresh Ingredients",
                desc: "We never compromise on quality — only the freshest, finest ingredients go into every creation.",
              },
              {
                icon: Heart,
                title: "Made With Love",
                desc: "Every cake is handcrafted with genuine care and attention to detail, not mass-produced.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "HOC is proud to be part of Bijainagar — celebrating every milestone with our neighbours.",
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
            Ready to Taste the Difference?
          </h2>
          <p className="font-body text-white text-lg mb-8 opacity-90">
            Explore our full menu and order your favourites today.
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
