import { motion } from 'framer-motion';
import { Layers, Eye, MessageSquareText, Route, Users } from 'lucide-react';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';

const BENEFITS = [
  {
    icon: Layers,
    title: 'Project Discovery in One Place',
    description: 'Browse multiple real estate projects on a single platform without visiting dozens of individual sources.',
  },
  {
    icon: Eye,
    title: 'Clear Project Information',
    description: 'Each listing presents verified details in a consistent, easy-to-compare format.',
  },
  {
    icon: MessageSquareText,
    title: 'Simple Enquiry Process',
    description: 'Submit your interest in seconds. Your enquiry reaches the relevant team promptly.',
  },
  {
    icon: Route,
    title: 'Structured Follow-Up',
    description: 'Every enquiry is tracked and routed so you receive a timely, informed response.',
  },
  {
    icon: Users,
    title: 'People-Focused Approach',
    description: 'AVM is built around relationships — between buyers, channel partners, and projects.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' },
  }),
};

export default function WhyChooseAVM() {
  return (
    <section className="section-padding-lg bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Choose AVM"
          title="What Makes the Experience Different"
          description="We focus on making property discovery clear, organised, and responsive."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white rounded-card p-7 border border-slate-200 shadow-xs hover:shadow-card-hover hover:border-blue-300 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
