import { motion } from 'framer-motion';
import { ArrowUpRight, Camera, Heart, Instagram, MessageCircle, Sparkles } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/glam_byharini/';

const igPhotos = [
  {
    src: '/assets/clients/000_client.jpg',
    label: 'Bridal Glow',
    className: 'lg:col-span-5 lg:row-span-2 min-h-[520px]',
  },
  {
    src: '/assets/clients/004_client.jpg',
    label: 'Reception Glam',
    className: 'lg:col-span-3 min-h-[250px]',
  },
  {
    src: '/assets/clients/013_client.webp',
    label: 'Soft Muse',
    className: 'lg:col-span-2 min-h-[250px]',
  },
  {
    src: '/assets/clients/021_client.jpg',
    label: 'Wedding Story',
    className: 'lg:col-span-2 min-h-[250px]',
  },
  {
    src: '/assets/clients/015_client.webp',
    label: 'Editorial Beauty',
    className: 'lg:col-span-3 min-h-[250px]',
  },
];

const socialStats = [
  { value: '500+', label: 'Transformations' },
  { value: 'Daily', label: 'Bridal Looks' },
  { value: 'Real', label: 'Client Stories' },
];

export default function InstagramSection() {
  return (
    <section id="instagram" className="relative overflow-hidden bg-[#fbf7f2] py-20 md:py-28">
      <div className="absolute left-[-15%] top-10 h-96 w-96 rounded-full bg-primary/14 blur-3xl" />
      <div className="absolute right-[-12%] bottom-10 h-[30rem] w-[30rem] rounded-full bg-[#d8b66d]/18 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-8 top-20 hidden rounded-full border border-primary/10 bg-white/70 p-4 text-primary shadow-xl shadow-primary/10 md:block"
      >
        <Sparkles size={22} />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-12 grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/65 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary shadow-sm backdrop-blur">
              <Instagram size={14} />
              Instagram
            </span>
            <h2 className="max-w-4xl font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-tight text-foreground">
              Follow the
              <span className="block italic text-primary">Glam Journey</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/56 md:text-lg">
              Step inside the real bridal moments, behind-the-chair details, and soft glam stories that shape every look.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-4 lg:items-end"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/70 bg-white/65 px-5 py-3 text-foreground shadow-[0_15px_40px_rgba(70,35,35,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:text-primary hover:shadow-primary/15"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary via-[#d16b8a] to-[#d8b66d] text-white">
                <Instagram size={17} />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.22em]">@glam_byharini</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-xl">
              {socialStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/70 bg-white/50 px-4 py-4 text-center shadow-sm backdrop-blur-md"
                >
                  <p className="font-serif text-2xl leading-none text-foreground">{stat.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/42">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto hidden max-w-7xl grid-cols-10 grid-rows-2 gap-4 lg:grid"
        >
          {igPhotos.map((photo, index) => (
            <InstagramCard key={photo.src} photo={photo} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:hidden"
        >
          {igPhotos.map((photo, index) => (
            <InstagramCard
              key={photo.src}
              photo={{ ...photo, className: 'min-h-[470px]' }}
              index={index}
              mobile
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[0_20px_60px_rgba(70,35,35,0.08)] backdrop-blur-md md:flex-row md:p-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary md:flex">
              <Camera size={20} />
            </div>
            <div>
              <p className="font-serif text-2xl text-foreground">Fresh looks, real stories, every week.</p>
              <p className="mt-1 text-sm leading-6 text-foreground/50">
                Follow for bridal prep, transformations, reels, and client moments.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-foreground via-primary to-[#d8a24f] px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white shadow-2xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30 md:w-auto"
          >
            Follow on Instagram
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function InstagramCard({
  photo,
  index,
  mobile = false,
}: {
  photo: { src: string; label: string; className: string };
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      whileHover={{ y: -8 }}
      className={`group relative block overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-[0_24px_70px_rgba(70,35,35,0.12)] backdrop-blur-md ${photo.className} ${
        mobile ? 'w-[82vw] max-w-[380px] shrink-0 snap-center' : ''
      }`}
    >
      <motion.img
        src={photo.src}
        alt={`${photo.label} Instagram showcase`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />

      <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur-md">
        {photo.label}
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-serif text-2xl leading-none text-white">GlamByHarini</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/68">
            Tap to view post
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-xl shadow-black/20 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
          <Instagram size={19} />
        </div>
      </div>

      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-black/20 px-3 py-2 text-white/85 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
        <Heart size={14} fill="currentColor" />
        <MessageCircle size={14} />
      </div>
    </motion.a>
  );
}
