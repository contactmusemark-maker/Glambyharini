import { FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Cake,
  Check,
  Copy,
  Crown,
  Gift,
  HeartHandshake,
  Mail,
  Send,
  Sparkles,
  Star,
  UserRound,
  Users,
} from 'lucide-react';

const perks = [
  {
    icon: HeartHandshake,
    title: 'Repeat Client Rewards',
    desc: 'Exclusive savings for loyal clients who return for every special moment.',
    badge: '₹500 OFF',
  },
  {
    icon: Users,
    title: 'Refer a Bride',
    desc: 'Invite a bride-to-be and both of you unlock a softer booking price.',
    badge: '₹500 + ₹500',
  },
  {
    icon: Cake,
    title: 'Birthday Glam Bonus',
    desc: 'Celebrate your month with a complimentary beauty treat on select services.',
    badge: 'FREE KIT',
  },
  {
    icon: Crown,
    title: 'VIP Member Perks',
    desc: 'Priority slots, early offers, and private glam recommendations.',
    badge: 'VIP ACCESS',
  },
];

const rewards = ['Friend gets ₹500 off', 'You earn ₹500 credit', 'Valid on bridal & party glam'];

const generateReferralCode = (fullName: string, email: string) => {
  const cleanedName = fullName
    .trim()
    .split(/\s+/)[0]
    ?.replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 6) || 'HARINI';

  const seed = `${fullName.trim().toLowerCase()}|${email.trim().toLowerCase()}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  const suffix = hash.toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(-4).padStart(4, '7');

  return `${cleanedName}-${suffix}`;
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function LoyaltyBadge() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const firstName = useMemo(() => fullName.trim().split(/\s+/)[0] || 'Beautiful', [fullName]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setCopied(false);
    setReferralCode(generateReferralCode(fullName, email));
  };

  const handleCopy = async () => {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Copy failed. Please select and copy the code manually.');
    }
  };

  const whatsappMessage = referralCode
    ? `Hey! I just discovered GlamByHarini. Use my referral code ${referralCode} and get ₹500 off your first booking. https://www.instagram.com/glam_byharini/`
    : '';

  return (
    <section id="loyalty" className="relative overflow-hidden bg-[#fbf7f2] py-20 md:py-28">
      <div className="absolute left-[-12%] top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-[-16%] bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#d8b66d]/20 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d8b66d]/35 to-transparent" />

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-8 top-20 hidden rounded-full border border-primary/10 bg-white/70 p-4 text-primary shadow-xl shadow-primary/10 md:block"
      >
        <Sparkles size={22} />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[0_28px_85px_rgba(70,35,35,0.12)] backdrop-blur-xl md:p-8 lg:p-10"
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary">
              Loyalty &amp; Referrals
            </span>

            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-tight text-foreground">
              Share the Glow.
              <span className="block italic text-primary">Earn Luxury Rewards.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/58 md:text-lg">
              Invite someone into the GlamByHarini experience and unlock thoughtful rewards for both of you — soft, personal, and made for beauty lovers.
            </p>

            <AnimatePresence mode="wait">
              {!referralCode ? (
                <motion.form
                  key="referral-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="mt-9 rounded-[1.75rem] border border-white/80 bg-[#fffaf6]/80 p-5 shadow-inner shadow-primary/5 md:p-6"
                >
                  <div className="mb-6 flex items-start justify-between gap-5">
                    <div>
                      <p className="font-serif text-2xl text-foreground">Unlock Your Personal Referral Code</p>
                      <p className="mt-2 text-sm leading-6 text-foreground/50">
                        Enter your details to create a unique code just for you.
                      </p>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
                      <Gift size={20} />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="group block">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/38">
                        Full Name
                      </span>
                      <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-white/75 px-4 py-3 transition-all duration-300 group-focus-within:border-primary/45 group-focus-within:shadow-[0_0_0_4px_rgba(190,96,116,0.08)]">
                        <UserRound size={17} className="text-primary/70" />
                        <input
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          placeholder="Divya Raman"
                          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/28"
                        />
                      </div>
                    </label>

                    <label className="group block">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/38">
                        Email Address
                      </span>
                      <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-white/75 px-4 py-3 transition-all duration-300 group-focus-within:border-primary/45 group-focus-within:shadow-[0_0_0_4px_rgba(190,96,116,0.08)]">
                        <Mail size={17} className="text-primary/70" />
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="divya@email.com"
                          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/28"
                        />
                      </div>
                    </label>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-4 text-sm text-primary"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-background shadow-2xl shadow-foreground/15 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:shadow-primary/25 sm:w-auto"
                  >
                    Generate My Code
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="referral-code"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mt-9 overflow-hidden rounded-[1.75rem] border border-primary/15 bg-gradient-to-br from-white via-[#fff7f8] to-[#f6ead4] p-5 shadow-[0_24px_65px_rgba(190,96,116,0.16)] md:p-7"
                >
                  <div className="absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-primary" />
                  <div className="absolute right-16 bottom-10 h-2 w-2 rounded-full bg-[#d8b66d]" />

                  <div className="relative">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/65 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-primary">
                      <Sparkles size={13} />
                      Code Unlocked
                    </div>

                    <p className="text-sm leading-6 text-foreground/52">
                      {firstName}, your personal referral code is ready.
                    </p>
                    <div className="mt-4 rounded-3xl border border-dashed border-primary/35 bg-white/70 p-5 text-center backdrop-blur">
                      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/38">
                        Your Referral Code
                      </p>
                      <p className="mt-3 break-all font-mono text-3xl font-semibold tracking-[0.18em] text-foreground md:text-5xl">
                        {referralCode}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`group inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
                          copied
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                            : 'bg-foreground text-background shadow-xl shadow-foreground/15 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/20'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.7, opacity: 0 }}
                              className="inline-flex items-center gap-2"
                            >
                              <Check size={15} />
                              Copied
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.7, opacity: 0 }}
                              className="inline-flex items-center gap-2"
                            >
                              <Copy size={15} />
                              Copy Code
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 rounded-full border border-primary/20 bg-white/70 px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary hover:text-white"
                      >
                        <Send size={15} />
                        WhatsApp Share
                        <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {rewards.map((reward) => (
                        <div
                          key={reward}
                          className="rounded-2xl border border-foreground/8 bg-white/58 px-4 py-3 text-center text-xs leading-5 text-foreground/55"
                        >
                          {reward}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {perks.map((perk, index) => {
              const Icon = perk.icon;

              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -7 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/58 p-6 shadow-[0_20px_55px_rgba(70,35,35,0.09)] backdrop-blur-md transition-all duration-300 hover:border-primary/25 hover:bg-white/78"
                >
                  <div className="absolute right-[-55px] top-[-55px] h-36 w-36 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-full min-h-[210px] flex-col">
                    <div className="mb-7 flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon size={21} />
                      </div>
                      <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                        {perk.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl leading-tight text-foreground">{perk.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground/55">{perk.desc}</p>
                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/38 transition-colors group-hover:text-primary">
                        Member Reward
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="rounded-[1.75rem] border border-primary/20 bg-foreground p-6 text-background shadow-[0_24px_65px_rgba(24,24,24,0.18)] sm:col-span-2"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/45">Simple Terms</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-background/68">
                    Rewards apply to confirmed bookings and can be redeemed once per appointment. Referral benefits are applied after the referred booking is completed.
                  </p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background/10 text-[#f4d6dc]">
                  <Star size={22} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
