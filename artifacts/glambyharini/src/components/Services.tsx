import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Bridal Makeup',
    tag: 'Signature',
    price: '₹8,000',
    image: '/assets/services/bridal.jpeg',
    short: 'Timeless bridal beauty crafted for your most precious day.',
    details: [
      'Full HD or Airbrush finish',
      'Includes pre-bridal trial',
      'Lasts 12–16 hours',
      'Customised to skin tone & outfit',
      'Saree draping included on request',
    ],
  },
  {
    title: 'HD Makeup',
    tag: 'Premium',
    price: '₹4,500',
    image: '/assets/services/hd_makeup.jpeg',
    short: 'Flawless high-definition coverage perfect for photography and video.',
    details: [
      'High-definition formula',
      'Camera-ready finish',
      'Suitable for any occasion',
      'Long-lasting 10+ hours',
      'Foundation matched to skin',
    ],
  },
  {
    title: 'Hair Styling',
    tag: 'Classic',
    price: '₹2,500',
    image: '/assets/services/hair.jpeg',
    short: 'Elegant updos, braids, and modern styling for every occasion.',
    details: [
      'Bridal & reception updos',
      'Open styles & waves',
      'Braids & traditional looks',
      'Hair accessories on request',
      'Suitable for all hair types',
    ],
  },
  {
    title: 'Saree Draping',
    tag: 'Traditional',
    price: '₹1,500',
    image: '/assets/services/saree.jpeg',
    short: 'Traditional and contemporary saree draping expertise.',
    details: [
      'Bridal & reception draping',
      'Madisar & Nauvari styles',
      'Fancy & half-saree draping',
      'Pin & tuck technique',
      'Experience 10+ draping styles',
    ],
  },
  {
    title: 'Nail Art',
    tag: 'Luxury',
    price: '₹1,200',
    image: '/assets/services/nail.jpeg',
    short: 'Intricate nail art designs to complete your entire look.',
    details: [
      'Gel & acrylic options',
      'Custom bridal nail art',
      'Rhinestone & glitter designs',
      'Matching outfit themes',
      'Long-lasting finish',
    ],
  },
  {
    title: 'Facial & Skincare',
    tag: 'Glow',
    price: '₹2,000',
    image: '/assets/services/facial.jpeg',
    short: 'Rejuvenating facials for radiant, glowing skin before your event.',
    details: [
      'Pre-bridal facial packages',
      'De-tan & brightening',
      'Hydrating & glow treatments',
      'Suitable for sensitive skin',
      'Recommended 1 week before event',
    ],
  },
  {
    title: 'Party Makeup',
    tag: 'Glamour',
    price: '₹3,000',
    image: '/assets/services/bridal.jpeg',
    short: 'Glamorous looks for parties, receptions and celebrations.',
    details: [
      'Cocktail & party looks',
      'Bold eye or lip focus',
      'Lasts 8+ hours',
      'Day-to-night transitions',
      'Includes eyelash application',
    ],
  },
  {
    title: 'Photoshoot Makeup',
    tag: 'Editorial',
    price: '₹5,000',
    image: '/assets/services/photoshoot.jpeg',
    short: 'Editorial-quality looks crafted for professional photography.',
    details: [
      'Magazine-worthy finish',
      'Contouring & highlighting',
      'Works with all lighting types',
      'Concept & creative looks',
      'Hair styling add-on available',
    ],
  },
  {
    title: 'Spa & Relaxation',
    tag: 'Wellness',
    price: '₹3,500',
    image: '/assets/services/spa.jpeg',
    short: 'Luxurious spa treatments for total body and mind relaxation.',
    details: [
      'Full body de-stress',
      'Aromatherapy options',
      'Scalp & hair masking',
      'Pre-wedding ritual packages',
      'Available at-home or in-studio',
    ],
  },
];

function FlipCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '400px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden bg-white shadow-md group"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/70 bg-black/30 px-2 py-1 backdrop-blur-sm rounded-sm">
                {service.tag}
              </span>
              <span className="font-serif text-lg font-bold text-white drop-shadow">{service.price}</span>
            </div>
            <div>
              <h3 className="text-xl font-serif text-white mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{service.short}</p>
              <div className="mt-4 flex items-center gap-2 text-white/50">
                <span className="font-mono text-[9px] tracking-widest uppercase">Tap for details</span>
                <ChevronRight size={10} />
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-foreground text-background flex flex-col p-6 shadow-md"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary mb-1 block">
                {service.tag}
              </span>
              <h3 className="text-xl font-serif text-background">{service.title}</h3>
            </div>
            <span className="font-serif text-2xl font-bold text-primary">{service.price}</span>
          </div>

          <div className="w-12 h-px bg-primary mb-5" />

          <ul className="space-y-3 flex-1">
            {service.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-background/70">
                <span className="text-primary mt-0.5 shrink-0">—</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-background/10 text-center">
            <p className="font-mono text-[9px] tracking-widest uppercase text-background/30">Tap to flip back</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-40 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-[0.2em] uppercase text-primary"
          >
            Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif mt-3 mb-4"
          >
            Services & Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-mono text-xs tracking-widest uppercase"
          >
            Tap any card to reveal full details
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <FlipCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
