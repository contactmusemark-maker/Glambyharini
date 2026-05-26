import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Send, X } from 'lucide-react';

const amounts = ['₹2,999', '₹5,499', '₹9,999', '₹18,999'];

export default function GiftVoucher() {
  const [selected, setSelected] = useState('₹5,499');
  const [showModal, setShowModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const text = `Hi Harini! I'd like to purchase a Gift Voucher worth ${selected} for ${recipientName || 'a loved one'}. From: ${senderName}. Message: "${message || 'Wishing you a beautiful glam experience!'}". Please guide me on how to proceed.`;
    window.open(`https://wa.me/917305306497?text=${encodeURIComponent(text)}`, '_blank');
    setShowModal(false);
  };

  return (
    <section id="gift" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a0f 0%, #0d0d0d 50%, #1a0a14 100%)' }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-20 right-20 w-[200px] h-[200px] rounded-full bg-accent/8 blur-[80px]" />
      </div>

      {/* Sparkle dots */}
      {[
        { top: '15%', left: '8%' }, { top: '70%', left: '5%' },
        { top: '20%', right: '10%' }, { top: '75%', right: '8%' },
        { top: '45%', left: '50%' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={pos}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity }}
        >
          <Sparkles size={10} className="text-primary/40" />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">For Someone Special</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Gift a <span className="italic text-primary/80">Glam Experience</span>
            </h2>
            <p className="text-white/40 max-w-md mx-auto text-sm">
              The most thoughtful gift for a bride-to-be, best friend, or anyone who deserves to feel extraordinary.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Voucher card visual */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1000 }}
            >
              <div
                className="relative rounded-3xl overflow-hidden p-8"
                style={{
                  background: 'linear-gradient(135deg, #2d1520 0%, #1a0d12 40%, #2d1a10 100%)',
                  border: '1px solid rgba(201,169,160,0.2)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Top strip */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary/50 mb-1">Gift Voucher</div>
                    <div className="font-serif text-2xl text-white">GlamByHarini</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                    <Gift size={20} className="text-primary" />
                  </div>
                </div>

                {/* Amount display */}
                <div className="mb-8">
                  <div className="text-5xl font-serif text-white/10 absolute right-8 top-8 select-none pointer-events-none">✦</div>
                  <div className="font-mono text-xs text-white/30 mb-2 uppercase tracking-widest">Voucher Value</div>
                  <div className="text-5xl font-serif text-primary">{selected}</div>
                </div>

                {/* Decorative strip */}
                <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,160,0.3), transparent)' }} />

                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-1">Redeemable at</div>
                    <div className="text-sm text-white/50">GlamByHarini Studio, Tamil Nadu</div>
                  </div>
                  <div className="font-mono text-xs text-primary/40">Glam · Beauty · Art</div>
                </div>

                {/* Corner ornament */}
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-primary/10 rounded-bl-2xl pointer-events-none" />
                <div className="absolute top-4 right-16 w-16 h-16 border-t border-r border-primary/10 rounded-tr-2xl pointer-events-none" />
              </div>
            </motion.div>

            {/* Selector + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/50 text-sm mb-6">Select the voucher amount that matches her dream look:</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelected(amt)}
                    className={`py-3 rounded-xl font-mono text-sm tracking-wider transition-all duration-300 ${
                      selected === amt
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'border border-white/10 text-white/40 hover:border-primary/40 hover:text-white/70'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mb-8 text-sm text-white/40">
                <div className="flex items-center gap-2"><span className="text-primary">✦</span> Valid for 6 months from purchase</div>
                <div className="flex items-center gap-2"><span className="text-primary">✦</span> Redeemable on any service</div>
                <div className="flex items-center gap-2"><span className="text-primary">✦</span> Digital voucher sent via WhatsApp</div>
                <div className="flex items-center gap-2"><span className="text-primary">✦</span> Perfect for brides, birthdays & anniversaries</div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full py-4 rounded-2xl bg-primary text-white font-mono text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
              >
                <Gift size={16} />
                Gift {selected} Experience
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-foreground/30 hover:text-foreground">
                <X size={20} />
              </button>
              <h3 className="font-serif text-2xl text-foreground mb-1">Personalise Your Gift</h3>
              <p className="text-xs font-mono text-foreground/40 tracking-wider uppercase mb-6">Voucher · {selected}</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1.5 block">Gift For (Name)</label>
                  <input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Priya"
                    className="w-full border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground bg-foreground/3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1.5 block">From (Your Name)</label>
                  <input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Kavya"
                    className="w-full border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground bg-foreground/3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1.5 block">Personal Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="You deserve to glow, darling..."
                    rows={3}
                    className="w-full border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground bg-foreground/3 focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSend}
                className="w-full mt-6 py-3.5 bg-primary text-white rounded-xl font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Send size={14} />
                Send via WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
