import { MapPin, Phone, Clock, AtSign } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="overflow-x-hidden bg-brand-cream">
      {/* ── PAGE HEADER ── */}
      <section className="py-16 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-brand-red text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="font-display text-5xl text-brand-brown font-bold mt-3">
            Find Us
          </h1>
          <p className="font-body text-brown-light text-lg mt-4 max-w-xl mx-auto">
            Have a question or want to place a custom order? Reach out — we'd
            love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* ── CONTACT INFO + MAP ── */}
      <section className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={22} className="text-brand-red" strokeWidth={1.75} />
            </div>{" "}
            <div>
              <h3 className="font-display text-lg text-brand-brown font-semibold">
                Address
              </h3>
              <p className="font-body text-brown-light text-sm mt-1">
                Bijainagar, Rajasthan, India
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
              <Phone size={22} className="text-brand-red" strokeWidth={1.75} />
            </div>{" "}
            <div>
              <h3 className="font-display text-lg text-brand-brown font-semibold">
                Phone
              </h3>
              <p className="font-body text-brown-light text-sm mt-1">
                +91 XXXXX XXXXX
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
              <Clock size={22} className="text-brand-red" strokeWidth={1.75} />
            </div>{" "}
            <div>
              <h3 className="font-display text-lg text-brand-brown font-semibold">
                Hours
              </h3>
              <p className="font-body text-brown-light text-sm mt-1">
                Open Daily: 8:00 AM – 10:00 PM
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
              <AtSign size={22} className="text-brand-red" strokeWidth={1.75} />
            </div>{" "}
            <div>
              <h3 className="font-display text-lg text-brand-brown font-semibold">
                Instagram
              </h3>
              <p className="font-body text-brown-light text-sm mt-1">
                @houseofcakes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-brand h-[400px] md:h-full min-h-[400px]"
        >
          <iframe
            title="HOC Location Map"
            src="https://www.google.com/maps?q=Bijainagar,Rajasthan&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </div>
  );
}
