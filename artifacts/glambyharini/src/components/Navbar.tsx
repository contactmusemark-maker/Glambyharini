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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 glass-panel' : 'py-6 bg-transparent'}`}>
      <div className="mx-auto flex w-[90vw] max-w-7xl items-center justify-between gap-8">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="flex items-center gap-3">
          <img src="/assets/Header_Logo_1779783577490.png" alt="GlamByHarini Logo" className="h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden min-w-0 items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-sm font-mono tracking-widest uppercase hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => scrollTo('#booking')}
            className="shrink-0 bg-primary px-6 py-2.5 font-mono text-sm uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl md:hidden flex flex-col items-center py-8 gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-lg font-serif text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => scrollTo('#booking')}
              className="px-8 py-3 bg-primary text-primary-foreground font-serif tracking-wide w-3/4 max-w-xs"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
