import React from 'react';
import { motion } from 'framer-motion';

const reels = [
  { id: 1, src: '/assets/reels/reel-1.mp4' },
  { id: 2, src: '/assets/reels/reel-2.mp4' },
  { id: 3, src: '/assets/reels/reel-3.mp4' },
  { id: 4, src: '/assets/reels/reel-4.mp4' },
  { id: 5, src: '/assets/reels/reel-5.mp4' },
  { id: 6, src: '/assets/reels/reel-6.mp4' },
  { id: 7, src: '/assets/reels/reel-7.mp4' },
  { id: 8, src: '/assets/reels/reel-8.mp4' },
] as const;

const offsets = [
  { y: 12, r: -6 },
  { y: 2, r: -2 },
  { y: 16, r: 3 },
  { y: 6, r: 0 },
  { y: 18, r: -3 },
  { y: 4, r: 2 },
  { y: 14, r: 6 },
  { y: 8, r: 1 },
] as const;

export default function VideoReel() {
  return (
    <section id="reels" className="relative overflow-hidden bg-[#f6f1e8] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0d6a8] px-4 py-1.5 text-[11px] font-mono tracking-widest uppercase text-foreground/70 shadow-sm">
            Join over <span className="font-semibold text-foreground">500+</span> happy clients
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-sans font-semibold tracking-tight text-foreground leading-[1.05]">
            Engage Audiences
            <br />
            with Stunning Videos
          </h2>
          <p className="mt-4 text-sm md:text-base text-foreground/55 max-w-xl mx-auto">
            Boost your brand with high-impact short videos from real glam sessions — bridal, party, and studio looks.
          </p>

          <div className="hidden md:block absolute right-4 top-20 text-[11px] text-foreground/50">
            <div className="font-serif italic">Elevate</div>
            <div className="font-serif italic -mt-0.5">your brand</div>
            <svg width="70" height="36" viewBox="0 0 70 36" fill="none" className="mt-1 opacity-70">
              <path d="M2 6c22 0 23 26 50 26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M52 32l10-2-6-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>

        <div className="mt-12 md:mt-14 relative">
          <div className="-mx-6 px-6 overflow-x-auto">
            <div className="flex gap-4 md:gap-6 items-end min-w-max py-2">
              {reels.map((reel, i) => {
                const o = offsets[i % offsets.length];
                return (
                  <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.05 }}
                    className="shrink-0"
                  >
                    <div style={{ transform: `translateY(${o.y}px) rotate(${o.r}deg)` }}>
                      <div className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] aspect-[9/16] rounded-[28px] overflow-hidden bg-black shadow-xl shadow-black/20 ring-1 ring-black/10">
                      <video
                        src={reel.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.instagram.com/glam_byharini"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-full bg-[#e9897c] px-10 py-3 text-xs font-mono tracking-widest uppercase text-white shadow-lg shadow-black/10"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-white/60" />
              <span className="relative">View More on Instagram</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
