import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How far in advance should I book?',
    a: 'For bridal bookings, we recommend locking in your date at least 3–6 months in advance, especially for peak wedding season (November–February). For party or event glam, 2–4 weeks notice is ideal. Last-minute slots are sometimes available — just WhatsApp us to check.',
  },
  {
    q: 'Do you travel outside Chennai?',
    a: 'Absolutely! We cover all of Tamil Nadu — from Coimbatore and Madurai to Trichy, Salem, and beyond. Outstation bookings include a travel fee based on distance. Destination wedding packages are also available across South India.',
  },
  {
    q: 'What is a trial session and do I need one?',
    a: "A trial is a full run-through of your makeup look done 4–8 weeks before your event. It's strongly recommended for brides — it lets you refine the look, test product longevity, and arrive on your big day completely confident. Trial sessions are included in the Engagement & Bridal packages.",
  },
  {
    q: 'How long does bridal makeup take?',
    a: 'Bridal makeup typically takes 4–6 hours, including hairstyling and draping. We always schedule a comfortable buffer so you are never rushed. For the bridal party, we recommend booking 2–3 hours per person.',
  },
  {
    q: 'What products do you use?',
    a: 'We work exclusively with professional, long-wear, skin-safe brands — MAC, Huda Beauty, NYX, Bobbi Brown, and KIKO Milano for face; Charlotte Tilbury and YSL for lips; and premium Indian bridal brands for traditional looks. All products are hygienic and individual use.',
  },
  {
    q: 'Can you create both traditional and Western looks?',
    a: 'Yes — this is one of our specialties. From classic Tamil silk saree bridal looks with gold-toned base and bold eyes, to contemporary dewy glass-skin editorial glam, we tailor every look to your outfit, skin tone, and personal style.',
  },
  {
    q: 'Is the booking deposit refundable?',
    a: 'A 30% advance deposit is required to confirm your booking. This is non-refundable if cancelled within 14 days of the appointment. Rescheduling is available at no charge if requested at least 7 days before your date, subject to availability.',
  },
  {
    q: 'Do you offer group / bridesmaid packages?',
    a: 'Yes! Bridal Bliss package clients receive a 10% discount for the entire bridal party. We can also accommodate large groups — just get in touch with your guest count and we\'ll plan the day timeline accordingly.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-36 bg-secondary/15 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-4 py-1.5 border border-primary/15 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">FAQs</span>
            </div>

            <h2 className="mt-7 text-4xl md:text-6xl font-mono font-semibold text-foreground leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm md:text-base text-foreground/55 max-w-xl mx-auto">
              Here are some common questions about our services to help you understand better.
            </p>
          </motion.div>

          {/* Grid Accordion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`rounded-2xl bg-white/90 backdrop-blur border transition-all duration-300 shadow-sm shadow-black/5 ${
                    isOpen ? 'border-primary/25 shadow-primary/5' : 'border-foreground/8 hover:border-primary/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="text-sm md:text-base font-mono text-foreground/85 leading-snug">
                      {faq.q}
                    </span>
                    <span className={`mt-0.5 shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-primary text-primary-foreground' : 'bg-foreground/7 text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 -mt-1">
                          <p className="text-foreground/60 text-sm leading-relaxed font-mono">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-foreground/45 text-sm mb-4 font-mono">Still have a question?</p>
            <a
              href="https://wa.me/917305306497?text=Hi Harini! I have a question about your makeup services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-foreground text-background text-xs font-mono tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg shadow-black/10"
            >
              Ask on WhatsApp →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
