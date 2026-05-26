import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Wind, Layers, PaintBucket, Leaf, Star, Camera, Moon } from 'lucide-react';

const servicesList = [
  { icon: Heart, title: "Bridal Makeup", desc: "Timeless bridal beauty crafted for your special day." },
  { icon: Sparkles, title: "HD Makeup", desc: "Flawless high-definition coverage for photography." },
  { icon: Wind, title: "Hair Styling", desc: "Elegant updos, braids, and styling for every occasion." },
  { icon: Layers, title: "Saree Draping", desc: "Traditional and contemporary saree draping expertise." },
  { icon: PaintBucket, title: "Nail Art", desc: "Intricate nail art designs to complete your look." },
  { icon: Leaf, title: "Facial & Skincare", desc: "Rejuvenating facials for radiant, glowing skin." },
  { icon: Star, title: "Party Makeup", desc: "Glamorous looks for parties and celebrations." },
  { icon: Camera, title: "Photoshoot", desc: "Editorial-quality looks for professional photography." },
  { icon: Moon, title: "Spa & Relax", desc: "Luxurious spa treatments for total relaxation." }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-40 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
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
            className="text-4xl md:text-5xl font-serif mt-4 mb-6"
          >
            Artistry Services
          </motion.h2>
          <div className="w-16 h-px bg-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <service.icon className="w-10 h-10 text-primary mb-6 stroke-[1.5]" />
              <h3 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
