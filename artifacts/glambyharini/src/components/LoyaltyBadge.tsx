import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Gift, Copy, Check } from 'lucide-react';

const perks = [
  {
    icon: Heart,
    title: 'Repeat Client Reward',
    desc: 'Get ₹500 off on your 3rd booking with us. Our way of saying thank you.',
    badge: '₹500 OFF',
  },
  {
    icon: Users,
    title: 'Refer a Bride',
    desc: 'Refer a bride-to-be and earn ₹500 off your next session when she books.',
    badge: '₹500 + ₹500',
  },
  {
    icon: Gift,
    title: 'Birthday Bonus',
    desc: 'Book any service in your birth month and get a complimentary lip gloss kit.',
    badge: 'FREE KIT',
  },
];

export default function LoyaltyBadge() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'GLAMHARINI';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="loyalty" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, hsl(351 35% 57% / 0.06) 0%, transparent 50%)' }} />

      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Loyalty & Referrals</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Glow More, <span className="italic text-primary/80">Save More</span>
          </h2>
          <p className="text-foreground/50 max-w-md mx-auto text-sm">
            Because beauty is better shared — exclusive rewards for our loyal glam family.
          </p>
        </motion.div>

        {/* Perk cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl p-7 bg-white border border-foreground/6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Badge */}
              <div className="absolute -top-3 right-5 px-3 py-1 bg-primary rounded-full text-white font-mono text-[10px] tracking-widest uppercase shadow-lg shadow-primary/30">
                {perk.badge}
              </div>

              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
                <perk.icon size={20} className="text-primary" />
              </div>

              <h3 className="font-serif text-lg text-foreground mb-2">{perk.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral code banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <div
            className="rounded-3xl p-7 text-center"
            style={{
              background: 'linear-gradient(135deg, hsl(351 35% 57% / 0.08), hsl(39 46% 61% / 0.05))',
              border: '1px solid hsl(351 35% 57% / 0.15)',
            }}
          >
            <p className="text-foreground/50 text-sm mb-4">
              Share this code when referring a friend. They get <strong className="text-foreground/80">₹500 off</strong> their first booking, and so do you.
            </p>

            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="px-8 py-3 rounded-xl font-mono text-xl tracking-[0.4em] text-foreground"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px dashed hsl(351 35% 57% / 0.3)' }}
              >
                {referralCode}
              </div>
              <button
                onClick={handleCopy}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  copied ? 'bg-green-500 text-white' : 'bg-foreground/5 text-foreground/50 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={16} />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hey! I just got my makeup done by Harini Suresh (GlamByHarini) and she's absolutely brilliant ✨ Use my referral code ${referralCode} and get ₹500 off your first booking! Check her out: https://www.instagram.com/glam_byharini/`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-mono tracking-wider bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Users size={14} />
              Share with a Friend
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
