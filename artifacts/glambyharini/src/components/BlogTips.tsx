import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const posts = [
  {
    slug: 'bridal-skin-prep',
    tag: 'Bridal Prep',
    tagColor: 'bg-pink-100 text-pink-600',
    title: '6-Week Bridal Skin Prep Guide',
    excerpt: 'Your skin is the canvas. Start this routine 6 weeks before your wedding for a naturally radiant, camera-ready glow.',
    read: '5 min',
    image: '/assets/blogtips/hd-makeup-photo.jpeg',
    emoji: '✨',
    color: 'from-pink-50 to-rose-50',
    content: [
      { week: 'Week 6', tip: 'Begin a gentle double-cleanse routine morning and night. Add a Vitamin C serum to target dark spots and even out skin tone.' },
      { week: 'Week 5', tip: 'Introduce a hyaluronic acid moisturiser. Drink 2–3 litres of water daily. Avoid processed sugar — it triggers breakouts.' },
      { week: 'Week 4', tip: 'Add a weekly face mask (clay for oily, hydrating sheet for dry). Start taking Biotin supplements for hair and skin.' },
      { week: 'Week 3', tip: 'Book your trial makeup session with Harini so we can test products on your actual skin.' },
      { week: 'Week 2', tip: 'Switch to fragrance-free products only. Avoid any new skincare — no experiments this close to the date.' },
      { week: 'Week 1', tip: 'Facial lymphatic massage daily. Sleep 8 hours. No alcohol or salty food. Your skin will thank you.' },
    ],
  },
  {
    slug: 'long-lasting-makeup',
    tag: 'Tips & Tricks',
    tagColor: 'bg-purple-100 text-purple-600',
    title: 'Make Your Makeup Last All Day',
    excerpt: 'From primer to setting spray — the professional secrets to keeping your bridal or party look flawless from ceremony to reception.',
    read: '4 min',
    image: '/assets/blogtips/photoshoot-makeup.jpeg',
    emoji: '💄',
    color: 'from-purple-50 to-violet-50',
    content: [
      { week: 'Step 1', tip: 'Always start with a silicone-based primer. It fills pores and creates a barrier between skin and foundation for all-day hold.' },
      { week: 'Step 2', tip: 'Use a damp beauty sponge to apply foundation — never fingers. This gives 40% more coverage with 60% less product.' },
      { week: 'Step 3', tip: 'Bake under-eye concealer with setting powder for 5 minutes before dusting off. Zero creasing guaranteed.' },
      { week: 'Step 4', tip: 'Set your eyeshadow with a primer. Urban Decay Primer Potion makes colours pop and stay vibrant for 12+ hours.' },
      { week: 'Step 5', tip: 'Use a setting spray throughout the day — not just at the end. It melts layers together and re-activates coverage.' },
      { week: 'Touch-up Kit', tip: 'Carry: blotting paper, pressed powder, a lipstick, and a mini setting spray. Never tissue — it removes makeup.' },
    ],
  },
  {
    slug: 'south-indian-bridal-looks',
    tag: 'Bridal Trends',
    tagColor: 'bg-amber-100 text-amber-600',
    title: 'South Indian Bridal Makeup Trends 2025',
    excerpt: 'From Kanjeevaram-inspired gold to modern minimalist brides — the looks dominating Tamil Nadu weddings this season.',
    read: '6 min',
    image: '/assets/blogtips/beautiful-bridal-makeup-look.jpeg',
    emoji: '👑',
    color: 'from-amber-50 to-yellow-50',
    content: [
      { week: 'Trend 1', tip: 'Glass Skin Bride: Ultra-dewy, luminous base with barely-there coverage. Perfect for outdoor ceremonies and pre-wedding shoots.' },
      { week: 'Trend 2', tip: 'Kohl-Rimmed Eyes: Deep black kajal with smudged inner rim. Timeless for traditional ceremonies — especially with silk sarees.' },
      { week: 'Trend 3', tip: 'Terracotta Lip: Earthy, warm lip shades are replacing classic red. Pairs beautifully with both silk and pastel lehengas.' },
      { week: 'Trend 4', tip: 'Gold Shimmer Under-eye: A dot of gold highlight at the inner corner makes eyes look larger — huge for photography.' },
      { week: 'Trend 5', tip: 'Barely-There Blush: Draping blush from temple to cheek in terracotta or dusty rose is the most requested look of 2025.' },
      { week: 'Trend 6', tip: 'Negative Space Lids: Clean lid with a defined crease line and no eyeshadow — ultra-modern and editorial.' },
    ],
  },
  {
    slug: 'self-care-before-wedding',
    tag: 'Wellness',
    tagColor: 'bg-green-100 text-green-600',
    title: 'The Bride\'s Self-Care Ritual',
    excerpt: 'Wedding planning is stressful. Here\'s a calming routine to keep you glowing, grounded and gorgeous in the weeks leading up to your day.',
    read: '3 min',
    image: '/assets/blogtips/facial-skin-care.jpeg',
    emoji: '🌿',
    color: 'from-green-50 to-emerald-50',
    content: [
      { week: 'Morning', tip: 'Start with 10 minutes of oil pulling (coconut or sesame) for natural teeth whitening and gum health.' },
      { week: 'Afternoon', tip: 'A 15-minute walk outside — sunlight regulates cortisol (stress hormone) which directly impacts skin clarity.' },
      { week: 'Evening', tip: 'Abhyanga (self-oil massage) with warm sesame oil. Helps with sleep, anxiety and keeps skin deeply moisturised.' },
      { week: 'Weekly', tip: 'Rose water + aloe vera face mist throughout the day. Keeps skin plump and reduces redness from stress.' },
      { week: 'Diet', tip: 'Moringa powder in warm water every morning. Rich in antioxidants — dramatically improves skin texture in 2–3 weeks.' },
      { week: 'Sleep', tip: 'Silk pillowcase only. Reduces friction, prevents sleep lines and keeps both hair and skin smoother overnight.' },
    ],
  },
];

export default function BlogTips() {
  const [open, setOpen] = useState<typeof posts[0] | null>(null);

  return (
    <section id="blog" className="py-20 md:py-32 bg-[#fbf8f1] relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 w-[46rem] h-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 border border-foreground/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">Beauty Blog</span>
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-serif text-foreground">
            Featured Tips &amp; <span className="italic text-primary/80">Guides</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground/55 max-w-2xl mx-auto">
            Bridal prep, long-wear makeup, wellness rituals, and real advice to help you look (and feel) your best.
          </p>
        </motion.div>

        {/* Collage grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-[190px] md:auto-rows-[210px] xl:auto-rows-[230px]">
          {/* Featured (left) */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            onClick={() => setOpen(posts[2])}
            className="relative md:col-span-2 xl:col-span-1 row-span-2 rounded-[28px] overflow-hidden border border-foreground/10 shadow-2xl shadow-black/10 text-left group"
          >
            <img src={posts[2].image} alt={posts[2].title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#7d0f2a]/90 text-white px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase shadow-sm">
                <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">★</span>
                Featured
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-[1.05] drop-shadow">
                {posts[2].title}
              </h3>
              <p className="mt-2 text-white/70 text-xs font-mono tracking-widest uppercase">
                Bold · Timeless · You
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#7d0f2a]/80 text-white px-5 py-3 text-xs font-mono tracking-widest uppercase border border-white/15 shadow-lg shadow-black/20">
                Explore Trends <ChevronRight size={14} />
              </div>
            </div>
          </motion.button>

          {/* Quick & Adaptable (top middle) */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            onClick={() => setOpen(posts[1])}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10 text-left bg-white"
          >
            <img
              src="/assets/blogtips/saree-draping.jpeg"
              alt="Quick & Adaptable"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0" />
            <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/90 backdrop-blur border border-foreground/10 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  ✦
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-xl text-foreground leading-tight">Quick &amp; Adaptable</div>
                  <p className="mt-2 text-sm text-foreground/55 line-clamp-2">
                    From primer to setting spray — the professional way.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary">
                    Read more <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Bridal Prep (top right) */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            onClick={() => setOpen(posts[0])}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10 text-left group"
          >
            <img src={posts[0].image} alt={posts[0].title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-[#fff4f0]/90 backdrop-blur border border-foreground/10 p-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-serif text-2xl text-foreground leading-tight">Bridal Prep</div>
                <div className="mt-1 text-[11px] font-mono tracking-widest uppercase text-primary/80">
                  {posts[0].read} read
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#7d0f2a] text-white flex items-center justify-center shadow-lg shadow-black/10">
                <ChevronRight size={18} />
              </div>
            </div>
          </motion.button>

          {/* Rest assured (bottom left) */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            onClick={() => setOpen(posts[3])}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10 text-left bg-white p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                ✿
              </div>
              <img
                src="/assets/blogtips/nail-art.jpeg"
                alt="Rest assured"
                className="w-12 h-12 rounded-2xl object-cover ring-1 ring-black/10 shrink-0"
                loading="lazy"
              />
            </div>
            <div className="mt-5">
              <div className="font-serif text-2xl text-foreground leading-tight">Rest Assured,</div>
              <div className="font-serif text-2xl text-foreground leading-tight">We&apos;ve Got You</div>
              <p className="mt-4 text-sm text-foreground/55 leading-relaxed line-clamp-3">
                No confusing routines — just simple steps that work for South Indian skin tones and long-wear makeup.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary">
                Get Started <ChevronRight size={14} />
              </div>
            </div>
          </motion.button>

          {/* Wedding Planning (image tile) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10"
          >
            <img
              src="/assets/blogtips/photoshoot-makeup.jpeg"
              alt="Wedding planning"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </motion.div>

          {/* Makeup setup (image tile) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10"
          >
            <img
              src="/assets/blogtips/hd-makeup-photo.jpeg"
              alt="Makeup tools"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </motion.div>

          {/* Wellness Ritual (bottom middle) */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
            onClick={() => setOpen(posts[3])}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10 text-left bg-white"
          >
            <img src={posts[3].image} alt={posts[3].title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-[#efeaff]/90 backdrop-blur border border-foreground/10 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/80 border border-foreground/10 flex items-center justify-center text-primary">
                  ❀
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-xl text-foreground leading-tight">Wellness Ritual</div>
                  <p className="mt-2 text-sm text-foreground/55 line-clamp-2">
                    Wedding planning is stressful. Here&apos;s a calming guide to reset your mind.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary">
                    View guide <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Make Your Makeup Last All Day (bottom right) */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 }}
            onClick={() => setOpen(posts[1])}
            className="relative rounded-[28px] overflow-hidden border border-foreground/10 shadow-xl shadow-black/10 text-left group"
          >
            <img src="/assets/blogtips/beautiful-bridal-makeup-look.jpeg" alt={posts[1].title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-[#fff4f0]/90 backdrop-blur border border-foreground/10 p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  💄
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xl text-foreground leading-tight">Make Your Makeup Last All Day</div>
                  <div className="mt-1 text-[11px] font-mono tracking-widest uppercase text-primary/80">
                    Tips &amp; tricks <ChevronRight className="inline" size={12} />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Why you'll love it here */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="md:col-span-2 xl:col-span-2 rounded-[28px] bg-white border border-foreground/10 shadow-xl shadow-black/5 px-6 py-7 flex flex-col justify-center"
          >
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-foreground">Why You&apos;ll Love It Here</div>
              <div className="mt-2 h-px w-24 mx-auto bg-primary/30" />
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { title: 'Expert Guidance', desc: 'Professional tips from experienced artists' },
                { title: 'Tailored for You', desc: 'Routines that suit your skin & style' },
                { title: 'Wedding Ready', desc: 'Look your best for every event, stress-free' },
                { title: 'Real & Relatable', desc: 'Practical advice that actually works' },
              ].map((f) => (
                <div key={f.title} className="text-center">
                  <div className="mx-auto w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20" />
                  <div className="mt-3 text-sm font-serif text-foreground">{f.title}</div>
                  <div className="mt-1 text-[11px] text-foreground/55 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[84vh] overflow-y-auto rounded-3xl bg-white border border-foreground/8 shadow-2xl"
            >
              {/* Hero */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={open.image} alt={open.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-full ${open.tagColor}`}>{open.tag}</span>
                    <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-full bg-white/15 text-white backdrop-blur">
                      {open.read} read
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/25 transition-colors shrink-0"
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight">
                    {open.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                  {open.excerpt}
                </p>

                {/* Quick takeaways */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {open.content.slice(0, 3).map((item) => (
                    <div key={item.week} className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
                      <div className="text-[10px] font-mono tracking-widest uppercase text-primary/80">{item.week}</div>
                      <p className="mt-2 text-sm text-foreground/65 leading-relaxed line-clamp-4">
                        {item.tip}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Full details */}
                <div className="mt-8">
                  <div className="flex items-end justify-between gap-4 mb-4">
                    <h4 className="font-serif text-lg text-foreground">Full Routine</h4>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-foreground/35">
                      Tap to read
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {open.content.map((item) => (
                      <details key={item.week} className="group rounded-2xl border border-foreground/10 bg-white overflow-hidden">
                        <summary className="cursor-pointer list-none select-none px-4 py-3 flex items-center gap-3">
                          <span className="shrink-0 w-16 text-[10px] font-mono tracking-widest uppercase text-primary/80">
                            {item.week}
                          </span>
                          <span className="text-sm text-foreground/70 leading-relaxed line-clamp-1 group-open:line-clamp-none">
                            {item.tip}
                          </span>
                          <span className="ml-auto w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center group-open:rotate-90 transition-transform">
                            <ChevronRight size={14} />
                          </span>
                        </summary>
                        <div className="px-4 pb-4 -mt-1">
                          <p className="text-sm text-foreground/65 leading-relaxed">
                            {item.tip}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-foreground/10">
                  <a
                    href="https://wa.me/917305306497?text=Hi Harini! I read your blog and have a question about skincare/makeup."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 rounded-xl bg-foreground text-background text-xs font-mono tracking-widest uppercase hover:bg-foreground/85 transition-colors"
                  >
                    Ask Harini a Question →
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
