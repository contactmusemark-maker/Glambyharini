import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, Users, Send, X, ArrowRight } from 'lucide-react';

const amounts = ['₹2,999', '₹5,499', '₹9,999', '₹18,999'];

export default function GiftVoucher() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState('₹5,499');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const text = `Hi Harini! I'd like to purchase a Gift Voucher worth ${selected} for ${recipientName || 'a loved one'}. From: ${senderName}. Message: "${message || 'Wishing you a beautiful glam experience!'}". Please guide me on how to proceed.`;
    window.open(`https://wa.me/917305306497?text=${encodeURIComponent(text)}`, '_blank');
    setShowModal(false);
  };

  return (
    <section id="gift" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">For Someone Special</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            The Perfect <span className="italic text-primary/80">Gift</span>
          </h2>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Celebrate the women in your life with a luxury glam experience they will never forget.
          </p>
        </motion.div>

        {/* ── Hero banner card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl mb-6"
          style={{
            background: 'linear-gradient(120deg, hsl(351 60% 88%) 0%, hsl(39 80% 85%) 55%, hsl(351 50% 80%) 100%)',
            minHeight: '360px',
            overflow: 'visible',
          }}
        >
          <div className="grid md:grid-cols-2 items-center" style={{ minHeight: '360px' }}>

            {/* Left — 3D gift image — overflows card top & bottom */}
            <div className="relative flex items-center justify-center" style={{ height: '420px' }}>
              {/* Glow blob */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full bg-white/30 blur-3xl" />
              </div>
              <motion.img
                src="/assets/gift_box.png"
                alt="Gift a Glam Experience"
                className="relative z-10 w-auto object-contain"
                style={{ mixBlendMode: 'multiply', height: '420px', maxWidth: 'none' }}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                animate={{ y: [0, -10, 0] }}
              />
            </div>

            {/* Right — text + CTA */}
            <div className="px-8 md:px-12 py-12 md:py-16 relative z-10">
              {/* Special offer badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6 shadow-lg shadow-primary/30"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Special Offer
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif text-foreground leading-[1.1] mb-5">
                Gift a<br /><span className="italic">Glam Experience</span>
              </h2>

              <p className="text-foreground/55 text-base leading-relaxed mb-10 max-w-sm">
                The most thoughtful gift for a bride-to-be, best friend, or anyone who deserves to feel extraordinary. Valid for any service.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-foreground text-background text-sm font-mono tracking-wider hover:bg-foreground/85 transition-all duration-300 shadow-xl shadow-foreground/15 group"
              >
                Get Started
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Three stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Rating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-white border border-foreground/6 shadow-sm p-6 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
              <span className="text-lg">💄</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} className={i <= 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400 fill-amber-400'} />
                ))}
                <span className="text-sm font-semibold text-foreground ml-1">4.9</span>
              </div>
              <p className="text-foreground/60 text-sm italic">"Absolutely transformed my look!"</p>
              <p className="text-foreground/35 text-xs mt-1 font-mono">— Divya R., Bride</p>
            </div>
          </motion.div>

          {/* Exclusive offers card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-white border border-foreground/6 shadow-sm p-6 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-2xl bg-foreground flex items-center justify-center shrink-0">
              <Zap size={18} className="text-background" fill="currentColor" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Exclusive Voucher Perks</p>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Redeemable on any service. Valid 6 months. Delivered via WhatsApp instantly.
              </p>
            </div>
          </motion.div>

          {/* Stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-white border border-foreground/6 shadow-sm p-6 flex items-center gap-4"
          >
            <Users size={22} className="text-primary shrink-0" />
            <div>
              <p className="text-4xl font-serif text-foreground leading-none mb-1">500+</p>
              <p className="text-foreground/40 text-sm font-mono uppercase tracking-widest">Happy Clients</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-foreground/25 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif text-2xl text-foreground mb-1">Personalise Your Gift</h3>
              <p className="text-xs font-mono text-foreground/35 tracking-wider uppercase mb-6">Digital Gift Voucher</p>

              {/* Amount selector */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelected(amt)}
                    className={`py-2 rounded-xl font-mono text-xs tracking-wide transition-all duration-200 ${
                      selected === amt
                        ? 'bg-primary text-white shadow-md shadow-primary/25'
                        : 'border border-foreground/10 text-foreground/50 hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-foreground/35 mb-1.5 block">Gift For</label>
                  <input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient's name"
                    className="w-full border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-foreground/35 mb-1.5 block">From</label>
                  <input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-foreground/35 mb-1.5 block">Personal Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="You deserve to glow, darling..."
                    rows={3}
                    className="w-full border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSend}
                className="w-full py-3.5 bg-primary text-white rounded-xl font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Send size={14} />
                Send {selected} Voucher via WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
