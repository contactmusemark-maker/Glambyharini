import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BOOKED = [3, 7, 8, 12, 14, 18, 21, 22, 25, 27];
const LIMITED = [5, 10, 16, 19, 28];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function AvailabilityCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);

  const totalDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelected(null);
  };

  const status = (d: number) => {
    if (BOOKED.includes(d)) return 'booked';
    if (LIMITED.includes(d)) return 'limited';
    return 'open';
  };

  const dayClass = (d: number, s: string) => {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const isSel = d === selected;
    const base = 'relative w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-sm transition-all duration-200 font-mono';
    if (s === 'booked') return `${base} bg-foreground/6 text-foreground/25 cursor-not-allowed line-through`;
    if (s === 'limited') return `${base} bg-accent/20 text-accent cursor-pointer hover:bg-accent/30 ${isSel ? 'ring-2 ring-accent' : ''}`;
    if (isSel) return `${base} bg-primary text-white shadow-md cursor-pointer`;
    if (isToday) return `${base} ring-2 ring-primary/40 text-primary cursor-pointer hover:bg-primary/10`;
    return `${base} text-foreground/70 cursor-pointer hover:bg-foreground/5`;
  };

  return (
    <section id="availability" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-primary/6 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Book Your Date</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Check <span className="italic text-primary/80">Availability</span>
          </h2>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Browse open dates and select yours. Struck-through dates are already booked — act fast, especially around wedding season!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto items-start">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 glass-panel p-6 md:p-8"
          >
            {/* Nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="w-9 h-9 rounded-xl border border-foreground/10 flex items-center justify-center hover:border-primary transition-colors">
                <ChevronLeft size={16} />
              </button>
              <h3 className="font-serif text-xl text-foreground">{MONTHS[month]} {year}</h3>
              <button onClick={nextMonth} className="w-9 h-9 rounded-xl border border-foreground/10 flex items-center justify-center hover:border-primary transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-mono uppercase tracking-widest text-foreground/30 py-1">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: totalDays }).map((_, i) => {
                const d = i + 1;
                const s = status(d);
                return (
                  <div key={d} className="flex items-center justify-center">
                    <button
                      disabled={s === 'booked'}
                      onClick={() => s !== 'booked' && setSelected(d)}
                      className={dayClass(d, s)}
                    >
                      {d}
                      {s === 'limited' && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="w-full md:w-72 flex flex-col gap-4">
            {/* Legend */}
            <div className="glass-panel p-5">
              <p className="font-mono text-xs tracking-widest uppercase text-foreground/40 mb-4">Legend</p>
              <div className="flex flex-col gap-3">
                {[
                  { color: 'bg-primary', label: 'Selected / Open', note: 'Click to select' },
                  { color: 'bg-accent/60', label: 'Limited Slots', note: 'Only 1–2 spots left' },
                  { color: 'bg-foreground/10', label: 'Fully Booked', note: 'Not available' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-md ${item.color} shrink-0`} />
                    <div>
                      <p className="text-sm text-foreground/70">{item.label}</p>
                      <p className="text-[10px] font-mono text-foreground/35">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected date CTA */}
            <motion.div
              animate={{ opacity: selected ? 1 : 0.5, y: selected ? 0 : 4 }}
              className="glass-panel p-5"
            >
              {selected ? (
                <>
                  <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">Selected Date</p>
                  <p className="font-serif text-2xl text-foreground mb-1">{selected} {MONTHS[month]}</p>
                  <p className="font-mono text-xs text-foreground/40 mb-4">{year} · {status(selected) === 'limited' ? '⚡ Limited slots' : 'Open'}</p>
                  <a
                    href={`https://wa.me/917305306497?text=Hi Harini! I'd like to book ${selected} ${MONTHS[month]} ${year}. Is this date still available?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 rounded-xl bg-foreground text-background text-xs font-mono tracking-widest uppercase hover:bg-foreground/85 transition-colors"
                  >
                    Book {selected} {MONTHS[month]} →
                  </a>
                </>
              ) : (
                <p className="font-serif text-foreground/40 text-sm italic">Select a date to book your slot.</p>
              )}
            </motion.div>

            <div className="px-2">
              <p className="font-mono text-[10px] text-foreground/25 leading-relaxed">
                ⚡ Wedding season (Oct–Feb) fills up fast. Book at least 3 months in advance for bridal looks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
