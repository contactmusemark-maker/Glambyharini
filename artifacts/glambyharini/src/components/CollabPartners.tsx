import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Camera, MapPin, Flower2, Hand, UtensilsCrossed, Sparkles } from 'lucide-react';

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
    image: '/assets/clients/000_client.jpg',
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
    image: '/assets/clients/004_client.jpg',
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
    image: '/assets/clients/005_client.jpg',
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
    image: '/assets/clients/006_client.jpg',
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
    image: '/assets/clients/007_client.jpg',
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
    image: '/assets/clients/008_client.jpg',
  },
];

const categoryIcon: Record<string, React.ReactNode> = {
  Photography: <Camera size={14} />,
  Venues: <MapPin size={14} />,
  Decor: <Flower2 size={14} />,
  Mehendi: <Hand size={14} />,
  Catering: <UtensilsCrossed size={14} />,
};

function PartnerChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/75 backdrop-blur px-3 py-1.5 border border-foreground/10 shadow-sm">
      <span className="text-foreground/60">{categoryIcon[label] ?? <Sparkles size={14} />}</span>
      <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/55">{label}</span>
    </span>
  );
}

export default function CollabPartners() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter(p =>
      [p.name, p.category, p.location, p.specialty].some(v => v.toLowerCase().includes(q))
    );
  }, [query]);

  const collage = filtered.slice(0, 6);

  return (
    <section id="partners" className="py-20 md:py-28 bg-[#fbf8f1] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 border border-foreground/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">Trusted Network</span>
            </div>

            <h2 className="mt-6 text-5xl md:text-6xl font-sans font-semibold tracking-tight text-foreground leading-[1.05]">
              Meet
              <span className="text-primary/80"> </span>
              <span className="relative inline-block">
                without a hitch
                <span className="absolute left-0 -bottom-1 h-[7px] w-full bg-primary/25 rounded-full -z-10" />
              </span>
            </h2>

            <p className="mt-5 text-foreground/55 text-sm md:text-base leading-relaxed max-w-md">
              Distance doesn&apos;t matter — it&apos;s the team that matters most. Explore Harini&apos;s trusted wedding vendors across Tamil Nadu.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex items-center gap-2 rounded-2xl bg-white/75 backdrop-blur border border-foreground/10 px-4 py-3 shadow-sm flex-1">
                <Search size={14} className="text-foreground/35" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search partners, city, category..."
                  className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-foreground/30"
                />
              </div>
              <a
                href="https://wa.me/917305306497?text=Hi Harini! I’d like your recommended vendors for my wedding."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary text-white px-6 py-3 text-xs font-mono tracking-widest uppercase shadow-lg shadow-black/10 hover:opacity-90 transition-opacity"
              >
                Connect
                <ChevronRight size={14} />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Photography', 'Venues', 'Decor', 'Mehendi', 'Catering'].map((c) => (
                <PartnerChip key={c} label={c} />
              ))}
            </div>
          </motion.div>

          {/* Right collage */}
          <div className="relative">
            <div className="absolute -inset-6 pointer-events-none">
              <svg viewBox="0 0 640 420" className="w-full h-full opacity-[0.35]">
                <path d="M140 105C240 45 295 50 320 90C350 140 420 120 482 94C540 70 585 90 600 130" stroke="rgba(15,23,42,0.35)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                <path d="M120 220C195 200 240 215 270 250C300 286 360 286 416 256C470 228 520 240 560 280" stroke="rgba(15,23,42,0.35)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                <path d="M240 155C270 170 295 190 315 214C335 238 365 246 405 244" stroke="rgba(15,23,42,0.35)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="relative grid grid-cols-2 gap-4 md:gap-5">
              {collage.map((p, i) => (
                <motion.a
                  key={p.name}
                  href={p.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className={`relative rounded-3xl overflow-hidden border border-foreground/10 shadow-xl shadow-black/10 bg-gradient-to-br ${p.color}`}
                  style={{
                    transform:
                      i === 0 ? 'translateY(4px)' :
                      i === 1 ? 'translateY(-6px)' :
                      i === 2 ? 'translateY(10px)' :
                      i === 3 ? 'translateY(-2px)' :
                      i === 4 ? 'translateY(14px)' :
                      'translateY(6px)',
                  }}
                >
                  <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-foreground/60">
                      <span className="text-foreground/60">{categoryIcon[p.category] ?? <Sparkles size={13} />}</span>
                      {p.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="rounded-2xl bg-white/85 backdrop-blur px-3 py-2 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-serif text-sm text-foreground truncate">{p.name}</div>
                        <div className="mt-0.5 flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-foreground/45">
                          <MapPin size={10} />
                          <span className="truncate">{p.location}</span>
                        </div>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Floating icon nodes */}
            <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg shadow-black/10">
                <Sparkles size={16} />
              </div>
            </div>
            <div className="pointer-events-none absolute top-20 -left-4">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg shadow-black/10">
                <Camera size={16} />
              </div>
            </div>
            <div className="pointer-events-none absolute top-44 right-0 translate-x-3">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg shadow-black/10">
                <Flower2 size={16} />
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-10 left-0 -translate-x-2">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg shadow-black/10">
                <UtensilsCrossed size={16} />
              </div>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center font-mono text-xs text-foreground/25 mt-12"
        >
          All partner recommendations are based on Harini&apos;s personal experience and trust. No paid placements.
        </motion.p>
      </div>
    </section>
  );
}
