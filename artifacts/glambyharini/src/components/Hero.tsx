import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] w-full bg-[#FAF7F4] overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #c9a9a0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Decorative circle badge — desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden md:flex absolute top-20 right-[38%] w-24 h-24 rounded-full border border-primary/30 items-center justify-center z-20"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex flex-col items-center justify-center text-center p-1">
          <Star size={10} className="text-primary mb-0.5" />
          <p className="font-mono text-[7px] leading-tight text-primary/80 tracking-wider uppercase text-center">Certified<br />Artist</p>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-0 w-full md:min-h-[100dvh] md:items-center">

          {/* ── MOBILE: Image on top ── */}
          <div className="block md:hidden w-full pt-24 pb-4">
            <div className="relative w-full h-[55vw] max-h-[300px] flex items-end justify-center">
              {/* Blob */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-[80%] h-[90%] rounded-[40%_60%_60%_40%/40%_40%_60%_60%] bg-primary/15" />
              </div>
              <img
                src="/assets/hero_model.png"
                alt="GlamByHarini — Makeup Artistry"
                className="relative z-10 h-full w-auto object-contain object-bottom"
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #FAF7F4 0%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* ── LEFT — Content ── */}
          <div className="flex flex-col justify-center pb-10 md:pb-0 md:py-24">

            {/* Promo badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-2 mb-6 w-fit shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary/80">
                Certified Makeup Artist · Tamil Nadu
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-[clamp(2.2rem,6vw,5rem)] leading-[1.08] text-foreground mb-5">
                Step into Your<br />
                <span className="italic text-primary">Most Beautiful</span><br />
                Self
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-muted-foreground leading-relaxed mb-8 max-w-sm text-base"
            >
              Luxury bridal & editorial makeup artistry by Harini Suresh — where every look is a masterpiece crafted just for you.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo('#booking')}
                className="flex items-center gap-3 bg-foreground text-background px-7 py-3.5 font-mono text-xs tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300 rounded-none shadow-lg"
              >
                Book Now
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => scrollTo('#gallery')}
                className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground pb-0.5"
              >
                View Gallery →
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-foreground/10"
            >
              {[
                { val: '500+', label: 'Happy Clients' },
                { val: '5+', label: 'Years Exp' },
                { val: 'TBIEA', label: 'Certified' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-xl text-foreground">{s.val}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Photo (desktop only) ── */}
          <div className="hidden md:flex relative items-end justify-center h-[90vh]">
            {/* Blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-4 w-[85%] h-[95%] rounded-[40%_60%_60%_40%/40%_40%_60%_60%] bg-primary/15"
            />
            <div className="absolute bottom-10 right-14 w-[70%] h-[80%] rounded-full bg-accent/10 blur-2xl" />

            <motion.img
              src="/assets/hero_model.png"
              alt="GlamByHarini — Makeup Artistry"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 h-full w-auto object-contain object-bottom"
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #FAF7F4 0%, transparent 100%)' }}
            />

            {/* Floating stat card — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-16 left-0 glass-panel px-5 py-4 shadow-xl z-30"
            >
              <div className="font-serif text-2xl text-primary">500+</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">Transformations</div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-foreground/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 bg-foreground/15"
        />
      </motion.div>
    </section>
  );
}
