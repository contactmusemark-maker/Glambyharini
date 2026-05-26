import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const allPhotos = [
  { src: '/assets/clients/000_client.jpg', category: 'Bridal' },
  { src: '/assets/clients/001_client.jpg', category: 'Bridal' },
  { src: '/assets/clients/002_client.jpg', category: 'Bridal' },
  { src: '/assets/clients/004_client.jpg', category: 'Reception' },
  { src: '/assets/clients/005_client.jpg', category: 'Reception' },
  { src: '/assets/clients/006_client.jpg', category: 'Reception' },
  { src: '/assets/clients/007_client.jpg', category: 'Party' },
  { src: '/assets/clients/008_client.jpg', category: 'Party' },
  { src: '/assets/clients/009_client.jpg', category: 'Party' },
  { src: '/assets/clients/011_client.jpg', category: 'Bridal' },
  { src: '/assets/clients/013_client.webp', category: 'Fashion' },
  { src: '/assets/clients/014_client.webp', category: 'Fashion' },
  { src: '/assets/clients/015_client.webp', category: 'Fashion' },
  { src: '/assets/clients/016_client.webp', category: 'Fashion' },
  { src: '/assets/clients/017_client.webp', category: 'Fashion' },
];

const categories = ['All', 'Bridal', 'Reception', 'Fashion', 'Party'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === 'All' ? allPhotos : allPhotos.filter(p => p.category === active);

  return (
    <section id="gallery" className="py-24 md:py-40 bg-secondary/30 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-[0.2em] uppercase text-primary"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif mt-3 mb-8"
          >
            Transformations
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-mono text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                  active === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative group overflow-hidden cursor-pointer break-inside-avoid mb-3"
                onClick={() => setLightbox(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={`${photo.category} look`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                </div>
                <span className="absolute bottom-2 left-2 font-mono text-xs tracking-wider uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-2 py-1">
                  {photo.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
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
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
