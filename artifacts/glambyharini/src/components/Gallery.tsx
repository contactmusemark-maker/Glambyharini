import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

const photos = [
  { src: '/assets/clients/000_client.jpg', category: 'Bridal', label: 'Bridal Radiance' },
  { src: '/assets/clients/001_client.jpg', category: 'Bridal', label: 'Timeless Bride' },
  { src: '/assets/clients/002_client.jpg', category: 'Bridal', label: 'Bridal Elegance' },
  { src: '/assets/clients/004_client.jpg', category: 'Reception', label: 'Reception Glow' },
  { src: '/assets/clients/005_client.jpg', category: 'Reception', label: 'Evening Grace' },
  { src: '/assets/clients/006_client.jpg', category: 'Reception', label: 'Golden Hour' },
  { src: '/assets/clients/007_client.jpg', category: 'Party', label: 'Party Glam' },
  { src: '/assets/clients/008_client.jpg', category: 'Party', label: 'Night Luxe' },
  { src: '/assets/clients/009_client.jpg', category: 'Party', label: 'Bold & Beautiful' },
  { src: '/assets/clients/011_client.jpg', category: 'Bridal', label: 'Classic Bride' },
  { src: '/assets/clients/013_client.webp', category: 'Fashion', label: 'Editorial Look' },
  { src: '/assets/clients/014_client.webp', category: 'Fashion', label: 'Fashion Forward' },
  { src: '/assets/clients/015_client.webp', category: 'Fashion', label: 'Studio Glamour' },
  { src: '/assets/clients/016_client.webp', category: 'Fashion', label: 'Avant-Garde' },
  { src: '/assets/clients/017_client.webp', category: 'Fashion', label: 'Minimalist Chic' },
];

const categories = ['All', 'Bridal', 'Reception', 'Fashion', 'Party'];

function Card({
  photo,
  index,
  total,
  activeIndex,
  onClick,
}: {
  photo: (typeof photos)[0];
  index: number;
  total: number;
  activeIndex: number;
  onClick: () => void;
}) {
  const offset = index - activeIndex;
  const absOffset = Math.abs(offset);
  const visible = absOffset <= 3;

  const x = offset * 220;
  const z = -absOffset * 80;
  const rotateY = offset * 14;
  const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.28;
  const scale = 1 - absOffset * 0.08;

  return (
    <motion.div
      animate={{ x, z, rotateY, opacity, scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      style={{ transformStyle: 'preserve-3d', pointerEvents: visible ? 'auto' : 'none' }}
      className="absolute cursor-pointer select-none"
      onClick={offset === 0 ? onClick : undefined}
      onPointerDown={(e) => {
        if (offset !== 0) e.preventDefault();
      }}
    >
      <div
        className={`w-[240px] md:w-[280px] rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 ${
          offset === 0 ? 'shadow-primary/30 ring-2 ring-primary/30' : ''
        }`}
        style={{ background: '#fff' }}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={photo.src}
            alt={photo.label}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <div className="p-4 bg-white">
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
            {photo.category}
          </p>
          <p className="font-serif text-base text-foreground">{photo.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeIndex, setActiveIndex] = useState(2);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeFilter === 'All' ? photos : photos.filter((p) => p.category === activeFilter);

  const clamp = (v: number) => Math.max(0, Math.min(filtered.length - 1, v));

  const handleDrag = useRef({ startX: 0, dragging: false });

  return (
    <section id="gallery" className="py-24 md:py-40 bg-[#0d0d0d] relative overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-14 px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-primary"
        >
          Portfolio
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-serif text-white mt-3 mb-8"
        >
          Transformations
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setActiveIndex(0);
              }}
              className={`font-mono text-[10px] tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-primary text-white border-primary'
                  : 'border-white/20 text-white/50 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Carousel */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: '520px', perspective: '1200px' }}
        onPointerDown={(e) => {
          handleDrag.current = { startX: e.clientX, dragging: true };
        }}
        onPointerMove={(e) => {
          if (!handleDrag.current.dragging) return;
          const delta = e.clientX - handleDrag.current.startX;
          if (Math.abs(delta) > 40) {
            setActiveIndex((i) => clamp(delta < 0 ? i + 1 : i - 1));
            handleDrag.current.startX = e.clientX;
          }
        }}
        onPointerUp={() => { handleDrag.current.dragging = false; }}
        onPointerLeave={() => { handleDrag.current.dragging = false; }}
      >
        <div className="relative" style={{ transformStyle: 'preserve-3d', width: '280px', height: '460px' }}>
          {filtered.map((photo, i) => (
            <Card
              key={photo.src}
              photo={photo}
              index={i}
              total={filtered.length}
              activeIndex={activeIndex}
              onClick={() => setLightbox(photo.src)}
            />
          ))}
        </div>
      </div>

      {/* Nav arrows + counter */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <button
          onClick={() => setActiveIndex((i) => clamp(i - 1))}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full border border-white/20 text-white/50 hover:border-primary hover:text-primary transition-colors flex items-center justify-center disabled:opacity-20"
        >
          ‹
        </button>
        <span className="font-mono text-xs tracking-widest text-white/30">
          {String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
        </span>
        <button
          onClick={() => setActiveIndex((i) => clamp(i + 1))}
          disabled={activeIndex === filtered.length - 1}
          className="w-10 h-10 rounded-full border border-white/20 text-white/50 hover:border-primary hover:text-primary transition-colors flex items-center justify-center disabled:opacity-20"
        >
          ›
        </button>
      </div>

      {/* Scroll to Explore hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-2 mt-12 text-white/25"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35 }}
              src={lightbox}
              alt="Expanded view"
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
