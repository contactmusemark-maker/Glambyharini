import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Droplets, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

type BlogSection = {
  heading: string;
  body: string;
};

type BlogPost = {
  slug: string;
  tag: string;
  tagClass: string;
  title: string;
  excerpt: string;
  read: string;
  image: string;
  highlights: string[];
  sections: BlogSection[];
};

const POSTS: BlogPost[] = [
  {
    slug: "bridal-skin-prep",
    tag: "Bridal Prep",
    tagClass: "bg-primary/10 text-primary",
    title: "6-Week Bridal Skin Prep (No Guesswork)",
    excerpt:
      "A simple, realistic routine you can actually follow — so your base makeup sits smoother and lasts longer.",
    read: "6 min",
    image: "/assets/blog/blog-1.png",
    highlights: [
      "What to start 6 weeks before",
      "Safe exfoliation schedule",
      "Wedding-week do & don’t list",
    ],
    sections: [
      {
        heading: "Week 6–4: Build the basics",
        body:
          "Gentle cleanser + moisturiser twice daily. Add SPF every morning. If you’re using Vitamin C, start low and stay consistent.",
      },
      {
        heading: "Week 3–2: Smooth texture",
        body:
          "Exfoliate 1–2x/week (not more). Hydrate nightly. If you’re doing facials, pick one trusted place and keep it calm — no harsh peels.",
      },
      {
        heading: "Week 1: Protect the glow",
        body:
          "No new products. Prioritise sleep, water, and simple meals. Keep lips hydrated so lipstick applies evenly on the day.",
      },
    ],
  },
  {
    slug: "humidity-proof-makeup",
    tag: "Tips & Tricks",
    tagClass: "bg-accent/15 text-foreground",
    title: "Humidity-Proof Makeup for Long Events",
    excerpt:
      "Tamil Nadu heat and long ceremonies? Here’s how to keep your face fresh from muhurtham to reception.",
    read: "5 min",
    image: "/assets/blog/blog-2.png",
    highlights: [
      "Primer + base pairing",
      "Powder placement map",
      "Touch-up kit essentials",
    ],
    sections: [
      {
        heading: "Base rule: thin layers",
        body:
          "Use a gripping primer only where you need it (T-zone). Apply foundation in light layers, pressing in with a sponge — not swiping.",
      },
      {
        heading: "Set smart, not heavy",
        body:
          "Powder only the crease zones: under eyes, sides of nose, smile lines, chin. Leave cheeks more skin-like for glow in photos.",
      },
      {
        heading: "Fixing spray: two times",
        body:
          "One mist after creams, one after powders. It locks in without making your makeup look dry.",
      },
    ],
  },
  {
    slug: "bridal-eyes-that-photograph",
    tag: "Photos",
    tagClass: "bg-purple-100/80 text-purple-700",
    title: "Eye Makeup That Pops on Camera",
    excerpt:
      "How to avoid ‘flat’ eyes in photos — and make liner, lashes, and shimmer read beautifully.",
    read: "4 min",
    image: "/assets/blog/blog-3.png",
    highlights: [
      "Correct shimmer placement",
      "Lash style that suits you",
      "Avoid flashback mistakes",
    ],
    sections: [
      {
        heading: "Depth first, shimmer second",
        body:
          "Start with soft browns to create dimension. Keep shimmer on the inner lid/center. Too much shimmer everywhere can wash out your shape.",
      },
      {
        heading: "Liner for your eye shape",
        body:
          "A thinner inner line + lifted outer wing usually photographs best. If your eyes are hooded, keep the wing higher, not thicker.",
      },
      {
        heading: "Flash-safe under eyes",
        body:
          "Avoid heavy SPF directly under concealer. Use a small amount, let it set, then conceal. This reduces the grey/white cast in flash photos.",
      },
    ],
  },
  {
    slug: "jewelry-makeup-balance",
    tag: "Styling",
    tagClass: "bg-rose-100/80 text-rose-700",
    title: "Match Jewelry + Makeup Without Overdoing It",
    excerpt:
      "Gold, diamond, temple jewelry — a quick guide to balance tones, blush, and lipstick for each look.",
    read: "5 min",
    image: "/assets/blog/blog-4.png",
    highlights: [
      "Gold vs rose-gold rules",
      "Lipstick shade shortcuts",
      "Blush placement for sarees",
    ],
    sections: [
      {
        heading: "Gold/Temple jewelry",
        body:
          "Warm blush + warm lip (terracotta/brick) looks richest. Keep highlight subtle so gold stays the main shine.",
      },
      {
        heading: "Diamond / silver tones",
        body:
          "Go cleaner: rosy blush, mauve/berry lip, and slightly cooler highlight. It reads modern and crisp on camera.",
      },
      {
        heading: "Heavy jewelry? Simplify one thing",
        body:
          "If the jewelry is bold, soften the eye OR the lip. Let one feature be the hero — it looks expensive and intentional.",
      },
    ],
  },
  {
    slug: "touch-up-kit",
    tag: "Checklist",
    tagClass: "bg-emerald-100/80 text-emerald-700",
    title: "The Bridal Touch-Up Kit (Tiny but Powerful)",
    excerpt:
      "No bulky bag — just the right mini kit so you can fix shine, lipstick, and kajal quickly.",
    read: "3 min",
    image: "/assets/blog/blog-5.png",
    highlights: ["Blot first, then powder", "Lip combo list", "Tear-proof essentials"],
    sections: [
      {
        heading: "The 6 items that matter",
        body:
          "Blotting paper, compact powder, lipstick + liner, cotton buds, mini setting spray, and a few safety pins. That’s it.",
      },
      {
        heading: "The correct order",
        body:
          "Blot → powder only where needed → lipstick touch-up. Powdering before blotting makes it cakey.",
      },
      {
        heading: "Emergency fixes",
        body:
          "Cotton buds remove mascara smudges instantly. A tiny bit of moisturiser on fingers smooths any dry patches without ruining makeup.",
      },
    ],
  },
  {
    slug: "wedding-day-beauty-timeline",
    tag: "Timeline",
    tagClass: "bg-sky-100/80 text-sky-700",
    title: "Wedding-Day Beauty Timeline (Stress-Free)",
    excerpt:
      "A simple schedule so you’re ready early — with time for photos, family, and zero rushing.",
    read: "6 min",
    image: "/assets/blog/blog-6.png",
    highlights: ["When to eat & hydrate", "Photo-ready buffer time", "Hair + saree order"],
    sections: [
      {
        heading: "4–5 hours before: start calm",
        body:
          "Eat something light but filling. Avoid extra salt/spice. Hydrate steadily — not all at once — so you don’t feel bloated.",
      },
      {
        heading: "Hair first, then base",
        body:
          "If your hairstyle uses heat or strong spray, do hair first. It keeps your face clean and prevents product fall on finished makeup.",
      },
      {
        heading: "Keep a photo buffer",
        body:
          "Aim to be fully ready 45–60 minutes before you ‘need’ to be. That buffer is where the best photos happen.",
      },
    ],
  },
];

function BlogCollageCard({
  post,
  variant,
  onOpen,
}: {
  post: BlogPost;
  variant: "image" | "text" | "feature" | "mini";
  onOpen: (post: BlogPost) => void;
}) {
  const imageCard = variant === "image" || variant === "feature";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-foreground/8 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-black/10",
        variant === "feature" && "h-[380px] bg-white md:h-[420px]",
        variant === "image" && "h-[270px] bg-white md:h-[310px]",
        variant === "text" && "h-[220px] bg-secondary/35 p-6",
        variant === "mini" && "h-[220px] bg-white p-6"
      )}
    >
      {imageCard ? (
        <>
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <div className="absolute left-5 top-5 flex gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
              {post.tag}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
              {post.read}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(post)}
            aria-label={`Open ${post.title}`}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg transition hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowUpRight size={17} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-serif text-2xl leading-tight text-white md:text-3xl">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">{post.excerpt}</p>
          </div>
        </>
      ) : (
        <button type="button" onClick={() => onOpen(post)} className="flex h-full w-full flex-col text-left">
          <div className="flex items-center justify-between gap-4">
            <span className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest ${post.tagClass}`}>
              {post.tag}
            </span>
            <ArrowUpRight size={18} className="text-foreground/45" />
          </div>
          <div className="mt-auto">
            <h3 className="font-serif text-2xl leading-tight text-foreground">{post.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/60">{post.excerpt}</p>
          </div>
        </button>
      )}
    </motion.div>
  );
}

export default function BlogsAndTips() {
  const [open, setOpen] = useState<BlogPost | null>(null);

  const featured = useMemo(() => POSTS.slice(0, 5), []);
  const ticker = ["Bridal Prep", "Skin Glow", "Makeup Tips", "Beauty Timeline", "Touch-Up Kit"];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section id="blogs" className="relative overflow-hidden bg-[#fbf8f1] py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute left-8 top-8 hidden h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary shadow-sm md:flex">
        <Sparkles size={20} />
      </div>
      <div className="pointer-events-none absolute right-10 top-12 hidden h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary shadow-sm md:flex">
        <Droplets size={20} />
      </div>

      <div className="relative z-10 mx-auto w-[90vw] max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
            Beauty Journal
          </span>
          <h2 className="mt-5 font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
            Learn the <span className="rounded-full bg-secondary px-4 text-primary">art</span> behind
            <span className="block">every glow</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground/58">
            Short, useful bridal beauty notes for prep, makeup longevity, styling, and calm wedding-day planning.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.18fr_1fr] lg:items-end">
          <div className="grid gap-5">
            <div className="rounded-[2rem] bg-secondary/40 p-6">
              <BookOpen size={34} className="text-primary" />
              <p className="mt-10 max-w-xs text-sm leading-6 text-foreground/65">
                Practical beauty guides for brides who want skin-first, camera-ready results without overwhelm.
              </p>
            </div>
            <BlogCollageCard post={featured[1]} variant="text" onOpen={(p) => setOpen(p)} />
          </div>

          <BlogCollageCard post={featured[0]} variant="feature" onOpen={(p) => setOpen(p)} />

          <div className="grid gap-5">
            <BlogCollageCard post={featured[2]} variant="image" onOpen={(p) => setOpen(p)} />
            <BlogCollageCard post={featured[3]} variant="mini" onOpen={(p) => setOpen(p)} />
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <BlogCollageCard post={featured[4]} variant="image" onOpen={(p) => setOpen(p)} />
          <button
            type="button"
            onClick={() => setOpen(POSTS[5])}
            className="group flex min-h-[220px] items-center justify-between gap-5 rounded-[2rem] border border-foreground/8 bg-white/75 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Timeline</div>
              <h3 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-foreground">
                Plan your wedding-day beauty schedule with zero rushing.
              </h3>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition group-hover:bg-primary">
              <ArrowUpRight size={18} />
            </span>
          </button>
        </div>

        <div className="-mx-[5vw] mt-12 overflow-hidden border-y border-primary/20 bg-secondary/65 py-3">
          <div className="flex min-w-max animate-[marquee_28s_linear_infinite] gap-5 font-mono text-xs uppercase tracking-widest text-foreground/70">
            {[...ticker, ...ticker, ...ticker].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-5">
                {item}
                <Sparkles size={14} className="text-primary" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-10 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(null);
            }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/20 bg-white shadow-2xl"
            >
              <div className="relative">
                <div className="relative h-56 md:h-72 w-full overflow-hidden">
                  <img
                    src={open.image}
                    alt={open.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  <div className="absolute left-6 bottom-6 right-20">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 border border-white/40">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase ${open.tagClass}`}>
                        {open.tag}
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-foreground/70">
                        {open.read} read
                      </span>
                    </div>
                    <div className="mt-3 text-white text-2xl md:text-3xl font-serif leading-tight">
                      {open.title}
                    </div>
                    <div className="mt-2 text-white/80 text-sm md:text-base max-w-2xl">
                      {open.excerpt}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/80 backdrop-blur border border-white/40 hover:bg-white transition-colors"
                  aria-label="Close details"
                >
                  <X size={18} className="text-foreground/70" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="rounded-2xl border border-foreground/10 bg-secondary/25 p-5">
                    <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                      Quick checklist
                    </div>
                    <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                      {open.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-1 w-2 h-2 rounded-full bg-primary/70 shrink-0" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    {open.sections.map((s) => (
                      <div key={s.heading} className="rounded-2xl border border-foreground/10 p-5 bg-white">
                        <div className="font-serif text-lg text-foreground">{s.heading}</div>
                        <div className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.body}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-foreground hover:bg-secondary/30 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
