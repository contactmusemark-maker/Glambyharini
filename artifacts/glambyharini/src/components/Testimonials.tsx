import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Harini transformed me into the most beautiful version of myself on my wedding day. Every guest was speechless.",
    name: "Priya Suresh",
    title: "Bride",
    initials: "PS",
  },
  {
    quote: "The level of artistry is truly unmatched. She understood exactly what I wanted and exceeded every expectation.",
    name: "Meera Rajendran",
    title: "Bride",
    initials: "MR",
  },
  {
    quote: "My engagement shoot makeup was absolutely flawless — it lasted the entire night and photographed beautifully.",
    name: "Divya Krishnan",
    title: "Engagement Client",
    initials: "DK",
  },
  {
    quote: "Professional, warm, and incredibly talented. Harini made me feel like a Bollywood star for my reception.",
    name: "Kavitha Murugan",
    title: "Reception Client",
    initials: "KM",
  },
  {
    quote: "I have tried many makeup artists over the years, but Harini's attention to detail and precision is extraordinary.",
    name: "Anjali Natarajan",
    title: "Fashion Client",
    initials: "AN",
  },
  {
    quote: "From saree draping to hair styling — every detail was perfect. I felt like royalty. Highly recommend.",
    name: "Lakshmi Prabhu",
    title: "Bridal Client",
    initials: "LP",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const getIndex = (offset: number) => (current + offset + testimonials.length) % testimonials.length;

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-secondary/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-[0.2em] uppercase text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif mt-3"
          >
            Words from Our Brides
          </motion.h2>
        </div>

        {/* Desktop: 3-card layout */}
        <div className="hidden md:flex items-stretch justify-center gap-6 max-w-5xl mx-auto">
          {[-1, 0, 1].map((offset) => {
            const t = testimonials[getIndex(offset)];
            const isCenter = offset === 0;
            return (
              <motion.div
                key={getIndex(offset)}
                animate={{ scale: isCenter ? 1 : 0.95, opacity: isCenter ? 1 : 0.6 }}
                transition={{ duration: 0.4 }}
                className={`glass-panel p-8 flex flex-col justify-between flex-1 max-w-sm ${isCenter ? 'shadow-2xl shadow-primary/10' : ''}`}
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed font-serif italic text-lg mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-mono text-sm font-medium">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-serif font-medium">{t.name}</p>
                    <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden relative max-w-sm mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed font-serif italic text-lg mb-8">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-mono text-sm">
                  {testimonials[current].initials}
                </div>
                <div>
                  <p className="font-serif font-medium">{testimonials[current].name}</p>
                  <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{testimonials[current].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : 'bg-border'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
