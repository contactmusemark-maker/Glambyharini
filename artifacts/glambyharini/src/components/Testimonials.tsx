import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Harini transformed me into the most beautiful version of myself on my wedding day. Every guest was speechless — I felt like royalty.",
    name: "Priya Suresh",
    title: "Bridal Client",
    seed: "PriyaSuresh",
    bg: "fce4ec",
  },
  {
    quote: "The level of artistry is truly unmatched. She understood exactly what I wanted and exceeded every expectation. My reception look was perfection.",
    name: "Meera Rajendran",
    title: "Bride",
    seed: "MeeraRajendran",
    bg: "e8daff",
  },
  {
    quote: "My engagement shoot makeup was absolutely flawless — it lasted the entire night and photographed beautifully. Cannot recommend enough.",
    name: "Divya Krishnan",
    title: "Engagement Client",
    seed: "DivyaKrishnan",
    bg: "b6e3f4",
  },
  {
    quote: "Professional, warm, and incredibly talented. Harini made me feel like a Bollywood star for my reception. Truly the best in Tamil Nadu.",
    name: "Kavitha Murugan",
    title: "Reception Client",
    seed: "KavithaMurugan",
    bg: "ffd5dc",
  },
  {
    quote: "I have tried many makeup artists over the years, but Harini's attention to detail and precision is extraordinary. My go-to artist forever.",
    name: "Anjali Natarajan",
    title: "Fashion Client",
    seed: "AnjaliNatarajan",
    bg: "c0aede",
  },
  {
    quote: "From saree draping to hair styling — every detail was perfect. I felt like royalty on my big day. Highly recommend to every bride.",
    name: "Lakshmi Prabhu",
    title: "Bridal Client",
    seed: "LakshmiPrabhu",
    bg: "ffdfbf",
  },
];

const avatarUrl = (seed: string, bg: string) =>
  `https://api.dicebear.com/8.x/avataaars/png?seed=${seed}&backgroundColor=${bg}&size=128`;

// Scattered positions for the 6 floating avatars in the left panel
const floatPositions = [
  { top: '8%',  left: '4%',  size: 80 },
  { top: '2%',  left: '58%', size: 66 },
  { top: '38%', left: '0%',  size: 72 },
  { top: '34%', left: '52%', size: 90 },
  { top: '66%', left: '14%', size: 68 },
  { top: '62%', left: '60%', size: 64 },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = (i: number) => {
    setCurrent(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary/6 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/6 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            Words from Our <span className="italic text-primary/80">Brides</span>
          </h2>
        </motion.div>

        {/* ── Desktop layout ── */}
        <div className="hidden md:flex items-center gap-0 max-w-5xl mx-auto min-h-[420px]">

          {/* Left — floating avatars */}
          <div className="relative w-[340px] shrink-0 h-[380px]">
            {testimonials.map((tm, i) => {
              const pos = floatPositions[i];
              const isActive = i === current;
              return (
                <motion.button
                  key={tm.seed}
                  onClick={() => goTo(i)}
                  animate={{
                    scale: isActive ? 1.1 : 0.88,
                    opacity: isActive ? 1 : 0.55,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-full overflow-hidden cursor-pointer focus:outline-none"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: pos.size,
                    height: pos.size,
                    boxShadow: isActive
                      ? '0 0 0 3px white, 0 0 0 5px hsl(351 35% 57%), 0 12px 32px rgba(0,0,0,0.15)'
                      : '0 4px 16px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={avatarUrl(tm.seed, tm.bg)}
                    alt={tm.name}
                    className="w-full h-full object-cover"
                    style={{ background: `#${tm.bg}` }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Center — vertical dot timeline */}
          <div className="flex flex-col items-center gap-0 px-4 h-[380px] relative shrink-0">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-foreground/8" />
            <div className="flex flex-col justify-around h-full relative z-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      width: i === current ? 14 : 8,
                      height: i === current ? 14 : 8,
                      backgroundColor: i === current ? 'hsl(351 35% 57%)' : 'transparent',
                      borderColor: i === current ? 'hsl(351 35% 57%)' : 'rgba(0,0,0,0.15)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full border"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — quote */}
          <div className="flex-1 pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Big quote mark */}
                <div className="font-serif text-8xl leading-none text-primary/20 select-none mb-2">&ldquo;&rdquo;</div>

                <p className="font-serif text-xl md:text-2xl text-foreground/75 leading-relaxed mb-8 -mt-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={avatarUrl(t.seed, t.bg)}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ background: `#${t.bg}` }}
                  />
                  <div>
                    <p className="font-serif text-base font-medium text-foreground">{t.name}</p>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40">— {t.title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden max-w-sm mx-auto">
          {/* Active avatar */}
          <div className="flex justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={avatarUrl(t.seed, t.bg)}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover shadow-xl"
                style={{ background: `#${t.bg}`, boxShadow: '0 0 0 3px white, 0 0 0 5px hsl(351 35% 57%)' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
          </div>

          {/* Stacked mini avatars row */}
          <div className="flex justify-center mb-6">
            <div className="flex -space-x-3">
              {testimonials.map((tm, i) => (
                <button key={i} onClick={() => goTo(i)}>
                  <motion.img
                    src={avatarUrl(tm.seed, tm.bg)}
                    alt={tm.name}
                    animate={{ scale: i === current ? 1.15 : 1, opacity: i === current ? 1 : 0.5 }}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                    style={{ background: `#${tm.bg}` }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="font-serif text-5xl leading-none text-primary/20 select-none mb-1">&ldquo;</div>
              <p className="font-serif text-lg text-foreground/70 leading-relaxed mb-6 -mt-3 px-2">
                {t.quote}
              </p>
              <p className="font-serif text-base font-medium text-foreground">{t.name}</p>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40">— {t.title}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}>
                <motion.div
                  animate={{ width: i === current ? 24 : 8, backgroundColor: i === current ? 'hsl(351 35% 57%)' : 'rgba(0,0,0,0.12)' }}
                  className="h-2 rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
