import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Trial Look',
    tagline: 'Perfect before the big day',
    price: '₹2,999',
    duration: '2–3 hrs',
    highlight: false,
    badge: null,
    includes: [
      'One complete makeup look',
      'HD / airbrush foundation',
      'Eye, lip & cheek styling',
      'Includes false lashes',
      'Product patch test',
      'Feedback & adjustments',
    ],
    cta: 'Book Trial',
  },
  {
    name: 'Party Glam',
    tagline: 'For every celebration',
    price: '₹5,499',
    duration: '2–3 hrs',
    highlight: false,
    badge: 'Popular',
    includes: [
      'Full HD / airbrush glam',
      'Contouring & highlighting',
      'Customised eye look',
      'Premium false lashes',
      'Setting spray finish',
      'Saree / lehenga draping tips',
    ],
    cta: 'Book Now',
  },
  {
    name: 'Engagement Glow',
    tagline: 'Radiant for your ring day',
    price: '₹9,999',
    duration: '3–4 hrs',
    highlight: false,
    badge: null,
    includes: [
      'Pre-event skin prep & glow',
      'Full HD engagement makeup',
      'Customised eye & lip art',
      'Hairstyling (1 look)',
      'Touch-up kit to carry',
      'Includes 1 trial session',
    ],
    cta: 'Book Now',
  },
  {
    name: 'Bridal Bliss',
    tagline: 'Complete bridal experience',
    price: '₹18,999',
    duration: '5–6 hrs',
    highlight: true,
    badge: 'Best Value',
    includes: [
      '2 trial sessions included',
      'Full bridal HD makeup',
      'Bridal hairstyling (2 looks)',
      'Saree / lehenga draping',
      'Reception look included',
      'On-site touch-up support',
      'Bridesmaid discount (10%)',
      'Premium long-wear products',
    ],
    cta: 'Book Bridal',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 md:py-36 bg-[#f5f6f7] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 15%, rgba(201,169,160,0.18) 0%, transparent 45%), radial-gradient(circle at 20% 85%, rgba(148,163,184,0.18) 0%, transparent 45%)',
        }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 border border-foreground/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">Packages</span>
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-sans font-semibold tracking-tight text-foreground">
            Packages &{' '}
            <span className="relative inline-block">
              Pricing
              <span className="absolute left-0 -bottom-1 h-[7px] w-full bg-primary/25 rounded-full -z-10" />
            </span>
          </h2>
          <p className="mt-3 text-foreground/55 max-w-xl mx-auto text-sm md:text-base">
            Transparent Chennai pricing — no hidden costs. Every look crafted with professional-grade products and care.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-stretch gap-6"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative rounded-[34px] bg-white border border-foreground/10 shadow-xl shadow-black/5 px-6 py-6 flex flex-col transition-all duration-500 ${
                hovered === i ? '-translate-y-1 shadow-2xl shadow-black/10' : ''
              }`}
            >
              {/* Header panel */}
              <div
                className={`rounded-[26px] p-6 border border-foreground/10 ${
                  plan.highlight ? 'bg-[#dbe7ff]' : 'bg-foreground/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-white/80 border border-foreground/10 px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-foreground/60">
                    {plan.badge ?? plan.name}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-foreground/35">
                    {plan.duration}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-foreground/45 font-mono mb-1">
                      /session
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/55">
                    {plan.tagline}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/917305306497?text=Hi Harini! I'm interested in the ${plan.name} package (${plan.price}). Can we discuss?`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center py-3.5 rounded-full text-xs font-mono tracking-widest uppercase bg-gradient-to-b from-[#2b2b2b] to-[#0f0f0f] text-white shadow-lg shadow-black/15 hover:opacity-90 transition-opacity"
              >
                {plan.cta}
              </a>

              <ul className="mt-7 space-y-3 flex-1">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/60">
                    <Check size={14} className="mt-0.5 shrink-0 text-foreground/25" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs font-mono text-foreground/30 mt-10"
        >
          * Travel charges applicable outside Chennai. All prices inclusive of products & lashes.
        </motion.p>
      </div>
    </section>
  );
}
