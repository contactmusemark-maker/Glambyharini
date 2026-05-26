import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
              <img 
                src="/assets/Main_Logo_1779783577490.png" 
                alt="Harini Suresh Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">The Artist Behind the Brush</h2>
            <div className="w-16 h-px bg-primary mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Harini Suresh is a certified makeup artist and beauty entrepreneur based in Tamil Nadu. With a passion for transforming looks and empowering confidence, she has crafted over 500 stunning looks for brides, models, and everyday glam lovers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Featured at the Tamil Nadu Beauty Industry Entrepreneur Association (TBIEA), she continues to elevate the art of beauty, bringing a personalized, cinematic approach to every client she serves.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-6 border-l-2 border-l-primary">
                <div className="text-2xl font-serif text-foreground mb-1">5+ Years</div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Of Excellence</div>
              </div>
              <div className="glass-panel p-6 border-l-2 border-l-accent">
                <div className="text-2xl font-serif text-foreground mb-1">TBIEA</div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Certified Artist</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
