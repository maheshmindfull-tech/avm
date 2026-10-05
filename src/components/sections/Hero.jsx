import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&auto=format';

export default function Hero() {
  return (
    <section
      className="relative min-h-[620px] md:min-h-[720px] lg:min-h-[760px] flex items-end overflow-hidden"
      aria-label="AVM introduction"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Contemporary residential architecture with natural light"
          className="image-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="bg-gradient-hero absolute inset-0" />
      </div>

      {/* Bottom fade into white page */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent z-10" />

      <Container className="relative z-20 pb-16 md:pb-24 pt-32">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4 bg-blue-950/40 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/20">
            AVM Real Estate — Pune
          </span>

          <h1 className="font-heading text-display text-white font-bold">
            Find a Place That
            <br />
            <span className="font-serif italic font-normal text-blue-100">Feels Right.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/85 max-w-lg leading-relaxed">
            Explore property opportunities with clear information, thoughtful guidance,
            and a simpler path from discovery to possession.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button to="/projects" variant="primary" size="lg">
              Explore Projects
              <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="ghost-white" size="lg">
              Talk to Our Team
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute right-8 bottom-8 z-20 hidden lg:flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl] font-medium">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/30" />
      </div>
    </section>
  );
}
