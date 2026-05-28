import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Crown,
  Gift,
  Heart,
  MessageCircle,
  Send,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const amounts = ['₹2,999', '₹5,499', '₹9,999', '₹18,999'];

const giftBenefits = [
  'Personalized digital voucher',
  'Redeemable for any glam service',
  'Perfect for brides, sisters & best friends',
];

const featurePills = [
  {
    icon: MessageCircle,
    title: 'Instant WhatsApp Delivery',
    detail: 'Ready to share in minutes',
  },
  {
    icon: Gift,
    title: 'Valid for All Services',
    detail: 'Bridal, party, hair & more',
  },
  {
    icon: Star,
    title: '500+ Happy Clients',
    detail: 'Loved by real brides',
  },
  {
    icon: Heart,
    title: 'Personal Bridal Gifts',
    detail: 'Add names and notes',
  },
];

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
    <section id="gift" className="relative overflow-hidden bg-[#fbf7f2] py-20 md:py-28">
      <div className="absolute left-[-14%] top-8 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-[-10%] bottom-10 h-96 w-96 rounded-full bg-[#d6b46c]/20 blur-3xl" />
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.45em] text-primary">
            For Someone Special
          </span>
          <h2 className="font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-tight text-foreground">
            The Perfect <span className="italic text-primary">Gift</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground/55 md:text-base">
            A warm, thoughtful way to gift confidence, celebration, and a luxury glam moment she will remember.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 p-4 shadow-[0_30px_90px_rgba(70,35,35,0.13)] backdrop-blur-xl md:p-7 lg:p-9"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(190,96,116,0.22),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(214,180,108,0.28),transparent_38%)]" />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute right-8 top-8 hidden h-20 w-20 rounded-full border border-primary/20 md:block"
          />
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -12, 0], rotate: [0, 7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-8 top-10 hidden rounded-full bg-white/70 p-3 text-primary shadow-xl shadow-primary/10 md:block"
          >
            <Sparkles size={20} />
          </motion.div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#fff8ef] via-[#f4d7d9] to-[#d9af77] p-6 shadow-inner md:min-h-[540px]">
              <div className="absolute inset-6 rounded-[1.5rem] border border-white/55" />
              <div className="absolute left-8 top-8 rounded-full bg-white/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55 backdrop-blur">
                Luxury Voucher
              </div>
              <div className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-2xl shadow-foreground/20">
                <Crown size={21} />
              </div>

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 bottom-0 top-20 flex items-center justify-center"
              >
                <div className="absolute h-72 w-72 rounded-full bg-white/45 blur-3xl md:h-96 md:w-96" />
                <img
                  src="/assets/gift_box.png"
                  alt="Luxury bridal gift box"
                  loading="lazy"
                  className="relative z-10 h-[340px] w-auto object-contain drop-shadow-[0_30px_55px_rgba(74,33,33,0.22)] md:h-[470px]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="absolute bottom-7 left-7 max-w-[250px] rounded-3xl border border-white/65 bg-white/70 p-5 shadow-2xl shadow-primary/10 backdrop-blur-md"
              >
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                  Bridal Glow Pass
                </p>
                <p className="font-serif text-3xl leading-none text-foreground">{selected}</p>
                <p className="mt-3 text-xs leading-5 text-foreground/55">
                  A personalized glam experience wrapped with love.
                </p>
              </motion.div>
            </div>

            <div className="px-1 py-4 text-center md:px-4 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/65 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Premium Beauty Gift
              </motion.div>

              <h3 className="font-serif text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.95] tracking-tight text-foreground">
                Gift Her
                <span className="block italic text-primary">A Luxury Glam</span>
                <span className="block">Experience</span>
              </h3>

              <p className="mt-6 max-w-xl text-base leading-8 text-foreground/58 lg:text-lg">
                For the bride-to-be, your sister, your best friend, or the woman who deserves to feel cherished — a GlamByHarini voucher turns beauty into a memory.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {giftBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-foreground/8 bg-white/60 px-4 py-3 text-sm text-foreground/70 backdrop-blur lg:justify-start"
                  >
                    <CheckCircle2 size={17} className="shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  onClick={() => setShowModal(true)}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-9 py-4 font-mono text-sm uppercase tracking-[0.22em] text-background shadow-2xl shadow-foreground/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:shadow-primary/25 sm:w-auto"
                >
                  Gift Now
                  <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <p className="max-w-[260px] text-center text-xs leading-5 text-foreground/40 lg:text-left">
                  Sent through WhatsApp with amount, names, and your personal message.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featurePills.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-[1.5rem] border border-white/70 bg-white/58 p-5 shadow-[0_18px_45px_rgba(70,35,35,0.08)] backdrop-blur-md transition-all duration-300 hover:border-primary/25 hover:bg-white/78"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={19} />
                </div>
                <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                <p className="mt-2 text-sm leading-6 text-foreground/48">{feature.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={(event) => event.target === event.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf6] p-7 shadow-2xl"
            >
              <div className="absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close gift voucher form"
                className="absolute right-5 top-5 rounded-full p-2 text-foreground/35 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X size={20} />
              </button>

              <div className="relative">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Digital Gift Voucher</p>
                <h3 className="font-serif text-3xl text-foreground">Personalise Your Gift</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/50">
                  Add a value, names, and a short note. We’ll continue the purchase on WhatsApp.
                </p>

                <div className="mb-6 mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelected(amount)}
                      className={`rounded-2xl px-3 py-3 font-mono text-xs tracking-wide transition-all duration-200 ${
                        selected === amount
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'border border-foreground/10 bg-white/55 text-foreground/50 hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                <div className="mb-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-foreground/35">
                      Gift For
                    </label>
                    <input
                      value={recipientName}
                      onChange={(event) => setRecipientName(event.target.value)}
                      placeholder="Recipient's name"
                      className="w-full rounded-2xl border border-foreground/10 bg-white/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-foreground/35">
                      From
                    </label>
                    <input
                      value={senderName}
                      onChange={(event) => setSenderName(event.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-foreground/10 bg-white/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-foreground/35">
                      Personal Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="You deserve to glow, darling..."
                      rows={3}
                      className="w-full resize-none rounded-2xl border border-foreground/10 bg-white/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSend}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-background shadow-xl shadow-foreground/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/20"
                >
                  <Send size={14} />
                  Send {selected} Voucher
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
