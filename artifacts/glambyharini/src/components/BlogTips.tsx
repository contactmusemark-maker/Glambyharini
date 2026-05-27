import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, X } from 'lucide-react';

const posts = [
  {
    slug: 'bridal-skin-prep',
    tag: 'Bridal Prep',
    tagColor: 'bg-pink-100 text-pink-600',
    title: '6-Week Bridal Skin Prep Guide',
    excerpt: 'Your skin is the canvas. Start this routine 6 weeks before your wedding for a naturally radiant, camera-ready glow.',
    read: '5 min',
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
    <section id="blog" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Glam Tips</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Beauty <span className="italic text-primary/80">Blog</span>
          </h2>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Expert advice from Harini's makeup chair — skincare routines, bridal trends, and pro tips you can use today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setOpen(post)}
              className={`cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${post.color} border border-foreground/6 hover:shadow-xl hover:shadow-foreground/8 transition-all duration-300 group`}
            >
              <div className="text-4xl mb-4">{post.emoji}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full ${post.tagColor}`}>{post.tag}</span>
                <span className="text-[9px] font-mono text-foreground/30 flex items-center gap-1"><Clock size={9} />{post.read} read</span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary/80 transition-colors">{post.title}</h3>
              <p className="text-sm text-foreground/55 leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-1 text-xs font-mono text-foreground/35 group-hover:text-primary transition-colors">
                Read more <ChevronRight size={12} />
              </div>
            </motion.article>
          ))}
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
              className={`w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br ${open.color} border border-foreground/8 shadow-2xl`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full ${open.tagColor}`}>{open.tag}</span>
                    <h3 className="font-serif text-2xl text-foreground mt-3">{open.title}</h3>
                  </div>
                  <button onClick={() => setOpen(null)} className="w-8 h-8 rounded-full bg-foreground/8 flex items-center justify-center hover:bg-foreground/15 transition-colors shrink-0 mt-1">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-sm text-foreground/55 leading-relaxed mb-8 italic">{open.excerpt}</p>
                <div className="flex flex-col gap-4">
                  {open.content.map((item) => (
                    <div key={item.week} className="flex gap-4">
                      <div className="shrink-0 font-mono text-[10px] tracking-widest uppercase text-primary pt-1 w-16">{item.week}</div>
                      <p className="text-sm text-foreground/65 leading-relaxed">{item.tip}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-foreground/8">
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
