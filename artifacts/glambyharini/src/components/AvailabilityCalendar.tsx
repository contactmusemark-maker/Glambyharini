import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageCircle,
  Radio,
  Sparkles,
  XCircle,
} from 'lucide-react';

const BOOKED = [3, 7, 8, 12, 14, 18, 21, 22, 25, 27];
const LIMITED = [5, 10, 16, 19, 28];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const PHONE = '917305306497';

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getStatus(day: number) {
  if (BOOKED.includes(day)) return 'booked';
  if (LIMITED.includes(day)) return 'limited';
  return 'open';
}

function getSlots(day: number) {
  const status = getStatus(day);
  if (status === 'booked') return 0;
  if (status === 'limited') return day % 2 === 0 ? 1 : 2;
  return 4 + (day % 3);
}

export default function AvailabilityCalendar() {
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(today.getDate());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const totalDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);
  const selectedStatus = selected ? getStatus(selected) : null;
  const selectedSlots = selected ? getSlots(selected) : 0;
  const openDays = Array.from({ length: totalDays }).filter((_, i) => getStatus(i + 1) === 'open').length;
  const limitedDays = LIMITED.filter((day) => day <= totalDays).length;
  const bookedDays = BOOKED.filter((day) => day <= totalDays).length;

  const selectedDateLabel = selected ? `${selected} ${MONTHS[month]} ${year}` : 'Select a date';
  const whatsappText = encodeURIComponent(
    `Hi Harini! I checked your real-time availability and would like to book ${selectedDateLabel}. Status shown: ${
      selectedStatus === 'limited' ? 'Limited slots' : selectedStatus === 'open' ? 'Available' : 'Booked'
    }. Can you confirm the slot?`
  );

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    setSelected(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    setSelected(null);
  };

  const dayClass = (day: number) => {
    const status = getStatus(day);
    const isToday =
      day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const isSelected = day === selected;
    const base =
      'relative flex aspect-square min-h-9 w-full min-w-0 items-center justify-center border text-xs font-mono transition-colors sm:text-sm';

    if (status === 'booked') {
      return `${base} border-foreground/10 bg-foreground/[0.03] text-foreground/25 cursor-not-allowed line-through`;
    }

    if (isSelected) {
      return `${base} border-primary bg-primary text-primary-foreground shadow-sm`;
    }

    if (status === 'limited') {
      return `${base} border-accent/35 bg-accent/10 text-foreground hover:bg-accent/20`;
    }

    if (isToday) {
      return `${base} border-primary/35 bg-primary/5 text-primary hover:bg-primary/10`;
    }

    return `${base} border-foreground/10 bg-white text-foreground/70 hover:border-primary/30 hover:bg-primary/5`;
  };

  return (
    <section id="availability" className="py-20 md:py-28 bg-secondary/15 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent pointer-events-none" />

      <div className="container">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
          >
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase text-primary">
                <Radio size={15} />
                Live Date Check
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl font-serif text-foreground">
                Check Availability
              </h2>
              <p className="mt-4 max-w-xl text-sm text-foreground/60 leading-relaxed">
                View open, limited, and booked dates before sending your booking request.
              </p>
            </div>

            <div className="border border-primary/15 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-primary/40" />
                  <span className="relative inline-flex h-3 w-3 bg-primary" />
                </span>
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/45">
                    Real-time status
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    Updated {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,340px)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="border border-primary/15 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-4 py-5 md:px-6">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-foreground/10 transition-colors hover:border-primary/35 hover:text-primary"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={17} />
                </button>
                <div className="text-center">
                  <h3 className="font-serif text-xl text-foreground">
                    {MONTHS[month]} {year}
                  </h3>
                  <p className="mt-1 font-mono text-xs tracking-[0.2em] uppercase text-foreground/40">
                    {openDays} open · {limitedDays} limited · {bookedDays} booked
                  </p>
                </div>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-foreground/10 transition-colors hover:border-primary/35 hover:text-primary"
                  aria-label="Next month"
                >
                  <ChevronRight size={17} />
                </button>
              </div>

              <div className="p-3 sm:p-5 md:p-6">
                <div className="mb-3 grid grid-cols-7 gap-1 sm:gap-2">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className="text-center text-[10px] font-mono uppercase tracking-widest text-foreground/35 py-1"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1;
                    const status = getStatus(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={status === 'booked'}
                        onClick={() => status !== 'booked' && setSelected(day)}
                        className={dayClass(day)}
                        aria-label={`${day} ${MONTHS[month]} ${year}, ${status}`}
                      >
                        {day}
                        {status === 'limited' && (
                          <span className="absolute right-1 top-1 h-1.5 w-1.5 bg-accent" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="border border-primary/15 bg-white shadow-sm">
                <div className="px-5 py-4 border-b border-foreground/10">
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/45">
                    Selected Date
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-foreground">{selectedDateLabel}</h3>
                </div>

                <div className="p-5">
                  {selected ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          {selectedStatus === 'booked' ? (
                            <XCircle size={19} />
                          ) : selectedStatus === 'limited' ? (
                            <Clock3 size={19} />
                          ) : (
                            <CheckCircle2 size={19} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {selectedStatus === 'limited'
                              ? 'Limited availability'
                              : selectedStatus === 'open'
                                ? 'Available for booking'
                                : 'Fully booked'}
                          </p>
                          <p className="mt-1 text-sm text-foreground/60">
                            {selectedSlots > 0
                              ? `${selectedSlots} appointment slot${selectedSlots > 1 ? 's' : ''} showing now.`
                              : 'No appointment slots are showing for this date.'}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${PHONE}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-3 bg-primary text-primary-foreground px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors"
                      >
                        <MessageCircle size={16} />
                        Confirm on WhatsApp
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 text-foreground/60">
                      <CalendarCheck size={19} className="text-primary shrink-0" />
                      <p className="text-sm leading-relaxed">Select an open date to see live slot details.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  { icon: CheckCircle2, label: 'Open', note: 'Multiple slots showing', tone: 'text-primary bg-primary/10' },
                  { icon: Clock3, label: 'Limited', note: 'Only 1 to 2 slots left', tone: 'text-accent bg-accent/15' },
                  { icon: XCircle, label: 'Booked', note: 'Date unavailable', tone: 'text-foreground/35 bg-foreground/5' },
                ].map((item) => (
                  <div key={item.label} className="border border-foreground/10 bg-white p-4 flex items-center gap-3">
                    <span className={`h-9 w-9 flex items-center justify-center ${item.tone}`}>
                      <item.icon size={17} />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-foreground/50">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-accent/25 bg-accent/10 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="text-accent shrink-0" />
                  <p className="text-sm text-foreground/65 leading-relaxed">
                    Peak wedding dates fill quickly. Bridal bookings are best confirmed 3 months in advance.
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
