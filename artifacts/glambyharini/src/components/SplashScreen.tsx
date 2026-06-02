import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = 'GlamByHarini';
const TAGLINE = 'Crafting Beauty · One Look at a Time';

function Sparkle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
      transition={{ delay, duration: 1.4, repeat: Infinity, repeatDelay: Math.random() * 2 + 1 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#c9a9a0" opacity="0.8" />
      </svg>
    </motion.div>
  );
}

function Brush() {
  return (
    <motion.div
      className="absolute bottom-[15%] left-1/2 -translate-x-1/2 pointer-events-none"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="h-px w-48 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
    </motion.div>
  );
}

const sparkles = [
  { x: '10%', y: '20%', delay: 0.3 },
  { x: '85%', y: '15%', delay: 0.7 },
  { x: '20%', y: '75%', delay: 0.5 },
  { x: '80%', y: '70%', delay: 1.0 },
  { x: '50%', y: '10%', delay: 0.2 },
  { x: '15%', y: '50%', delay: 1.2 },
  { x: '88%', y: '45%', delay: 0.9 },
  { x: '45%', y: '88%', delay: 0.6 },
  { x: '70%', y: '25%', delay: 0.4 },
  { x: '30%', y: '30%', delay: 1.1 },
];

let _splashPlayed = false;

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>(() =>
    _splashPlayed ? 'out' : 'in'
  );
  const [progress, setProgress] = useState(_splashPlayed ? 1 : 0);

  useEffect(() => {
    if (_splashPlayed) {
      onDone();
      return;
    }
    _splashPlayed = true;

    const start = Date.now();
    const duration = 2200;
    let rafId: number;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(p);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('out'), 2400);
    const t3 = setTimeout(onDone, 3000);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'out' ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0a0f 0%, #0d0d0d 40%, #1a0a14 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 h-[min(130vw,500px)] w-[min(130vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute left-1/2 top-1/2 h-[min(82vw,300px)] w-[min(82vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[80px]" />
          </div>

          {/* Sparkles */}
          {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}

          {/* Main content */}
          <div className="relative z-10 flex w-full max-w-full flex-col items-center gap-6 px-4">
            {/* Logo with spin + glow */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-[-12px] rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[-24px] rounded-full border border-accent/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />

              <img
                src="/assets/main_logo.png"
                alt="GlamByHarini"
                className="relative z-10 h-28 w-28 object-contain drop-shadow-2xl md:h-36 md:w-36"
              />
            </motion.div>

            {/* Brand name letter by letter */}
            <motion.div
              className="flex max-w-full items-center justify-center gap-0 overflow-hidden"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } } }}
            >
              {BRAND.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  className={`font-serif text-[clamp(1rem,5vw,2.25rem)] md:text-4xl ${
                    char === char.toUpperCase() && char !== ' ' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-full text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 sm:tracking-[0.4em]"
            >
              {TAGLINE}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative mt-4 h-px w-48 max-w-[70vw] overflow-hidden bg-white/10"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
                style={{ width: `${progress * 100}%` }}
              />
            </motion.div>
          </div>

          <Brush />

          {/* Corner marks */}
          {[
            'top-8 left-8',
            'top-8 right-8',
            'bottom-8 left-8',
            'bottom-8 right-8',
          ].map((pos) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-5 h-5 border-primary/30`}
              style={{
                borderTopWidth: pos.includes('top') ? 1 : 0,
                borderBottomWidth: pos.includes('bottom') ? 1 : 0,
                borderLeftWidth: pos.includes('left') ? 1 : 0,
                borderRightWidth: pos.includes('right') ? 1 : 0,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
