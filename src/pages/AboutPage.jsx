import {
  ShieldCheck,
  Building2,
  Handshake,
  Users,
} from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeading from '../components/ui/SectionHeading';
import HowItWorks from '../components/sections/HowItWorks';
import WhyChooseAVM from '../components/sections/WhyChooseAVM';
import ContactCTA from '../components/sections/ContactCTA';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'RERA Compliance & Verification',
    description:
      'Every project in our portfolio is scrutinized for registered RERA approvals, clear land titles, and sanctioned master plans.',
  },
  {
    icon: Handshake,
    title: 'Zero Brokerage on Primary Bookings',
    description:
      'We work as an authorized channel partner network for leading real estate developers, meaning homebuyers pay zero brokerage on new bookings.',
  },
  {
    icon: Building2,
    title: 'Curated Developer Network',
    description:
      'We partner exclusively with reputable developers who have a proven track record of timely delivery and construction quality.',
  },
  {
    icon: Users,
    title: 'End-to-End Buyer Advocacy',
    description:
      'From your first site inspection to banking loan sanctions and final key handover, our property specialists stand with you at every milestone.',
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-28 bg-white">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2.5 block">
              About AVM Real Estate
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-5">
              Simplifying the Journey From Search to Possession
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              AVM is a specialized real estate advisory firm dedicated to connecting discerning property buyers with premium residential developments. Operating through an accredited channel partner ecosystem, we bring clarity, transparency, and architectural appreciation to the homebuying experience.
            </p>
          </div>
        </Container>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Our Story & Vision
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Built on Trust, Precision, and True Buyer Representation
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Navigating the modern residential property landscape can be overwhelming. Buyers encounter conflicting advice, aggressive marketing claims, and convoluted legal processes.
              </p>
              <p className="text-slate-600 leading-relaxed">
                AVM was founded on a simple premise: home acquisition should be an inspiring, orderly, and transparent milestone. We combine deep micro-market knowledge with a selective eye for architecture, structural integrity, and long-term livability.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-slate-200">
                <div>
                  <span className="font-heading text-3xl font-bold text-blue-600">
                    100%
                  </span>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    RERA Registered Projects Shortlisted
                  </p>
                </div>
                <div>
                  <span className="font-heading text-3xl font-bold text-blue-600">
                    0%
                  </span>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Brokerage Fee for Primary Homebuyers
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-card overflow-hidden shadow-card border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80&auto=format"
                  alt="Modern architectural living space"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-medium">
                    "Every home we recommend is evaluated as if we were purchasing it for ourselves."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Pillars */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Guiding Standards"
            title="The Principles That Govern Every Recommendation"
            description="We bridge the gap between homebuyers and developers with unwavering integrity and client-first commitment."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-card border border-slate-200 shadow-xs hover:shadow-card-hover hover:border-blue-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process Section with id="process" */}
      <div id="process">
        <HowItWorks />
      </div>

      {/* Why Choose AVM Section */}
      <WhyChooseAVM />

      {/* Bottom CTA */}
      <ContactCTA />
    </main>
  );
}
