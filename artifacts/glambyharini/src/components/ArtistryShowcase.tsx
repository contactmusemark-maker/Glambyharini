import React from 'react';
import { motion } from 'framer-motion';

export default function ArtistryShowcase() {
  const images = [
    { src: "/assets/harini/005_ChatGPT_Image_May_10__2026__10_07_04_AM.png", alt: "Editorial Artistry", title: "Avant-Garde" },
    { src: "/assets/harini/009_Gemini_Generated_Image_p9rgr0p9rgr0p9rg.png", alt: "Concept Makeup", title: "Ethereal Glow" },
    { src: "/assets/harini/011_Too_bold_to_blend_in________Outfit_-__zynqsync_Studio_-__lig.jpg", alt: "Bold Editorial", title: "Bold Editorial" },
    { src: "/assets/harini/013_Perfect_make-up____Perfect_mood__Perfect_look_______makeup__.jpg", alt: "Perfect Look", title: "Classic Glamour" }
  ];

  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-background">The Art of Transformation</h2>
            <div className="w-16 h-px bg-primary"></div>
          </div>
          <p className="max-w-md text-muted-foreground/80">
            Pushing boundaries and redefining beauty standards through meticulous attention to detail and a passion for color.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative group overflow-hidden ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                <h3 className="text-2xl font-serif text-white tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
