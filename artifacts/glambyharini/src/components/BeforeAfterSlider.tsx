import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const transformations = [
  {
    label: 'Bridal Look',
    before: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
    after:  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    client: 'Priya S.',
  },
  {
    label: 'Reception Glam',
    before: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80',
    after:  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    client: 'Meera R.',
  },
  {
    label: 'Engagement Look',
    before: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
    after:  'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&q=80',
    client: 'Divya K.',
  },
];

function Slider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) update(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => { update(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-2xl cursor-col-resize"
      onMouseMove={onMouseMove}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={onTouchMove}
    >
      {/* Before */}
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      {/* After clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: '100%', width: `${10000 / pos}%`, maxWidth: 'none' }} draggable={false} />
      </div>
      {/* Divider */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => {}}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10H14M6 10L3 7M6 10L3 13M14 10L17 7M14 10L17 13" stroke="hsl(351 35% 57%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/40 text-white text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-lg backdrop-blur-sm">Before</span>
      <span className="absolute top-3 right-3 bg-primary/80 text-white text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-lg backdrop-blur-sm">After</span>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);
  const t = transformations[active];

  return (
    <section id="transformations" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Transformations</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Before &amp; <span className="italic text-primary/80">After</span>
          </h2>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Drag the slider to reveal the transformation. Every look is crafted with precision and love.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:flex-1 aspect-[4/5] md:aspect-[3/4] max-w-sm mx-auto md:mx-0"
          >
            <Slider key={active} before={t.before} after={t.after} />
          </motion.div>

          {/* Right panel */}
          <div className="w-full md:w-72 flex flex-col gap-4">
            <p className="font-mono text-xs tracking-widest uppercase text-foreground/40 mb-2">Select a look</p>
            {transformations.map((tr, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                  i === active
                    ? 'border-primary/40 bg-primary/5 shadow-sm'
                    : 'border-foreground/8 bg-white hover:border-foreground/15'
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={tr.after} alt={tr.label} className="w-full h-full object-cover" />
                  {i === active && (
                    <div className="absolute inset-0 ring-2 ring-primary ring-inset rounded-xl" />
                  )}
                </div>
                <div>
                  <p className="font-serif text-base text-foreground">{tr.label}</p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/40">{tr.client}</p>
                </div>
                {i === active && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </motion.button>
            ))}

            <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="font-serif text-sm text-foreground/70 italic leading-relaxed">
                "Every woman deserves to see herself at her most beautiful."
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-primary mt-2">— Harini Suresh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
