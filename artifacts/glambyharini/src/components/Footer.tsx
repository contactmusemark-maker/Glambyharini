import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/glam_byharini/';
const WHATSAPP_URL = 'https://wa.me/917305306497';

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

      <div className="container relative z-10 pb-10 pt-20">
        <div className="mb-16 grid gap-10 md:grid-cols-4 md:gap-12">

          {/* Brand with logo image */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/footer_logo.png"
                alt="GlamByHarini"
                className="h-14 w-auto mb-6 object-contain object-left"
              />
              <p className="text-white/50 leading-relaxed max-w-xs mb-6 text-sm">
                Crafting Beauty, One Look at a Time. Certified makeup artistry rooted in passion, precision, and the belief that every person deserves to feel extraordinary.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-primary hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[#25D366]"
                  aria-label="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 hover:text-[#25D366] transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
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
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-colors font-sans text-sm">
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
                  className="min-h-11 w-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors placeholder:text-white/20 focus:border-primary focus:outline-none"
                />
                {subscribed ? (
                  <span className="text-primary font-mono text-xs tracking-wider">Subscribed. Thank you.</span>
                ) : (
                  <button type="submit" className="min-h-11 bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent">
                    Subscribe
                  </button>
                )}
              </form>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <Instagram size={13} className="text-primary shrink-0" />
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    @glam_byharini
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="font-mono text-xs tracking-wider text-white/25">
            &copy; 2025 GlamByHarini. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wider text-white/20">
            Harini Suresh - Certified Makeup Artist, Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
