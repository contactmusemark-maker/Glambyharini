import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const igPhotos = [
  '/assets/clients/000_client.jpg',
  '/assets/clients/004_client.jpg',
  '/assets/clients/013_client.webp',
  '/assets/clients/009_client.jpg',
  '/assets/clients/015_client.webp',
  '/assets/clients/011_client.jpg',
];

const INSTAGRAM_URL = 'https://www.instagram.com/glam_byharini/';

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-24 md:py-40 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Instagram size={28} className="text-primary" />
            <span className="font-mono text-sm tracking-[0.2em] uppercase text-primary">Instagram</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif"
          >
            Follow the Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mt-4 font-mono text-sm tracking-wider"
          >
            @glam_byharini
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 max-w-5xl mx-auto mb-12"
        >
          {igPhotos.map((photo, i) => (
            <motion.a
              key={photo}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="relative group overflow-hidden aspect-square block"
            >
              <img
                src={photo}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="text-white" />
                  <span className="text-white font-mono text-xs tracking-wider">View</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-foreground/20 text-foreground font-mono text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            <Instagram size={18} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
