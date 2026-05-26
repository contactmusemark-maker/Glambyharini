import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/glam_byharini/';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Book Now', href: '#booking' },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0d0d0d] text-white/80 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/8 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Text-only logo so it always renders correctly */}
              <div className="mb-6">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">Glam By</p>
                <h2 className="font-serif text-4xl md:text-5xl text-white leading-none">Harini</h2>
                <div className="w-12 h-px bg-primary mt-3" />
              </div>
              <p className="text-white/50 leading-relaxed max-w-xs mb-6 text-sm">
                Crafting Beauty, One Look at a Time. Certified makeup artistry rooted in passion, precision, and the belief that every person deserves to feel extraordinary.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors font-mono text-xs tracking-widest uppercase"
              >
                <Instagram size={14} />
                @glam_byharini
              </a>
            </motion.div>
          </div>

          {/* Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-white/50 hover:text-primary transition-colors font-sans text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-primary transition-colors font-sans text-sm"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">Stay in Touch</h4>
              <p className="text-white/40 text-sm mb-4">
                Beauty tips, seasonal offers, and artistry inspiration.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mb-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                {subscribed ? (
                  <span className="text-primary font-mono text-xs tracking-wider">Subscribed. Thank you.</span>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors"
                  >
                    Subscribe
                  </button>
                )}
              </form>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-wider text-white/25">
            &copy; 2025 GlamByHarini. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wider text-white/20">
            Harini Suresh &mdash; Certified Makeup Artist, Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
