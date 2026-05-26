import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 bg-foreground text-background relative overflow-hidden">
      {/* decorative blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="/assets/about_harini.png"
              alt="Harini Suresh — Artist Behind the Brush"
              className="w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.35))' }}
            />
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              The Artist
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-background mb-6 leading-tight">
              The Artist Behind<br /><span className="italic text-primary/80">the Brush</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="text-lg text-background/70 leading-relaxed mb-6">
              Harini Suresh is a certified makeup artist and beauty entrepreneur based in Tamil Nadu. With a passion for transforming looks and empowering confidence, she has crafted over 500 stunning looks for brides, models, and everyday glam lovers.
            </p>
            <p className="text-lg text-background/70 leading-relaxed mb-10">
              Featured at the Tamil Nadu Beauty Industry Entrepreneur Association (TBIEA), she continues to elevate the art of beauty — bringing a personalized, cinematic approach to every client she serves.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-2xl font-serif text-background mb-1">5+ Years</div>
                <div className="text-xs font-mono uppercase tracking-widest text-background/40">Of Excellence</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-2xl font-serif text-background mb-1">TBIEA</div>
                <div className="text-xs font-mono uppercase tracking-widest text-background/40">Certified Artist</div>
              </div>
              <div className="border-l-2 border-primary/40 pl-4">
                <div className="text-2xl font-serif text-background mb-1">500+</div>
                <div className="text-xs font-mono uppercase tracking-widest text-background/40">Happy Clients</div>
              </div>
              <div className="border-l-2 border-accent/40 pl-4">
                <div className="text-2xl font-serif text-background mb-1">Tamil Nadu</div>
                <div className="text-xs font-mono uppercase tracking-widest text-background/40">Based Artist</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
