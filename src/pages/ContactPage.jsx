import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeading from '../components/ui/SectionHeading';
import EnquiryForm from '../components/forms/EnquiryForm';
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
    <main className="pt-[84px] md:pt-[96px] bg-white">
      {/* Main Contact Section */}
      <section className="pt-2 pb-12 md:pt-4 md:pb-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Heading and Introduction */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
                  Contact & Advisory Desk
                </span>
                <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                  Connect With an AVM Property Advisor
                </h1>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Whether you are ready to book a private project tour, have questions regarding specific floor plans, or want personalized project recommendations, our team is at your service.
                </p>
              </div>

              {/* Developer & Channel Partner Card (Clean Light) */}
              <div className="bg-blue-50 border border-blue-200/80 p-5 rounded-card shadow-xs mt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1">
                  Developer Partnerships
                </span>
                <h4 className="font-heading text-base font-bold text-slate-900 mb-1.5">
                  Are You a Real Estate Developer?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  AVM partners with quality-conscious builders seeking targeted buyer reach and professional channel distribution. Inquire about our onboarding criteria.
                </p>
                <a
                  href="mailto:partners@avmrealestate.com"
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  partners@avmrealestate.com &rarr;
                </a>
              </div>
            </div>

            {/* Right Column: Complete Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-8 rounded-card border border-slate-200 shadow-card">
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Enquiry & Booking Form
                  </span>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-900 mt-0.5">
                    Send Us Your Requirements
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete the form below. An AVM representative will review your preferences and get in touch.
                  </p>
                </div>

                <EnquiryForm sourcePage="/contact" showProjectSelect={true} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 md:py-24 mt-12 md:mt-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Common Questions"
              title="Frequently Asked Questions"
              description="Learn more about our advisory services, pricing transparency, and how we assist you at every phase."
              align="center"
            />

            <div className="space-y-3.5 mt-10">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-card border border-slate-200 shadow-xs overflow-hidden transition-all duration-150"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-heading text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          'text-slate-400 shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5">
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
