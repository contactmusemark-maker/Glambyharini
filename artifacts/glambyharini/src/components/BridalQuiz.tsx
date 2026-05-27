import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

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
    q: 'What\'s your skin finish preference?',
    options: ['Dewy & radiant', 'Matte & long-lasting', 'Satin — a mix of both', 'Natural & breathable'],
  },
  {
    q: 'What\'s your bridal inspiration?',
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
    emoji: '🌸',
  },
  {
    key: [1, 1],
    look: 'Modern Minimalist Bride',
    desc: 'Clean skin, barely-there coverage, glossy lips and feathered brows. Understated luxury at its finest.',
    tags: ['No-Makeup Makeup', 'Glass Skin', 'Glossy Lip'],
    color: 'from-stone-100 to-amber-50',
    emoji: '✨',
  },
  {
    key: [2, 3],
    look: 'Royal Dravidian Glam',
    desc: 'Rich pigments, dramatic kohl liner, gold accents and a bold lip — the quintessential South Indian bridal look.',
    tags: ['Dramatic Eye', 'Kohl Liner', 'Bold Lip', 'Gold Shimmer'],
    color: 'from-amber-100 to-yellow-50',
    emoji: '👑',
  },
  {
    key: [3, 2],
    look: 'Opulent Bollywood Diva',
    desc: 'Full coverage base, intense smoky eye, contouring, statement lashes and a classic red lip for your reception.',
    tags: ['Full Glam', 'Smoky Eye', 'Red Lip', 'Contour'],
    color: 'from-red-100 to-rose-50',
    emoji: '💋',
  },
];

function getResult(answers: number[]) {
  const scores = [0, 0, 0, 0];
  answers.forEach((a) => { scores[a] = (scores[a] || 0) + 1; });
  const dominant = scores.indexOf(Math.max(...scores));
  return results[dominant] || results[0];
}

export default function BridalQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const pick = (i: number) => {
    const next = [...answers, i];
    if (step + 1 >= questions.length) {
      setAnswers(next);
      setDone(true);
    } else {
      setAnswers(next);
      setStep(step + 1);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); };
  const result = getResult(answers);
  const progress = ((step) / questions.length) * 100;

  return (
    <section id="quiz" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Find Your Look</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Bridal Style <span className="italic text-primary/80">Quiz</span>
          </h2>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Answer 5 quick questions and Harini will recommend your perfect bridal makeup look.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="glass-panel p-8 md:p-10"
              >
                {/* Progress */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex-1 h-1 rounded-full bg-foreground/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="font-mono text-xs text-foreground/30">{step + 1}/{questions.length}</span>
                </div>

                <p className="font-serif text-2xl md:text-3xl text-foreground mb-8 leading-snug">
                  {questions[step].q}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => pick(i)}
                      className="flex items-center justify-between gap-3 p-4 rounded-xl border border-foreground/10 bg-white hover:border-primary/50 hover:bg-primary/5 text-left transition-all duration-200 group"
                    >
                      <span className="font-serif text-sm text-foreground/75 group-hover:text-foreground transition-colors">{opt}</span>
                      <ChevronRight size={14} className="text-foreground/25 group-hover:text-primary transition-colors shrink-0" />
                    </motion.button>
                  ))}
                </div>

                {step > 0 && (
                  <button onClick={() => { setStep(s => s - 1); setAnswers(a => a.slice(0, -1)); }} className="mt-6 text-xs font-mono tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors">
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-3xl p-8 md:p-12 bg-gradient-to-br ${result.color} border border-foreground/8 text-center`}
              >
                <div className="text-6xl mb-4">{result.emoji}</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-mono tracking-widest uppercase text-foreground/50 mb-4">
                  <Sparkles size={10} />
                  Your Look
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{result.look}</h3>
                <p className="text-foreground/60 max-w-md mx-auto leading-relaxed mb-6">{result.desc}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {result.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/70 text-xs font-mono text-foreground/60 tracking-wide">{tag}</span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/917305306497?text=Hi Harini! I took your bridal style quiz and got "${result.look}". I'd love to book a trial session!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-foreground text-background text-xs font-mono tracking-widest uppercase hover:bg-foreground/85 transition-colors"
                  >
                    Book This Look →
                  </a>
                  <button onClick={reset} className="px-6 py-3 rounded-full border border-foreground/15 text-foreground/60 text-xs font-mono tracking-widest uppercase hover:border-foreground/30 transition-colors flex items-center justify-center gap-2">
                    <RotateCcw size={12} /> Retake Quiz
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
