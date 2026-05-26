import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export default function Hero() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/harini/001_harini_ai.png" 
          alt="Harini Artistry" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="font-mono text-sm tracking-[0.3em] uppercase text-primary font-medium">
              Certified Makeup Artist · Tamil Nadu
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] mb-8">
            Where Beauty <br />
            <span className="italic text-muted-foreground/80">Becomes Art</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => scrollTo('#booking')}
              className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-widest uppercase hover:bg-accent transition-all duration-300 shadow-xl shadow-primary/20"
            >
              Book Appointment
            </button>
            <button 
              onClick={() => scrollTo('#gallery')}
              className="px-8 py-4 border border-foreground/20 text-foreground font-mono text-sm tracking-widest uppercase hover:bg-foreground/5 transition-all duration-300 glass-panel"
            >
              View Gallery
            </button>
            <a 
              href="https://www.instagram.com/glam_byharini/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full glass-panel text-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 right-6 md:right-12 glass-panel p-6 max-w-[200px]"
        >
          <div className="text-3xl font-serif text-primary mb-1">500+</div>
          <div className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Happy Clients Transformed</div>
        </motion.div>
      </div>
    </section>
  );
}
