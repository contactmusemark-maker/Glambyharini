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
    <section id="faq" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 10% 50%, hsl(351 35% 57% / 0.04) 0%, transparent 40%)' }} />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Frequently Asked <span className="italic text-primary/80">Questions</span>
            </h2>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  open === i
                    ? 'border-primary/20 shadow-lg shadow-primary/5'
                    : 'border-foreground/6 hover:border-foreground/10'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-foreground/1 transition-colors"
                >
                  <span className={`text-base font-serif transition-colors ${open === i ? 'text-primary' : 'text-foreground'}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    open === i ? 'bg-primary text-white rotate-0' : 'bg-foreground/6 text-foreground/40'
                  }`}>
                    {open === i ? <Minus size={13} /> : <Plus size={13} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-foreground/5 mb-4" />
                        <p className="text-foreground/60 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-foreground/40 text-sm mb-4">Still have a question?</p>
            <a
              href="https://wa.me/917305306497?text=Hi Harini! I have a question about your makeup services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 text-primary text-sm font-mono tracking-wider hover:bg-primary hover:text-white transition-all duration-300"
            >
              Ask on WhatsApp →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
