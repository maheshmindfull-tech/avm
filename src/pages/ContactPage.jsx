import { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import Container from '../components/layout/Container';
import ContactSection from '../components/sections/ContactSection';
import { cn } from '../utils/helpers';

const FAQS = [
  {
    question: 'Why should I consult with AVM rather than contacting developers directly?',
    answer:
      'Developers will naturally only recommend their own inventory. AVM provides independent, comparative advice across multiple premier projects in your preferred micro-markets. We verify RERA status, construction velocity, legal clearance, and true carpet areas so you get unbiased options tailored strictly to your budget and family needs.',
  },
  {
    question: 'Does AVM charge any brokerage or consulting fee to homebuyers?',
    answer:
      'No. For all primary (new developer) residential bookings, our advisory, site-visit coordination, documentation checks, and loan assistance are completely free to homebuyers. We are compensated directly by authorized developers through accredited channel partner agreements.',
  },
  {
    question: 'How do private site visits work?',
    answer:
      'Once you shortlist one or more projects, our property advisor coordinates dedicated site inspections at your convenience. We arrange on-ground logistics, provide floor plan comparisons, and accompany you to evaluate the neighborhood, sunlight orientation, and amenities.',
  },
  {
    question: 'Can AVM assist with home loan sanctions and registration legalities?',
    answer:
      'Yes. Our team assists with coordinating competitive home loan approvals across major nationalized and private banks. We also guide you through the stamp duty calculation, agreement registration, and final possession inspections.',
  },
  {
    question: 'Are all projects listed on AVM compliant with RERA regulations?',
    answer:
      'Absolutely. We strictly feature projects that possess valid, verifiable RERA registrations and all necessary municipal building sanctions.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <main className="bg-paper pt-4">
      {/* Contact Section from new design */}
      <ContactSection />

      {/* Frequently Asked Questions */}
      <section className="bg-tint py-16 md:py-24 border-t border-[rgba(110,60,35,0.16)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="eb">Common Questions</div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink">
                Frequently Asked Questions
              </h2>
              <p className="text-mute mt-3 max-w-xl mx-auto">
                Learn more about our advisory services, pricing transparency, and how we assist you
                at every phase.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-xl border border-[rgba(110,60,35,0.16)] shadow-sm overflow-hidden transition-all duration-150"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-heading text-base font-semibold text-ink hover:text-brick transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          'text-mute shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-180 text-brick' : ''
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-mute leading-relaxed border-t border-[rgba(110,60,35,0.1)] pt-3.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
