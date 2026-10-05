import { motion } from 'framer-motion';
import { Search, Building2, FileCheck, Send, PhoneCall, Handshake } from 'lucide-react';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';

const STEPS = [
  {
    icon: Search,
    title: 'Understand Requirements',
    description: 'We learn about your preferences, budget, and lifestyle to identify what matters most.',
  },
  {
    icon: Building2,
    title: 'Explore Projects',
    description: 'Browse a curated set of relevant properties matched to your requirements.',
  },
  {
    icon: FileCheck,
    title: 'Review Details',
    description: 'Compare project information, configurations, amenities, and locations side by side.',
  },
  {
    icon: Send,
    title: 'Submit Enquiry',
    description: 'Express interest in a project through a simple, structured enquiry form.',
  },
  {
    icon: PhoneCall,
    title: 'Connect With Team',
    description: 'Your enquiry reaches the relevant team for a timely and informed follow-up.',
  },
  {
    icon: Handshake,
    title: 'Continue the Conversation',
    description: 'Discussion, site visits, and next steps — supported at every stage.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function HowItWorks() {
  return (
    <section className="section-padding-lg bg-slate-50 border-y border-slate-200" id="process">
      <Container>
        <SectionHeading
          eyebrow="How AVM Works"
          title="A Clearer Path to Your Next Property"
          description="A structured process designed to make property discovery and enquiry simpler at every step."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                variants={cardVariants}
                className="bg-white rounded-card p-7 border border-slate-200 shadow-xs hover:shadow-card-hover hover:border-blue-300 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    STEP {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
