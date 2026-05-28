import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const videos = [
  { src: '/assets/clients/003_client.mp4', title: 'Bridesmaid Glow', tag: 'Bridal' },
  { src: '/assets/clients/010_client.mp4', title: 'Luxury Glam', tag: 'Bridal' },
  { src: '/assets/clients/012_client.mp4', title: 'Before & After', tag: 'Transformation' },
  { src: '/assets/clients/018_client.mp4', title: 'Soft Minimal', tag: 'Bridal' },
  { src: '/assets/clients/019_client.mp4', title: 'Occasion Glow', tag: 'Occasion' },
];

function VideoCard({
  video,
  index,
  active,
  onFocus,
}: {
  video: (typeof videos)[0];
  index: number;
  active: boolean;
  onFocus: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    element.muted = true;

    if (active) {
      const playPromise = element.play();
      if (playPromise) {
        playPromise.catch(() => {
          element.controls = true;
        });
      }
    } else {
      element.pause();
    }
  }, [active]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: index * 0.06 }}
      onMouseEnter={onFocus}
      onFocus={onFocus}
      className="snap-center shrink-0 basis-[82vw] sm:basis-[46vw] lg:basis-[30%]"
    >
      <div
        className={`group relative overflow-hidden rounded-[28px] bg-[#161313] shadow-xl transition duration-500 ${
          active
            ? 'scale-[1.02] shadow-primary/20 ring-1 ring-primary/25'
            : 'scale-95 opacity-75 hover:opacity-100'
        }`}
      >
        <div className="relative aspect-[9/16] min-h-[460px] overflow-hidden sm:min-h-[520px] lg:min-h-[560px]">
          <video
            ref={videoRef}
            src={video.src}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-white/60">
              {video.tag}
            </div>
            <h3 className="mt-2 font-serif text-3xl leading-tight text-white md:text-4xl">
              {video.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function VideoShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveFromScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    const children = Array.from(scroller.children) as HTMLElement[];
    const nearest = children.reduce(
      (best, child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(center - childCenter);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    );

    setActiveIndex(nearest.index);
  };

  const scrollToIndex = (nextIndex: number) => {
    const scroller = scrollerRef.current;
    const target = scroller?.children[nextIndex] as HTMLElement | undefined;
    if (!scroller || !target) return;

    setActiveIndex(nextIndex);
    target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <section id="videos" className="relative overflow-hidden bg-[#f7f3ed] py-20 md:py-28">
      <div className="mx-auto w-[90vw] max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
            Reels
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-6xl">
            Stories in Motion
          </h2>
          <p className="mt-4 text-base leading-7 text-foreground/55">
            Cinematic glimpses of real glam moments, edited down to the essentials.
          </p>
        </motion.div>

        <div className="mt-12 md:mt-14">
          <div
            ref={scrollerRef}
            onScroll={updateActiveFromScroll}
            className="-mx-4 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-4 pb-8 [scrollbar-width:none] md:gap-10 [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((video, index) => (
              <VideoCard
                key={video.src}
                video={video}
                index={index}
                active={activeIndex === index}
                onFocus={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous reel"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground transition hover:border-primary hover:text-primary disabled:opacity-30"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-2">
              {videos.map((video, index) => (
                <button
                  key={video.src}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Show ${video.title}`}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index ? 'w-8 bg-primary' : 'w-2 bg-foreground/20'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(videos.length - 1, activeIndex + 1))}
              disabled={activeIndex === videos.length - 1}
              aria-label="Next reel"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground transition hover:border-primary hover:text-primary disabled:opacity-30"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
