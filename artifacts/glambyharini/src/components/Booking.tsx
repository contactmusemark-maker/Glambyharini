import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Loader2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const services = [
  'Bridal Makeup',
  'HD Makeup',
  'Hair Styling',
  'Saree Draping',
  'Nail Art',
  'Facial & Skincare',
  'Party Makeup',
  'Photoshoot Makeup',
  'Spa & Relaxation',
];

function FloatingField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
        {label}
      </label>
      {children}
      {error && <p className="text-destructive text-xs mt-1 font-mono">{error}</p>}
    </div>
  );
}

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 4000);
  };

  const inputClass =
    'w-full bg-white/50 border border-border/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 backdrop-blur-sm';

  return (
    <section id="booking" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-sm tracking-[0.2em] uppercase text-primary"
            >
              Reserve Your Spot
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-serif mt-3"
            >
              Book Your Transformation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mt-4"
            >
              Let us craft a look that celebrates your unique beauty. Fill in the details below.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-8 md:p-12"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <CheckCircle className="text-primary mx-auto mb-4" size={56} />
                <h3 className="text-2xl font-serif mb-3">Booking Request Received</h3>
                <p className="text-muted-foreground font-sans">
                  Thank you for choosing GlamByHarini. We will get back to you within 24 hours to confirm your appointment.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingField label="Full Name" error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="Your name"
                      className={inputClass}
                      data-testid="input-name"
                    />
                  </FloatingField>
                  <FloatingField label="Email" error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                      data-testid="input-email"
                    />
                  </FloatingField>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingField label="Phone" error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+91 99999 99999"
                      className={inputClass}
                      data-testid="input-phone"
                    />
                  </FloatingField>
                  <FloatingField label="Date" error={errors.date?.message}>
                    <input
                      {...register('date')}
                      type="date"
                      className={inputClass}
                      data-testid="input-date"
                    />
                  </FloatingField>
                </div>

                <FloatingField label="Service" error={errors.service?.message}>
                  <select
                    {...register('service')}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    data-testid="select-service"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </FloatingField>

                <FloatingField label="Message (Optional)">
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Any special requests or questions..."
                    className={`${inputClass} resize-none`}
                    data-testid="input-message"
                  />
                </FloatingField>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3"
                  data-testid="button-submit-booking"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    'Book My Appointment'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
