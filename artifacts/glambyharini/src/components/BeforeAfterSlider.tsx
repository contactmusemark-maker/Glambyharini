import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const transformations = [
  {
    label: "Bridal Soft Glam",
    before: "/assets/clients/suvetha-k-before.png",
    after: "/assets/clients/suvetha-k-after.png",
    client: "Suvetha K",
    occasion: "Wedding Morning",
    finish: "HD matte glow",
    focus: "Skin prep, eye definition, saree setting",
  },
  {
    label: "Party Glow",
    before: "/assets/clients/sneha-before.png",
    after: "/assets/clients/sneha-after.png",
    client: "Sneha",
    occasion: "Evening Event",
    finish: "Dewy glam",
    focus: "Base correction, soft contour, glossy finish",
  },
  {
    label: "Traditional Bride",
    before: "/assets/clients/gomathi-before.png",
    after: "/assets/clients/gomathi-after.png",
    client: "Gomathi",
    occasion: "Marriage Look",
    finish: "Classic bridal",
    focus: "Long-wear base, bold eyes, jewelry balance",
  },
];

type Transformation = (typeof transformations)[number];

const scrollTo = (id: string) => {
  const element = document.querySelector(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

function ComparisonSlider({ transformation }: { transformation: Transformation }) {
  const [position, setPosition] = useState(54);

  return (
    <div className="relative rounded-[2rem] border border-white/60 bg-white/72 p-3 shadow-2xl shadow-primary/15 backdrop-blur-xl md:rounded-[2.5rem] md:p-4">
      <div className="relative h-[440px] overflow-hidden rounded-[1.5rem] bg-secondary/30 md:h-[560px] lg:h-[640px] md:rounded-[2rem]">
        <img
          src={transformation.after}
          alt={`${transformation.client} after makeup`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading="eager"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={transformation.before}
            alt={`${transformation.client} before makeup`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-6">
          <span className="rounded-full bg-black/45 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-md">
            Before
          </span>
          <span className="rounded-full bg-white/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground shadow-sm backdrop-blur-md">
            After
          </span>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_34px_rgba(0,0,0,0.38)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-white text-primary shadow-2xl md:h-16 md:w-16">
            <MoveHorizontal size={22} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">
            {transformation.occasion}
          </div>
          <div className="mt-2 font-serif text-3xl leading-tight md:text-5xl">
            {transformation.label}
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label={`Compare before and after for ${transformation.client}`}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-col-resize opacity-0"
        />
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);
  const transformation = transformations[active];

  const goToPrevious = () =>
    setActive((current) => (current === 0 ? transformations.length - 1 : current - 1));
  const goToNext = () =>
    setActive((current) => (current === transformations.length - 1 ? 0 : current + 1));

  return (
    <section
      id="transformations"
      className="relative overflow-hidden bg-[#fbf7f2] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-16 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-accent/12 blur-3xl" />

      <div className="relative mx-auto w-[90vw] max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
              Transformation Showcase
            </span>
            <h2 className="mt-5 font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] text-foreground">
              Real Transformations
              <span className="mt-2 block text-foreground/38">Before → After</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-foreground/62 lg:mx-0">
              A cinematic look at how thoughtful prep, balanced detailing, and long-wear artistry
              turn every client moment into a polished keepsake.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-xl">
              {[
                ["3", "Curated Looks"],
                ["HD", "Camera Finish"],
                ["12h+", "Long Wear"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/70 bg-white/60 px-5 py-4 shadow-sm backdrop-blur"
                >
                  <div className="font-serif text-3xl text-primary">{value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/45">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() => scrollTo("#booking")}
                className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-background transition hover:bg-primary"
              >
                Book a Transformation
                <ArrowUpRight size={17} />
              </button>
              <div className="flex items-center gap-3 rounded-full border border-primary/15 bg-white/60 px-5 py-3 text-left shadow-sm backdrop-blur">
                <Sparkles size={18} className="text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/55">
                  Skin-first finish
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <ComparisonSlider key={active} transformation={transformation} />
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col gap-5 lg:ml-auto lg:max-w-[760px]">
          <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
            {transformations.map((item, index) => {
              const selected = index === active;

              return (
                <button
                  key={item.client}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "rounded-full border px-5 py-3 text-left transition",
                    selected
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "border-foreground/10 bg-white/70 text-foreground/62 hover:border-primary/30"
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                    {item.client}
                  </span>
                  <span className="ml-3 text-sm font-semibold">{item.finish}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 lg:justify-end">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous transformation"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/40">
              {String(active + 1).padStart(2, "0")} / {String(transformations.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next transformation"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
