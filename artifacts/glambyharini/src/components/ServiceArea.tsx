import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, X, ChevronDown, Search } from 'lucide-react';

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const cities = [
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, primary: true, service: 'Home Studio + On-site', packages: 'All Packages', desc: 'Home base — studio & on-location available' },
  { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, primary: false, service: 'On-site Only', packages: 'Bridal & Party', desc: 'Available for weddings & events' },
  { name: 'Madurai', lat: 9.9252, lng: 78.1198, primary: false, service: 'On-site Only', packages: 'Bridal & Party', desc: 'Available for weddings & events' },
  { name: 'Trichy', lat: 10.7905, lng: 78.7047, primary: false, service: 'On-site Only', packages: 'All Packages', desc: 'Available for all bookings' },
  { name: 'Salem', lat: 11.6643, lng: 78.1460, primary: false, service: 'On-site Only', packages: 'Party & Trial', desc: 'Available for events' },
  { name: 'Vellore', lat: 12.9165, lng: 79.1325, primary: false, service: 'On-site Only', packages: 'All Packages', desc: 'Available for all bookings' },
  { name: 'Tirunelveli', lat: 8.7139, lng: 77.7567, primary: false, service: 'On-site Only', packages: 'Bridal & Party', desc: 'Available for weddings & events' },
  { name: 'Pondicherry', lat: 11.9416, lng: 79.8083, primary: false, service: 'On-site Only', packages: 'All Packages', desc: 'Available for all bookings' },
  { name: 'Erode', lat: 11.3410, lng: 77.7172, primary: false, service: 'On-site Only', packages: 'Party & Trial', desc: 'Available for events' },
  { name: 'Thanjavur', lat: 10.7870, lng: 79.1378, primary: false, service: 'On-site Only', packages: 'Bridal & Party', desc: 'Available for weddings & events' },
];

const services = ['All Services', 'Bridal', 'Party Glam', 'Trial Look', 'Engagement'];
const budgets = ['All Budgets', 'Under ₹5,000', '₹5,000 – ₹10,000', 'Above ₹10,000'];

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Cities Covered' },
  { value: '100%', label: 'Satisfaction Rate' },
];

function makeIcon(primary: boolean, active: boolean) {
  const size = primary ? 44 : 36;
  const color = active ? '#c9a9a0' : (primary ? '#c9a9a0' : '#ffffff');
  const border = active ? '#a07870' : (primary ? '#a07870' : 'rgba(0,0,0,0.2)');
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${color}" stroke="${border}" stroke-width="2"/>
      ${primary ? `<circle cx="${size/2}" cy="${size/2}" r="${size/2 - 8}" fill="white" opacity="0.4"/>` : ''}
      <text x="${size/2}" y="${size/2 + 5}" text-anchor="middle" font-size="16" fill="${primary || active ? '#fff' : '#333'}">${primary ? '★' : '📍'}</text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lng], 9, { duration: 1.2 }); }, [lat, lng]);
  return null;
}

type City = typeof cities[0];

export default function ServiceArea() {
  const [activeCity, setActiveCity] = useState<City>(cities[0]);
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [budgetFilter, setBudgetFilter] = useState('All Budgets');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapReady, setMapReady] = useState(false);

  const filtered = cities.filter(c => {
    const matchLoc = locationFilter === 'All Locations' || c.name === locationFilter;
    const matchSvc = serviceFilter === 'All Services' || c.packages.includes(serviceFilter.replace(' Look', '').replace(' Glam', ''));
    const matchQ = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLoc && matchSvc && matchQ;
  });

  return (
    <section id="service-area" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 text-xs font-mono tracking-widest uppercase text-foreground/50 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Where We Serve
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight mb-4">
            Book Glam Across{' '}
            <span className="inline-flex items-center gap-3">
              <span className="italic text-primary/80">Tamil Nadu</span>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-2xl align-middle">💄</span>
            </span>
          </h2>
          <p className="text-foreground/45 max-w-lg mx-auto text-base">
            Based in Chennai and available to travel across Tamil Nadu. Select a city to explore availability and book your glam session.
          </p>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 justify-center mb-8"
        >
          <div className="flex items-center gap-2 bg-white border border-foreground/8 rounded-2xl px-4 py-2.5 shadow-sm">
            <Search size={14} className="text-foreground/30" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search city..."
              className="text-sm text-foreground bg-transparent outline-none w-28 placeholder:text-foreground/25"
            />
          </div>

          {/* Location dropdown */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={e => {
                setLocationFilter(e.target.value);
                const city = cities.find(c => c.name === e.target.value);
                if (city) setActiveCity(city);
              }}
              className="appearance-none bg-white border border-foreground/8 rounded-2xl px-4 py-2.5 pr-8 text-sm text-foreground shadow-sm cursor-pointer focus:outline-none focus:border-primary"
            >
              <option>All Locations</option>
              {cities.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
          </div>

          {/* Service dropdown */}
          <div className="relative">
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="appearance-none bg-white border border-foreground/8 rounded-2xl px-4 py-2.5 pr-8 text-sm text-foreground shadow-sm cursor-pointer focus:outline-none focus:border-primary"
            >
              {services.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
          </div>

          {/* Budget dropdown */}
          <div className="relative">
            <select
              value={budgetFilter}
              onChange={e => setBudgetFilter(e.target.value)}
              className="appearance-none bg-white border border-foreground/8 rounded-2xl px-4 py-2.5 pr-8 text-sm text-foreground shadow-sm cursor-pointer focus:outline-none focus:border-primary"
            >
              {budgets.map(b => <option key={b}>{b}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
          </div>

          <button className="w-9 h-9 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors shadow-sm">
            <Search size={15} />
          </button>
        </motion.div>

        {/* ── Map ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-foreground/8 border border-foreground/6"
          style={{ height: '520px' }}
        >
          <MapContainer
            center={[10.8505, 78.6677]}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            whenReady={() => setMapReady(true)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeCity && <FlyTo lat={activeCity.lat} lng={activeCity.lng} />}
            {filtered.map(city => (
              <Marker
                key={city.name}
                position={[city.lat, city.lng]}
                icon={makeIcon(city.primary, activeCity?.name === city.name)}
                eventHandlers={{ click: () => setActiveCity(city) }}
              />
            ))}
          </MapContainer>

          {/* Floating info card */}
          <AnimatePresence>
            {activeCity && (
              <motion.div
                key={activeCity.name}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 right-4 z-[999] w-72 rounded-2xl bg-white shadow-2xl shadow-black/20 overflow-hidden"
              >
                {/* Color header */}
                <div className="h-24 relative flex items-end p-4"
                  style={{ background: 'linear-gradient(135deg, hsl(351 50% 75%) 0%, hsl(39 60% 78%) 100%)' }}>
                  <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20 select-none">💄</div>
                  {activeCity.primary && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/30 text-white text-[9px] font-mono tracking-widest uppercase backdrop-blur-sm">
                      Home Base
                    </span>
                  )}
                  <button
                    onClick={() => setActiveCity(cities[0])}
                    className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                  >
                    <X size={11} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-serif text-lg text-foreground">{activeCity.name}</h3>
                    <span className="text-[10px] font-mono tracking-wide text-primary bg-primary/8 px-2 py-0.5 rounded-full">
                      {activeCity.primary ? '★ Studio' : 'Travel'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground/40 text-xs mb-3">
                    <MapPin size={10} />
                    <span>{activeCity.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className="px-2 py-0.5 rounded-lg bg-foreground/5 text-foreground/60 font-mono">{activeCity.service}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-primary/8 text-primary font-mono">{activeCity.packages}</span>
                  </div>
                  <a
                    href={`https://wa.me/917305306497?text=Hi Harini! I'd like to book a session in ${activeCity.name}. Can you confirm your availability?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-xl bg-foreground text-background text-xs font-mono tracking-widest uppercase hover:bg-foreground/85 transition-colors"
                  >
                    Book in {activeCity.name} →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 z-[999] flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-foreground/5">
            <div className="flex items-center gap-1.5 text-xs text-foreground/50">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="font-mono">Studio</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-foreground/50">
              <div className="w-3 h-3 rounded-full bg-white border border-foreground/20" />
              <span className="font-mono">On-site</span>
            </div>
            <div className="text-foreground/25 text-xs font-mono">Tap a pin</div>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-serif text-foreground mb-1">{stat.value}</div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/35">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
