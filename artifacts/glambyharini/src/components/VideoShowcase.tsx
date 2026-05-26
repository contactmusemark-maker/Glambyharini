import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const videos = [
  { src: '/assets/clients/003_client.mp4', title: 'Bridesmaid Glow', tag: 'Bridal' },
  { src: '/assets/clients/010_client.mp4', title: 'Luxury Glam Look', tag: 'Bridal' },
  { src: '/assets/clients/012_client.mp4', title: 'Before & After', tag: 'Transformation' },
  { src: '/assets/clients/018_client.mp4', title: 'Minimal Bridesmaid', tag: 'Bridal' },
  { src: '/assets/clients/019_client.mp4', title: 'Baby Shower Glow', tag: 'Occasion' },
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group overflow-hidden bg-foreground/5 rounded-none"
    >
      <video
        ref={ref}
        src={video.src}
        muted={muted}
        loop
        playsInline
        className="w-full aspect-[9/16] object-cover transition-transform duration-700 group-hover:scale-105"
        onEnded={() => setPlaying(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="font-mono text-xs tracking-widest uppercase text-primary/80">{video.tag}</span>
        <p className="text-white font-serif text-lg mt-1">{video.title}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={toggle}
          className="w-14 h-14 rounded-full glass-panel text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/30"
        >
          {playing ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
        </button>
      </div>

      <button
        onClick={() => {
          setMuted(!muted);
          if (ref.current) ref.current.muted = !muted;
        }}
        className="absolute top-3 right-3 w-9 h-9 rounded-full glass-panel text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </motion.div>
  );
}

export default function VideoShowcase() {
  return (
    <section id="videos" className="py-24 md:py-40 bg-foreground/[0.03] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-[0.2em] uppercase text-primary"
          >
            Reels
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif mt-3"
          >
            Stories in Motion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mt-4 max-w-md mx-auto"
          >
            Watch the transformations come alive — real looks, real moments, real artistry.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {videos.map((video, i) => (
            <VideoCard key={video.src} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
