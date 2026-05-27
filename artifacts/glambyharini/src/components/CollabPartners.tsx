import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MapPin, Star } from 'lucide-react';

const categories = ['All', 'Photography', 'Venues', 'Decor', 'Mehendi', 'Catering'];

const partners = [
  {
    name: 'Lens & Light Studios',
    category: 'Photography',
    location: 'Chennai',
    rating: 4.9,
    reviews: 127,
    specialty: 'Candid & cinematic wedding photography',
    since: '2021',
    collab: "Harini's preferred photographer for bridal shoots",
    emoji: '📸',
    color: 'from-blue-50 to-indigo-50',
    accent: 'text-blue-600',
    bg: 'bg-blue-500',
    ig: 'https://www.instagram.com/',
  },
  {
    name: 'Rasa Naadu Events',
    category: 'Venues',
    location: 'Chennai & Coimbatore',
    rating: 4.8,
    reviews: 89,
    specialty: 'Traditional & luxury Tamil wedding venues',
    since: '2020',
    collab: 'Exclusive glam packages with venue bookings',
    emoji: '🏛️',
    color: 'from-amber-50 to-yellow-50',
    accent: 'text-amber-600',
    bg: 'bg-amber-500',
    ig: 'https://www.instagram.com/',
  },
  {
    name: 'Petal & Bloom Decor',
    category: 'Decor',
    location: 'Chennai',
    rating: 4.9,
    reviews: 204,
    specialty: 'Floral & theme wedding decorations',
    since: '2019',
    collab: 'Coordinated colour palettes for look & decor',
    emoji: '🌸',
    color: 'from-pink-50 to-rose-50',
    accent: 'text-rose-600',
    bg: 'bg-rose-500',
    ig: 'https://www.instagram.com/',
  },
  {
    name: 'Mehendi by Preethi',
    category: 'Mehendi',
    location: 'Chennai & Madurai',
    rating: 5.0,
    reviews: 312,
    specialty: 'Bridal & party mehendi, Arabic & traditional',
    since: '2022',
    collab: 'Combined mehendi + makeup day packages',
    emoji: '🪷',
    color: 'from-orange-50 to-amber-50',
    accent: 'text-orange-600',
    bg: 'bg-orange-500',
    ig: 'https://www.instagram.com/',
  },
  {
    name: 'Virundhu Catering Co.',
    category: 'Catering',
    location: 'Tamil Nadu (Pan-state)',
    rating: 4.7,
    reviews: 156,
    specialty: 'Traditional Tamil Brahmin & Chettinad cuisine',
    since: '2018',
    collab: 'Recommended to brides planning full-day events',
    emoji: '🍛',
    color: 'from-green-50 to-emerald-50',
    accent: 'text-green-600',
    bg: 'bg-green-500',
    ig: 'https://www.instagram.com/',
  },
  {
    name: 'Frame & Focus Visuals',
    category: 'Photography',
    location: 'Coimbatore',
    rating: 4.8,
    reviews: 73,
    specialty: 'Pre-wedding & engagement shoots',
    since: '2023',
    collab: 'Makeup + shoot bundled packages available',
    emoji: '🎞️',
    color: 'from-violet-50 to-purple-50',
    accent: 'text-violet-600',
    bg: 'bg-violet-500',
    ig: 'https://www.instagram.com/',
  },
];

export default function CollabPartners() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? partners
    : partners.filter(p => p.category === activeCategory);

  return (
    <section id="partners" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Trusted Network</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Collaboration <span className="italic text-primary/80">Partners</span>
          </h2>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Harini works with Chennai's finest wedding vendors. Together, we make your day unforgettable.
          </p>
        </motion.div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-foreground text-background shadow-sm'
                  : 'border border-foreground/10 text-foreground/50 hover:border-foreground/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${p.color} border border-foreground/6 overflow-hidden group transition-shadow duration-300 ${hovered === p.name ? 'shadow-xl shadow-foreground/8' : 'shadow-sm'}`}
              >
                {/* Decorative blob */}
                <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full ${p.bg} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{p.emoji}</div>
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full bg-white/60 ${p.accent}`}>
                    {p.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg text-foreground mb-1">{p.name}</h3>

                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={10} className="text-foreground/30" />
                  <span className="text-[11px] font-mono text-foreground/40">{p.location}</span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star size={10} className="fill-accent text-accent" />
                  <span className="text-[11px] font-mono text-foreground/50">{p.rating} · {p.reviews} reviews</span>
                </div>

                <p className="text-sm text-foreground/55 leading-relaxed mb-3">{p.specialty}</p>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-white/50 border border-white/60 mb-4">
                  <span className="text-primary text-xs mt-0.5">✦</span>
                  <p className="text-xs text-foreground/60 leading-relaxed italic">{p.collab}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-foreground/25">Partner since {p.since}</span>
                  <a
                    href={`https://wa.me/917305306497?text=Hi Harini! I'd love to know more about your partnership with ${p.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[10px] font-mono tracking-widest uppercase ${p.accent} hover:underline flex items-center gap-1`}
                  >
                    Ask Harini <ExternalLink size={9} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-foreground/25 mt-10"
        >
          All partner recommendations are based on Harini's personal experience and trust. No paid placements.
        </motion.p>
      </div>
    </section>
  );
}
