import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const cities = [
  { name: 'Chennai', x: 73, y: 35, primary: true, desc: 'Home base & studio' },
  { name: 'Coimbatore', x: 22, y: 48, primary: false, desc: 'Available for bookings' },
  { name: 'Madurai', x: 42, y: 68, primary: false, desc: 'Available for bookings' },
  { name: 'Trichy', x: 43, y: 55, primary: false, desc: 'Available for bookings' },
  { name: 'Salem', x: 35, y: 40, primary: false, desc: 'Available for bookings' },
  { name: 'Vellore', x: 57, y: 30, primary: false, desc: 'Available for bookings' },
  { name: 'Tirunelveli', x: 38, y: 82, primary: false, desc: 'Available for bookings' },
  { name: 'Pondicherry', x: 70, y: 45, primary: false, desc: 'Available for bookings' },
  { name: 'Erode', x: 28, y: 44, primary: false, desc: 'Available for bookings' },
];

export default function ServiceArea() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="service-area" className="py-24 md:py-40 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Where We Serve</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Across <span className="italic text-primary/80">Tamil Nadu</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Based in Chennai and available to travel across Tamil Nadu. Destination wedding packages available throughout South India.
            </p>

            {/* City list */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {cities.map((city) => (
                <div
                  key={city.name}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center gap-2.5 py-2.5 px-4 rounded-xl transition-all duration-300 cursor-default ${
                    hovered === city.name
                      ? 'bg-primary/15 border border-primary/30'
                      : city.primary
                        ? 'bg-primary/10 border border-primary/20'
                        : 'border border-white/5 hover:border-white/10'
                  }`}
                >
                  <MapPin
                    size={13}
                    className={`shrink-0 ${city.primary ? 'text-primary' : 'text-white/30'}`}
                    fill={city.primary ? 'currentColor' : 'none'}
                  />
                  <span className={`text-sm ${city.primary ? 'text-primary font-medium' : 'text-white/50'}`}>
                    {city.name}
                    {city.primary && <span className="text-primary/60 text-[10px] ml-1 font-mono"> ★ base</span>}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/917305306497?text=Hi Harini! I'd like to book you for an event. Can you confirm availability?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-white text-sm font-mono tracking-wider hover:bg-primary/90 transition-all duration-300"
            >
              Check Your City →
            </a>
          </motion.div>

          {/* Stylised Tamil Nadu map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,160,0.03) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <svg
                viewBox="0 0 100 110"
                className="w-full"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}
              >
                {/* Tamil Nadu shape (stylized polygon) */}
                <defs>
                  <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(351 35% 57%)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="hsl(39 46% 61%)" stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(351 35% 57%)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="hsl(351 35% 57%)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* TN shape approximation */}
                <path
                  d="M 60 5 L 80 8 L 87 15 L 85 22 L 90 30 L 82 38 L 80 48 L 75 55 L 72 63 L 65 72 L 58 80 L 50 88 L 43 95 L 38 100 L 33 96 L 30 88 L 28 78 L 25 68 L 22 58 L 18 48 L 20 38 L 25 30 L 22 22 L 28 15 L 35 10 L 45 6 Z"
                  fill="url(#mapGrad)"
                  stroke="rgba(201,169,160,0.15)"
                  strokeWidth="0.5"
                />

                {/* City dots */}
                {cities.map((city) => (
                  <g key={city.name} transform={`translate(${city.x}, ${city.y})`}>
                    {/* Pulse ring for Chennai */}
                    {city.primary && (
                      <>
                        <circle r="5" fill="none" stroke="hsl(351 35% 57%)" strokeWidth="0.3" opacity="0.3">
                          <animate attributeName="r" from="4" to="9" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle r="3" fill="none" stroke="hsl(351 35% 57%)" strokeWidth="0.3" opacity="0.5">
                          <animate attributeName="r" from="2" to="6" dur="2s" begin="0.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}

                    {/* Dot */}
                    <circle
                      r={city.primary ? 2.5 : 1.5}
                      fill={city.primary ? 'hsl(351 35% 57%)' : (hovered === city.name ? 'hsl(351 35% 57%)' : 'rgba(255,255,255,0.3)')}
                      style={{ transition: 'fill 0.2s' }}
                    />

                    {/* Label */}
                    <text
                      x={city.x > 50 ? -4 : 4}
                      y={-4}
                      textAnchor={city.x > 50 ? 'end' : 'start'}
                      fontSize="3.5"
                      fill={city.primary ? 'hsl(351 35% 57%)' : 'rgba(255,255,255,0.4)'}
                      fontFamily="monospace"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}

                {/* Connection lines from Chennai */}
                {cities.filter(c => !c.primary).map((city) => (
                  <line
                    key={`line-${city.name}`}
                    x1={73} y1={35}
                    x2={city.x} y2={city.y}
                    stroke="rgba(201,169,160,0.08)"
                    strokeWidth="0.3"
                    strokeDasharray="2,2"
                  />
                ))}
              </svg>

              {/* Overlay label */}
              <div className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[0.3em] uppercase text-white/15">
                Tamil Nadu
              </div>
            </div>

            {/* Floating info card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-4 rounded-2xl p-4 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,160,0.15), rgba(201,169,160,0.05))',
                border: '1px solid rgba(201,169,160,0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="font-mono text-[9px] tracking-widest uppercase text-white/30 mb-1">Coverage</div>
              <div className="text-white font-serif text-lg">All TN + Beyond</div>
              <div className="text-primary/60 text-[10px] font-mono mt-0.5">Travel charges apply</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
