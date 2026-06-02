import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';

const photos = [
  { src: '/assets/clients/000_client.jpg', category: 'Bridal', label: 'Bridal Radiance' },
  { src: '/assets/clients/020_client.jpg', category: 'Party', label: 'Pure Glam Shimmer' },
  { src: '/assets/clients/004_client.jpg', category: 'Reception', label: 'Reception Glow' },
  { src: '/assets/clients/001_client.jpg', category: 'Bridal', label: 'Timeless Bride' },
  { src: '/assets/clients/005_client.jpg', category: 'Reception', label: 'Evening Grace' },
  { src: '/assets/clients/021_client.jpg', category: 'Party', label: 'Contour & Highlight' },
  { src: '/assets/clients/002_client.jpg', category: 'Bridal', label: 'Bridal Elegance' },
  { src: '/assets/clients/007_client.jpg', category: 'Party', label: 'Party Glam' },
  { src: '/assets/clients/006_client.jpg', category: 'Reception', label: 'Golden Hour' },
  { src: '/assets/clients/008_client.jpg', category: 'Party', label: 'Night Luxe' },
  { src: '/assets/clients/009_client.jpg', category: 'Party', label: 'Bold & Beautiful' },
  { src: '/assets/clients/022_client.jpg', category: 'Fashion', label: 'Pure Glam Finish' },
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
  activeIndex,
  onClick,
}: {
  photo: (typeof photos)[0];
  index: number;
  activeIndex: number;
  onClick: () => void;
}) {
  const offset = index - activeIndex;
  const absOffset = Math.abs(offset);
  const visible = absOffset <= 2;
  const active = offset === 0;

  const x = `calc(${offset} * min(42vw, 280px))`;
  const z = -absOffset * 130;
  const rotateY = offset * -18;
  const opacity = absOffset > 2 ? 0 : active ? 1 : 0.45;
  const scale = active ? 1 : 0.84 - absOffset * 0.05;
  const blur = active ? 'blur(0px)' : 'blur(1.5px)';

  return (
    <motion.div
      animate={{ x, z, rotateY, opacity, scale, filter: blur }}
      transition={{ type: 'spring', stiffness: 180, damping: 28, mass: 0.9 }}
      style={{
        transformStyle: 'preserve-3d',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 10 - absOffset,
      }}
      className="absolute max-w-full cursor-pointer select-none"
      onClick={offset === 0 ? onClick : undefined}
      onPointerDown={(e) => {
        if (offset !== 0) e.preventDefault();
      }}
    >
      <div
        className={`w-[min(74vw,260px)] overflow-hidden rounded-[1.5rem] border bg-white shadow-2xl transition duration-500 sm:w-[330px] sm:rounded-[28px] lg:w-[430px] xl:w-[460px] ${
          active
            ? 'border-primary/45 shadow-primary/30 ring-1 ring-primary/30'
            : 'border-white/10 shadow-black/40'
        }`}
      >
        <div className="relative h-[min(96vw,330px)] overflow-hidden sm:h-[410px] lg:h-[440px] xl:h-[470px]">
          <img
            src={photo.src}
            alt={photo.label}
            className="h-full w-full object-cover"
            draggable={false}
            loading={active ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
          <div className="absolute left-3 top-3 rounded-full bg-white/18 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:text-xs sm:tracking-[0.22em]">
            {photo.category}
          </div>
          {active ? (
            <div className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground shadow-xl sm:right-5 sm:top-5">
              <Maximize2 size={18} />
            </div>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <p className="font-serif text-2xl leading-tight text-white sm:text-4xl">
              {photo.label}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/65">
              Tap center card to view
            </p>
          </div>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3 bg-white px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
              {photo.category}
            </p>
            <p className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg">{photo.label}</p>
          </div>
          <span className="shrink-0 rounded-full bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-background sm:px-4">
            View
          </span>
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
    <section id="gallery" className="relative overflow-hidden bg-[#0d0d0d] py-24 md:py-32">
      {/* Heading */}
      <div className="container mb-12">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-sm uppercase tracking-[0.35em] text-primary">
              Portfolio
            </span>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,11vw,6rem)] leading-none text-white lg:text-8xl">
              Transformations
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
              A larger, cinematic view of signature bridal, reception, fashion, and party looks.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 lg:justify-end">
            {categories.map((cat) => {
              const count = cat === 'All' ? photos.length : photos.filter((p) => p.category === cat).length;
              const active = activeFilter === cat;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setActiveIndex(0);
                  }}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 sm:gap-3 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.18em] ${
                    active
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                      : 'border-white/15 bg-white/[0.03] text-white/55 hover:border-primary/60 hover:text-white'
                  }`}
                >
                  {cat}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? 'bg-white/20' : 'bg-white/10'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Carousel */}
      <div
        className="relative mx-auto flex h-[min(142vw,500px)] w-full max-w-7xl touch-pan-y items-center justify-center overflow-hidden px-2 sm:h-[620px] sm:px-4 lg:h-[660px]"
        style={{ perspective: '1800px' }}
        onPointerDown={(e) => {
          handleDrag.current = { startX: e.clientX, dragging: true };
        }}
        onPointerMove={(e) => {
          if (!handleDrag.current.dragging) return;
          const delta = e.clientX - handleDrag.current.startX;
          if (Math.abs(delta) > 48) {
            setActiveIndex((i) => clamp(delta < 0 ? i + 1 : i - 1));
            handleDrag.current.startX = e.clientX;
          }
        }}
        onPointerUp={() => { handleDrag.current.dragging = false; }}
        onPointerLeave={() => { handleDrag.current.dragging = false; }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div
          className="relative h-[min(132vw,430px)] w-[min(74vw,260px)] sm:h-[540px] sm:w-[330px] lg:h-[580px] lg:w-[430px] xl:w-[460px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {filtered.map((photo, i) => (
            <Card
              key={photo.src}
              photo={photo}
              index={i}
              activeIndex={activeIndex}
              onClick={() => setLightbox(photo.src)}
            />
          ))}
        </div>
      </div>

      {/* Nav arrows + counter */}
      <div className="container mt-2 flex items-center justify-between gap-3 sm:gap-5">
        <button
          onClick={() => setActiveIndex((i) => clamp(i - 1))}
          disabled={activeIndex === 0}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition hover:border-primary hover:text-primary disabled:opacity-20 sm:h-14 sm:w-14"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="min-w-0 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.28em] text-white/45">
            {String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
          </span>
          <div className="mt-2 text-sm text-white/35">{filtered[activeIndex]?.label}</div>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <button
          onClick={() => setActiveIndex((i) => clamp(i + 1))}
          disabled={activeIndex === filtered.length - 1}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition hover:border-primary hover:text-primary disabled:opacity-20 sm:h-14 sm:w-14"
        >
          <ArrowRight size={22} />
        </button>
      </div>

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
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-primary"
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
