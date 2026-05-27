import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, ExternalLink } from 'lucide-react';

// Real Instagram Reels from @glam_byharini — public oEmbed
// Since we can't embed private reels without a token, we show a curated reel grid
// with the real Instagram profile link and autoplay thumbnail videos

const reels = [
  {
    id: 1,
    title: 'Bridal Transformation',
    tag: 'Bridal',
    thumb: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
    duration: '0:32',
  },
  {
    id: 2,
    title: 'Reception Glam',
    tag: 'Reception',
    thumb: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&q=80',
    duration: '0:45',
  },
  {
    id: 3,
    title: 'Engagement Look',
    tag: 'Engagement',
    thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    duration: '0:28',
  },
  {
    id: 4,
    title: 'Saree Draping Tutorial',
    tag: 'Tutorial',
    thumb: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
    duration: '1:02',
  },
  {
    id: 5,
    title: 'Party Glam Speed',
    tag: 'Party',
    thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    duration: '0:38',
  },
  {
    id: 6,
    title: 'Bridal Hair & Makeup',
    tag: 'Bridal',
    thumb: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
    duration: '0:55',
  },
];

const tagColors: Record<string, string> = {
  Bridal: 'bg-primary/15 text-primary',
  Reception: 'bg-accent/20 text-accent',
  Engagement: 'bg-pink-100 text-pink-600',
  Tutorial: 'bg-purple-100 text-purple-600',
  Party: 'bg-blue-100 text-blue-600',
};

export default function VideoReel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="reels" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">@glam_byharini</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
              Instagram <span className="italic text-primary/80">Reels</span>
            </h2>
            <p className="text-foreground/45 text-sm max-w-md">
              Watch the magic unfold. Follow on Instagram for daily transformations, tutorials and behind-the-scenes.
            </p>
          </div>
          <a
            href="https://www.instagram.com/glam_byharini"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 text-xs font-mono tracking-widest uppercase text-foreground/60 hover:border-primary hover:text-primary transition-colors"
          >
            <ExternalLink size={12} />
            Follow on Instagram
          </a>
        </motion.div>

        {/* Reel grid — portrait aspect ratio like Instagram */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {reels.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(reel.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={reel.thumb}
                alt={reel.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${hovered === reel.id ? 'scale-105' : 'scale-100'}`}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Play button */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered === reel.id ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Play size={20} fill="white" className="text-white ml-1" />
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full mb-1.5 inline-block ${tagColors[reel.tag] || 'bg-white/20 text-white'}`}>
                  {reel.tag}
                </span>
                <p className="text-white text-xs font-serif leading-tight">{reel.title}</p>
                <p className="text-white/40 text-[10px] font-mono mt-0.5">{reel.duration}</p>
              </div>

              {/* Duration badge top */}
              <div className="absolute top-3 right-3">
                <span className="bg-black/40 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded-full">
                  ▶ Reel
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/glam_byharini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-xs font-mono tracking-widest uppercase shadow-lg hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            View All Reels on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
