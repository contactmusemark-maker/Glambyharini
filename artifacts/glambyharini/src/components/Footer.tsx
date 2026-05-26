import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

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
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/Footer_Logo_1779783577490.png"
                alt="GlamByHarini"
                className="h-16 w-auto mb-6 brightness-0 invert"
              />
              <p className="text-background/70 leading-relaxed max-w-xs mb-6">
                Crafting Beauty, One Look at a Time. Certified makeup artistry rooted in passion, precision, and the belief that every person deserves to feel extraordinary.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/70 hover:text-primary hover:border-primary transition-colors"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-background/40 mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-background/70 hover:text-primary transition-colors font-sans text-sm"
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
                    className="text-background/70 hover:text-primary transition-colors font-sans text-sm"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-background/40 mb-6">Newsletter</h4>
              <p className="text-background/60 text-sm mb-4">
                Beauty tips, seasonal offers, and artistry inspiration — delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-background/10 border border-background/20 px-4 py-2 text-background placeholder:text-background/40 text-sm focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-newsletter-email"
                />
                {subscribed ? (
                  <span className="text-primary font-mono text-xs tracking-wider">Thank you for subscribing.</span>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors"
                    data-testid="button-newsletter-subscribe"
                  >
                    Subscribe
                  </button>
                )}
              </form>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-background/60 text-sm">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3 text-background/60 text-sm">
                  <Instagram size={14} className="text-primary shrink-0" />
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    @glam_byharini
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-wider text-background/40">
            &copy; 2025 GlamByHarini. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wider text-background/30">
            Harini Suresh &mdash; Certified Makeup Artist
          </p>
        </div>
      </div>
    </footer>
  );
}
