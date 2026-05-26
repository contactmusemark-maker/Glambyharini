import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section id="hero" className="relative h-[100dvh] w-full bg-[#F5F0EB] overflow-hidden flex flex-col">
      {/* Minimal top bar metadata */}
      <div className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40"
        >
          Certified Makeup Artist
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40"
        >
          Tamil Nadu · Est. 2019
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40 hidden md:block"
        >
          500+ Transformations
        </motion.span>
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 items-end px-8 md:px-16 pb-12">
        {/* LEFT — Giant editorial text */}
        <div className="relative flex flex-col justify-end pb-0 md:pb-16 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-sans font-black text-[clamp(5rem,14vw,11rem)] leading-[0.88] tracking-tight text-foreground uppercase">
              Glam
            </h1>
            <h1 className="font-sans font-black text-[clamp(5rem,14vw,11rem)] leading-[0.88] tracking-tight text-foreground/10 uppercase -mt-2">
              By
            </h1>
            <h1 className="font-sans font-black text-[clamp(5rem,14vw,11rem)] leading-[0.88] tracking-tight text-foreground uppercase -mt-2">
              Harini
            </h1>
          </motion.div>

          {/* Bottom left descriptors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col gap-1 max-w-xs"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40 leading-relaxed">
              Luxury Bridal & Editorial Makeup
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40 leading-relaxed">
              HD · Airbrush · Hair Styling
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 flex items-center gap-6"
          >
            <button
              onClick={() => scrollTo('#booking')}
              className="flex items-center gap-3 bg-foreground text-background px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300"
            >
              Book Now
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => scrollTo('#gallery')}
              className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors underline underline-offset-4"
            >
              View Gallery
            </button>
          </motion.div>
        </div>

        {/* RIGHT — Photo with accent block */}
        <div className="relative flex items-end justify-center md:justify-end order-1 md:order-2 h-[55vw] md:h-full">
          {/* Accent color block behind photo */}
          <motion.div
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute bottom-0 right-0 md:right-8 w-[75%] md:w-[80%] h-[90%] bg-primary/25"
          />
          <motion.img
            src="/assets/harini/harini_portrait.png"
            alt="Harini Suresh"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="relative z-10 h-full max-h-[75vh] md:max-h-[88vh] w-auto object-contain object-bottom drop-shadow-2xl"
          />

          {/* Floating stat top-right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute top-8 right-0 md:right-8 text-right"
          >
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-foreground/30 mb-1">TBIEA</div>
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-foreground/30">Certified · 2026</div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-foreground/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
}
