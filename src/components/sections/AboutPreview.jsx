import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format';

export default function AboutPreview() {
  return (
    <section className="section-padding-lg bg-white" id="about">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="About AVM"
              title="Helping You Navigate Property Decisions With Clarity"
              className="mb-6"
            />

            <div className="space-y-4 text-slate-600 leading-relaxed max-w-lg">
              <p>
                AVM connects property buyers with relevant real estate projects through its
                network of channel partners. We believe property discovery should be simpler —
                with clear information and a structured path from initial interest to possession.
              </p>
              <p>
                Our role is to present curated project options, make comparison easier, and
                ensure that every enquiry reaches the right people for meaningful follow-up.
              </p>
            </div>

            <div className="mt-8">
              <Button to="/about" variant="secondary" size="md">
                Learn More About AVM
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="aspect-[4/3] rounded-image overflow-hidden shadow-card border border-slate-200">
              <img
                src={ABOUT_IMAGE}
                alt="Modern residential interior with natural light"
                className="image-cover hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-blue-200 rounded-image -z-10" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
