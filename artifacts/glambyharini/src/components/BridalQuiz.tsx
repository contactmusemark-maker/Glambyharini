import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Gem, RotateCcw, Sparkles } from 'lucide-react';

const questions = [
  {
    q: 'What is your wedding theme?',
    options: ['Classic & Traditional', 'Modern & Minimalist', 'Bohemian & Dreamy', 'Royal & Opulent'],
  },
  {
    q: 'Which colour palette speaks to you?',
    options: ['Soft Pinks & Blush', 'Neutral Nudes & Beige', 'Bold Reds & Jewel Tones', 'Earthy Terracottas & Golds'],
  },
  {
    q: 'How do you feel about bold eye makeup?',
    options: ['Keep it subtle — liner only', 'Soft smoky with shimmer', 'Full glam — the bolder the better', 'Colourful & artistic'],
  },
  {
    q: "What's your skin finish preference?",
    options: ['Dewy & radiant', 'Matte & long-lasting', 'Satin — a mix of both', 'Natural & breathable'],
  },
  {
    q: "What's your bridal inspiration?",
    options: ['Old Bollywood elegance', 'South Indian traditional', 'Modern magazine editorial', 'Destination wedding chic'],
  },
];

const results = [
  {
    key: [0, 0],
    look: 'Classic Bridal Glow',
    desc: 'Timeless soft-glam with dewy skin, defined brows, rosy lips and fluttery lashes. Perfect for traditional ceremonies.',
    tags: ['Soft Glam', 'Flawless Skin', 'Rose Lip'],
    color: 'from-rose-100 to-pink-50',
    emoji: 'Soft Glow',
  },
  {
    key: [1, 1],
    look: 'Modern Minimalist Bride',
    desc: 'Clean skin, barely-there coverage, glossy lips and feathered brows. Understated luxury at its finest.',
    tags: ['No-Makeup Makeup', 'Glass Skin', 'Glossy Lip'],
    color: 'from-stone-100 to-amber-50',
    emoji: 'Minimal Luxe',
  },
  {
    key: [2, 3],
    look: 'Royal Dravidian Glam',
    desc: 'Rich pigments, dramatic kohl liner, gold accents and a bold lip — the quintessential South Indian bridal look.',
    tags: ['Dramatic Eye', 'Kohl Liner', 'Bold Lip', 'Gold Shimmer'],
    color: 'from-amber-100 to-yellow-50',
    emoji: 'Royal Glam',
  },
  {
    key: [3, 2],
    look: 'Opulent Bollywood Diva',
    desc: 'Full coverage base, intense smoky eye, contouring, statement lashes and a classic red lip for your reception.',
    tags: ['Full Glam', 'Smoky Eye', 'Red Lip', 'Contour'],
    color: 'from-red-100 to-rose-50',
    emoji: 'Diva Energy',
  },
];

function getResult(answers: number[]) {
  const scores = [0, 0, 0, 0];
  answers.forEach((a) => {
    scores[a] = (scores[a] || 0) + 1;
  });
  const dominant = scores.indexOf(Math.max(...scores));
  return results[dominant] || results[0];
}

export default function BridalQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const nextQuestion = () => {
    if (selected === null) return;

    const next = [...answers, selected];
    if (step + 1 >= questions.length) {
      setAnswers(next);
      setDone(true);
    } else {
      setAnswers(next);
      setStep(step + 1);
      setSelected(null);
    }
  };

  const back = () => {
    if (step === 0) return;
    const previousAnswers = answers.slice(0, -1);
    setStep((s) => s - 1);
    setSelected(answers[answers.length - 1] ?? null);
    setAnswers(previousAnswers);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDone(false);
  };

  const result = getResult(answers);
  const progress = ((done ? questions.length : step + 1) / questions.length) * 100;

  return (
    <section id="quiz" className="relative overflow-hidden bg-[#fbf7f2] py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto w-[90vw] max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
              Bridal Consultation
            </span>
            <h2 className="mt-5 font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.96] text-foreground">
              Discover Your Bridal Signature
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/62 lg:mx-0">
              Personalized makeup style recommendations crafted for your dream day, your outfit,
              and the way you want to feel in every photograph.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-xl shadow-primary/10 backdrop-blur"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45">
                  Progress
                </div>
                <div className="mt-1 font-serif text-2xl text-foreground">
                  Step {done ? questions.length : step + 1} of {questions.length}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Gem size={20} />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-5 gap-2">
              {questions.map((_, index) => {
                const active = !done && index === step;
                const complete = done || index < step;

                return (
                  <div key={index} className="h-2 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      className={`h-full rounded-full ${complete || active ? 'bg-primary' : 'bg-transparent'}`}
                      animate={{ width: complete || active ? '100%' : '0%' }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              {Math.round(progress)}% complete
            </div>
          </motion.div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-2xl shadow-primary/10 backdrop-blur-xl md:rounded-[2.5rem] md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-secondary/55 via-white to-primary/10 p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary shadow-sm">
                      <Sparkles size={13} />
                      Question {step + 1}
                    </div>
                    <h3 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-foreground">
                      {questions[step].q}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-foreground/58">
                      Choose the answer that feels closest to your wedding-day energy.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {questions[step].options.map((option, index) => {
                      const active = selected === index;

                      return (
                        <motion.button
                          key={option}
                          type="button"
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelected(index)}
                          className={`group min-h-[132px] rounded-[1.5rem] border p-5 text-left transition ${
                            active
                              ? 'border-primary bg-primary/8 shadow-lg shadow-primary/15'
                              : 'border-foreground/10 bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-black/5'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs uppercase transition ${
                                active
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-foreground/10 bg-secondary/25 text-foreground/45'
                              }`}
                            >
                              {active ? <Check size={16} /> : String.fromCharCode(65 + index)}
                            </span>
                            <ArrowUpRight
                              size={17}
                              className={`transition ${active ? 'text-primary' : 'text-foreground/25 group-hover:text-primary'}`}
                            />
                          </div>
                          <div className="mt-6 font-serif text-xl leading-snug text-foreground md:text-2xl">
                            {option}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition ${
                      step === 0
                        ? 'cursor-not-allowed border-foreground/10 text-foreground/25'
                        : 'border-foreground/15 text-foreground/55 hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextQuestion}
                    disabled={selected === null}
                    className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] transition ${
                      selected === null
                        ? 'cursor-not-allowed bg-muted/35 text-foreground/30'
                        : 'bg-foreground text-background shadow-lg shadow-black/10 hover:bg-primary'
                    }`}
                  >
                    {step + 1 === questions.length ? 'View Result' : 'Continue'}
                    <ChevronRight size={17} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[2rem] border border-white/70 bg-gradient-to-br ${result.color} p-8 text-center shadow-sm md:p-12`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-primary shadow-sm">
                  <Sparkles size={24} />
                </div>
                <div className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-primary">
                  {result.emoji}
                </div>
                <h3 className="mx-auto mt-4 max-w-3xl font-serif text-[clamp(2.3rem,5vw,4.5rem)] leading-tight text-foreground">
                  {result.look}
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/62">
                  {result.desc}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/917305306497?text=Hi Harini! I took your bridal style quiz and got "${result.look}". I'd love to book a trial session!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-background transition hover:bg-primary"
                  >
                    Book This Look
                    <ArrowUpRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-white/60 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-foreground/60 transition hover:border-primary/30 hover:text-primary"
                  >
                    <RotateCcw size={14} />
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
