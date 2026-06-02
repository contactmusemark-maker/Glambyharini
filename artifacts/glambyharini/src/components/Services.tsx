import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const pexelsImage = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop`;

const services = [
  {
    title: 'Bridal Makeup',
    tag: 'Signature',
    price: '₹8,000',
    image: '/assets/services/bridal.jpeg',
    images: [
      '/assets/services/bridal-makeup-1.jpg',
      '/assets/services/bridal-makeup-2.jpg',
      '/assets/services/bridal-makeup-3.jpg',
      pexelsImage(15179843),
    ],
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
    images: [
      pexelsImage(35267920),
      pexelsImage(34025154),
      pexelsImage(17094698),
      pexelsImage(8825552),
    ],
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
    images: [
      pexelsImage(29498301),
      pexelsImage(7984818),
      pexelsImage(26759527),
      pexelsImage(30081801),
    ],
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
    images: [
      pexelsImage(28044200),
      pexelsImage(27575174),
      pexelsImage(15179843),
      pexelsImage(34025154),
    ],
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
    images: [
      pexelsImage(22668324),
      pexelsImage(8652722),
      pexelsImage(8809259),
      pexelsImage(18112337),
    ],
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
    images: [
      pexelsImage(3985323),
      pexelsImage(3985329),
      pexelsImage(7446659),
      pexelsImage(6663369),
    ],
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
    images: [
      pexelsImage(34362907),
      pexelsImage(20670748),
      pexelsImage(10551192),
      pexelsImage(10081983),
    ],
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
    images: [
      pexelsImage(11515424),
      pexelsImage(7255476),
      pexelsImage(17043850),
      pexelsImage(33497585),
    ],
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
    images: [
      pexelsImage(27925502),
      pexelsImage(19695951),
      pexelsImage(19641809),
      pexelsImage(6629565),
    ],
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

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const images = service.images ?? [service.image];
  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const currentImage = images[activeImage] ?? service.image;
  const imageSrc = failedImages.includes(currentImage) ? service.image : currentImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex h-full min-w-0 flex-col rounded-[1.5rem] bg-white p-3 shadow-xl shadow-black/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/15 sm:rounded-[34px] sm:p-4"
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-secondary sm:rounded-[28px]">
        <img
          src={imageSrc}
          alt={service.title}
          className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() =>
            setFailedImages((failed) =>
              failed.includes(currentImage) ? failed : [...failed, currentImage]
            )
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/20" />
        <div className="absolute left-3 top-3 rounded-full bg-white/35 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-md sm:left-4 sm:top-4 sm:px-4 sm:text-sm">
          {index === 0 ? 'Best Seller' : service.tag}
        </div>
        <div className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground shadow-lg sm:right-4 sm:top-4 sm:h-12 sm:w-12">
          <Sparkles size={22} />
        </div>
        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-1.5">
          {images.map((image, dot) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(dot)}
              aria-label={`Show ${service.title} image ${dot + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                dot === activeImage ? 'w-6 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-6 sm:px-2 sm:pt-7">
        <h3 className="text-xl font-sans font-semibold tracking-tight text-foreground sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-1 text-lg font-semibold text-foreground/35 sm:text-xl">{service.tag}</p>
        <p className="mt-3 flex-1 text-sm leading-6 text-foreground/45 sm:text-base sm:leading-snug">
          {service.short}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 sm:mt-8">
          <div className="rounded-full bg-foreground/5 px-4 py-3 text-lg font-semibold text-foreground sm:px-5 sm:text-xl">
            {service.price}
          </div>
          <a
            href={`https://wa.me/917305306497?text=${encodeURIComponent(`Hi Harini! I'm interested in ${service.title} (${service.price}). Can we discuss availability?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-fit flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-base font-semibold text-background transition hover:bg-primary sm:flex-none"
          >
            Book Now
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-foreground">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-[#f3f3f3] py-20 md:py-32">
      <div className="container relative z-10">
        <div className="text-center mb-14">
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
            className="text-4xl md:text-6xl font-serif mt-3 mb-4 text-foreground"
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
            Select your beauty experience
          </motion.p>
        </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] items-stretch gap-5 sm:gap-7">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
