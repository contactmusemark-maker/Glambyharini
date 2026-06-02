import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blogs', href: '#blogs' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 w-full max-w-full transition-all duration-500 ${scrolled ? 'py-2 glass-panel' : 'py-4 bg-transparent md:py-6'}`}>
      <div className="container flex items-center justify-between gap-4 md:gap-8">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="flex min-w-0 items-center gap-3">
          <img src="/assets/Header_Logo_1779783577490.png" alt="GlamByHarini Logo" className="h-10 w-auto sm:h-12" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden min-w-0 flex-wrap items-center justify-end gap-x-4 gap-y-2 md:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            className="text-xs font-mono tracking-widest uppercase transition-colors hover:text-primary lg:text-sm"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => scrollTo('#booking')}
            className="min-h-11 shrink-0 bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent lg:px-6 lg:text-sm"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-foreground md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full flex max-h-[calc(100dvh-4.5rem)] w-full max-w-full flex-col items-stretch gap-2 overflow-y-auto border-b border-border bg-background/95 px-4 py-5 shadow-xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="flex min-h-11 w-full items-center justify-center rounded-xl text-lg font-serif text-foreground transition-colors hover:bg-secondary/40 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => scrollTo('#booking')}
              className="min-h-11 w-full max-w-xs bg-primary px-8 py-3 font-serif tracking-wide text-primary-foreground"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
