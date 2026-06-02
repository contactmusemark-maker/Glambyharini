import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="pt-24 md:pt-40 pb-0 relative overflow-hidden" style={{ backgroundColor: '#0d0d0d' }}>

      <div className="container relative z-10">
        <div className="grid min-w-0 gap-10 md:grid-cols-2 md:items-end lg:gap-16">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative">
              <img
                src="/assets/about_harini.png"
                alt="Harini Suresh — Artist Behind the Brush"
                className="w-full h-auto object-contain block"
                style={{ mixBlendMode: 'screen' }}
              />
              {/* Bottom gradient matching exact section color */}
              <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #0d0d0d 30%, transparent 100%)' }}
              />
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pb-24 md:pb-40 order-1 md:order-2"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              The Artist
            </span>
            <h2 className="mb-6 font-serif text-[clamp(2rem,7vw,3rem)] leading-tight text-white">
              The Artist Behind<br /><span className="italic text-primary/80">the Brush</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="mb-6 text-[clamp(0.95rem,2.5vw,1.125rem)] leading-relaxed text-white/60">
              Harini Suresh is a certified makeup artist and beauty entrepreneur based in Tamil Nadu. With a passion for transforming looks and empowering confidence, she has crafted over 500 stunning looks for brides, models, and everyday glam lovers.
            </p>
            <p className="mb-10 text-[clamp(0.95rem,2.5vw,1.125rem)] leading-relaxed text-white/60">
              Featured at the Tamil Nadu Beauty Industry Entrepreneur Association (TBIEA), she continues to elevate the art of beauty — bringing a personalized, cinematic approach to every client she serves.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-2xl font-serif text-white mb-1">5+ Years</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/30">Of Excellence</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-2xl font-serif text-white mb-1">TBIEA</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/30">Certified Artist</div>
              </div>
              <div className="border-l-2 border-primary/40 pl-4">
                <div className="text-2xl font-serif text-white mb-1">500+</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/30">Happy Clients</div>
              </div>
              <div className="border-l-2 border-accent/40 pl-4">
                <div className="text-2xl font-serif text-white mb-1">Tamil Nadu</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/30">Based Artist</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
