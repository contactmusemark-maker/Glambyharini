import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

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
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 md:py-40 bg-background relative overflow-hidden">
      {/* bg texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, hsl(351 35% 57% / 0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, hsl(39 46% 61% / 0.05) 0%, transparent 50%)' }} />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Investment</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Packages & <span className="italic text-primary/80">Pricing</span>
          </h2>
          <p className="text-foreground/50 max-w-lg mx-auto text-sm">
            Transparent Chennai pricing — no hidden costs. Every look crafted with professional-grade products and care.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-500 cursor-default ${
                plan.highlight
                  ? 'bg-foreground text-background shadow-2xl shadow-foreground/20 scale-[1.03]'
                  : 'bg-white border border-foreground/8 shadow-sm'
              } ${hovered === i && !plan.highlight ? 'shadow-xl -translate-y-1' : ''}`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase ${
                  plan.highlight ? 'bg-primary text-white' : 'bg-accent text-foreground'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-serif text-xl mb-1 ${plan.highlight ? 'text-background' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs font-mono tracking-wide ${plan.highlight ? 'text-background/50' : 'text-foreground/40'}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-serif ${plan.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {plan.price}
                </span>
                <span className={`text-xs ml-2 font-mono ${plan.highlight ? 'text-background/40' : 'text-foreground/30'}`}>
                  / {plan.duration}
                </span>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className={`mt-0.5 shrink-0 ${plan.highlight ? 'text-primary' : 'text-primary/70'}`} />
                    <span className={plan.highlight ? 'text-background/70' : 'text-foreground/60'}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/917305306497?text=Hi Harini! I'm interested in the ${plan.name} package (${plan.price}). Can we discuss?`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-xl text-sm font-mono tracking-wider uppercase transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-foreground/15 text-foreground hover:bg-foreground hover:text-background'
                }`}
              >
                {plan.cta}
              </a>
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
