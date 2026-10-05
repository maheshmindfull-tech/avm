import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-slate-50 border-t border-slate-200 py-section-lg">
      <Container className="text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
            Start Here
          </span>

          <h2 className="font-heading text-h1 font-bold text-slate-900">
            Your Next Property Search
            <br />
            <span className="font-serif italic font-normal text-blue-600">Starts Here.</span>
          </h2>

          <p className="mt-4 text-base md:text-lead text-slate-600 max-w-lg mx-auto leading-relaxed">
            Tell us what you are looking for. Explore available projects or
            connect with the AVM team for personalised guidance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button to="/projects" variant="primary" size="lg">
              Explore Projects
              <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              <Phone size={16} />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
