import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Heart, Sparkles, Star } from 'lucide-react';

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const collections = [
  {
    title: 'Bridal',
    subtitle: 'Collection',
    desc: 'Temple jewellery, saree draping, HD finish.',
    image: '/assets/clients/000_client.jpg',
    target: '#services',
  },
  {
    title: 'Party',
    subtitle: 'Collection',
    desc: 'Soft glam, shimmer eyes, long-stay base.',
    image: '/assets/clients/020_client.jpg',
    target: '#gallery',
  },
  {
    title: 'Editorial',
    subtitle: 'Collection',
    desc: 'Camera-ready looks for reels and shoots.',
    image: '/assets/clients/013_client.webp',
    target: '#blogs',
  },
];

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-background pt-20 md:pt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <div className="relative z-10">
        <div className="container">
          <div className="grid min-w-0 items-center gap-7 py-5 md:gap-8 md:py-8 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:gap-10 xl:gap-12">
            <div className="relative z-20 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mx-auto mb-5 grid max-w-2xl gap-4 sm:grid-cols-[auto_1fr] sm:items-center md:mb-7 lg:mx-0 lg:mb-6"
              >
                <div className="text-sm leading-snug text-foreground/80 sm:text-left md:text-base">
                  Hello gorgeous!
                  <br />
                  welcome to GlamByHarini
                </div>
                <div className="grid min-w-0 grid-cols-[minmax(5.5rem,8.5rem)_minmax(0,1fr)] items-center gap-3 text-left sm:flex sm:justify-start sm:gap-4">
                  <div className="h-14 w-full overflow-hidden rounded-full border border-primary/20 bg-secondary/25 p-1 sm:w-24">
                    <img
                      src="/assets/Header_Logo_1779783577490.png"
                      alt="GlamByHarini"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="max-w-xs text-sm leading-6 text-foreground/65 md:text-base md:leading-snug">
                    Bridal makeup artistry for effortless, photo-ready transformations.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-mono font-semibold leading-[0.92] tracking-normal text-[clamp(3.5rem,16vw,7.25rem)] text-foreground sm:text-[clamp(3.25rem,8.5vw,7.25rem)]">
                  Fresh &amp;
                  <br />
                  <span className="text-foreground/38">Flawless</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55 }}
                className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-5 sm:flex-row sm:justify-center md:mt-7 lg:mx-0 lg:mt-6 lg:justify-start"
              >
                <p className="max-w-[20rem] text-center text-base leading-7 text-foreground/72 md:max-w-sm md:text-lg lg:text-left">
                  Your gateway to bridal glow, reception glam, and contemporary beauty.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollTo('#booking')}
                    className="min-h-11 rounded-full bg-foreground px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:px-6 md:px-7 md:py-4 md:tracking-[0.18em]"
                  >
                    Book Your Look
                  </button>
                  <button
                    onClick={() => scrollTo('#gallery')}
                    className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-primary hover:text-primary-foreground md:h-14 md:w-14"
                    aria-label="Open gallery"
                  >
                    <ArrowUpRight size={21} />
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="relative mx-auto -mt-2 flex w-full max-w-[420px] items-end justify-center overflow-hidden pb-6 sm:max-w-[520px] sm:pb-12 lg:mt-0 lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 h-[min(82vw,420px)] w-[min(82vw,420px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_42%,hsl(var(--secondary))_0%,hsl(var(--secondary)/0.65)_42%,hsl(var(--primary)/0.16)_68%,transparent_72%)] blur-[1px] md:h-[500px] md:w-[500px] lg:bottom-8 lg:h-[clamp(430px,40vw,590px)] lg:w-[clamp(430px,40vw,590px)]"
              />
              <motion.img
                src="/assets/hero_model.png"
                alt="GlamByHarini makeup model"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 h-auto max-h-[360px] w-auto max-w-[82vw] object-contain object-bottom sm:max-h-[660px] sm:max-w-[86vw] md:max-h-[700px] lg:max-h-[min(74vh,760px)] lg:max-w-full"
                style={{
                  mixBlendMode: 'multiply',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 54%, rgba(0,0,0,0.7) 66%, rgba(0,0,0,0.22) 78%, transparent 92%)',
                  maskImage:
                    'linear-gradient(to bottom, black 0%, black 54%, rgba(0,0,0,0.7) 66%, rgba(0,0,0,0.22) 78%, transparent 92%)',
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-background via-background/90 to-transparent" />
              <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 h-32 w-[86%] -translate-x-1/2 rounded-full bg-background/90 blur-3xl" />

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.55 }}
                className="absolute right-4 top-3 z-20 hidden text-right sm:block lg:right-8"
              >
                <div className="mb-3 flex items-center justify-end gap-1.5">
                  {[Sparkles, Star, Heart].map((Icon, i) => (
                    <span
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/8 bg-white text-primary shadow-sm"
                    >
                      <Icon size={16} />
                    </span>
                  ))}
                </div>
                <p className="font-mono text-xs tracking-widest uppercase text-foreground underline underline-offset-4">
                  Loved by 500+ clients
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="relative z-30 pb-8 md:pb-14"
        >
          <div className="container">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => scrollTo(item.target)}
                  className="group grid min-h-[150px] grid-cols-[minmax(5.5rem,7rem)_minmax(0,1fr)] items-center gap-4 rounded-[1.5rem] border border-foreground/8 bg-white p-4 text-left shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-black/10 sm:min-h-[168px] md:grid-cols-[8rem_minmax(0,1fr)] md:gap-5 md:rounded-[1.75rem]"
                >
                  <div className="aspect-square overflow-hidden rounded-[1.15rem] bg-secondary/20 md:rounded-[1.35rem]">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-mono text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-none text-foreground">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-[clamp(1rem,1.6vw,1.35rem)] leading-none text-foreground/40">
                          {item.subtitle}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-foreground/50 group-hover:text-primary transition-colors shrink-0"
                      />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-foreground/62">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 text-foreground/45">
        <span className="vertical-rl font-mono text-[10px] tracking-[0.25em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll Down
        </span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
