import { useState } from 'react';
import { CalendarCheck, Info, MapPin } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import ProjectDetailsModal from '../modals/ProjectDetailsModal';

export default function ProjectsSection() {
  const { openContactModal } = useModal();
  const [detailsProject, setDetailsProject] = useState(null);

  const projects = [
    {
      id: 'sample-project-a',
      name: 'Sample Project A',
      location: 'Charholi Budruk, Pune',
      config: '2 BHK Residences',
      price: '₹56 L – ₹68 L',
      carpet: '685 – 745 sq.ft.',
      status: 'Under construction',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format',
      description:
        'A master-planned residential community centered around open podium parks, amphitheater, and high connectivity to the upcoming Ring Road and Alandi-Markal corridor.',
      highlights: [
        'Podium Landscaped Garden',
        '5 Mins from upcoming Ring Road',
        'Children Play Zone & Clubhouse',
        '0% Brokerage with Free Advisory',
      ],
      c1: '#F2DDB4',
      c2: '#4A2A1F',
    },
    {
      id: 'sample-project-b',
      name: 'Sample Project B',
      location: 'Charholi Budruk, Pune',
      config: '2 & 3 BHK Luxury Apartments',
      price: '₹64 L – ₹89 L',
      carpet: '760 – 1050 sq.ft.',
      status: 'Launching soon',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format',
      description:
        'High-rise twin towers offering expansive 2 & 3 BHK residences with panoramic valley views, multi-tier security, and electric vehicle charging bays.',
      highlights: [
        'EV Charging Infrastructure',
        'Clubhouse with Gymnasium',
        'Wide Balcony Sit-outs',
        'Pre-launch Pricing Benefits',
      ],
      c1: '#F0C0A8',
      c2: '#8E4A32',
    },
    {
      id: 'sample-project-c',
      name: 'Sample Project C',
      location: 'Moshi, PCMC Pune',
      config: '1 & 2 BHK Residences',
      price: '₹38 L – ₹54 L',
      carpet: '480 – 690 sq.ft.',
      status: 'Under construction',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format',
      description:
        'Modern budget-friendly homes ideal for automotive and industrial professionals in PCMC, offering high rental yields and swift highway access.',
      highlights: [
        'Proximity to Bhosari & Chakan MIDC',
        'Solar Water Heating Included',
        'Grand Entrance Lobby',
        'Approved by SBI & Major Banks',
      ],
      c1: '#EBD7C3',
      c2: '#A0613F',
    },
    {
      id: 'sample-project-d',
      name: 'Sample Project D',
      location: 'Wakad, Pune',
      config: '3 BHK Premium Homes',
      price: '₹95 L – ₹1.25 Cr',
      carpet: '980 – 1280 sq.ft.',
      status: 'Possession soon',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80&auto=format',
      description:
        'Walk-to-work luxury homes close to Hinjewadi Phase 1, featuring premium marble vitrified flooring, private elevators, and rooftop swimming pool.',
      highlights: [
        'Sample Flat Ready for Inspection',
        'Near Top International Schools',
        'Swimming Pool & Rooftop Lounge',
        'Immediate Tax Benefits & Possession',
      ],
      c1: '#F4E2C8',
      c2: '#7A4A38',
    },
    {
      id: 'sample-project-e',
      name: 'Sample Project E',
      location: 'Hinjewadi IT Belt, Pune',
      config: '2 BHK Smart Homes',
      price: '₹68 L – ₹79 L',
      carpet: '710 – 790 sq.ft.',
      status: 'Under construction',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format',
      description:
        'Engineered for IT professionals with smart home automation, high-speed optical fiber backbone, and clubhouse with co-working pods.',
      highlights: [
        'Dedicated Co-working Pods in Club',
        'Smart Door Locks & Automation',
        '5 Mins from Metro Station',
        'Zero Brokerage Primary Sale',
      ],
      c1: '#F5E3A8',
      c2: '#9A7A2A',
    },
    {
      id: 'sample-project-f',
      name: 'Sample Project F',
      location: 'Kharadi East, Pune',
      config: '2 & 3 BHK Residences',
      price: '₹82 L – ₹1.15 Cr',
      carpet: '820 – 1180 sq.ft.',
      status: 'Launching soon',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format',
      description:
        'Expansive gated community in East Pune with sports facilities, jogging tracks, and swift connectivity to EON Free Zone and World Trade Center.',
      highlights: [
        '80% Open Green Space',
        'Close to EON IT Park & WTC',
        'Cricket Pitch & Tennis Court',
        'RERA Sanctioned Master Plan',
      ],
      c1: '#E9C9B8',
      c2: '#5C3326',
    },
  ];

  const handleScheduleVisit = (project) => {
    openContactModal({
      projectName: project.name,
      location: project.location,
      configuration: project.config,
    });
  };

  return (
    <>
      <section id="projects" className="py-20 bg-paper">
        <div className="wrap">
          <div className="head mb-10">
            <div>
              <div className="eb">Ongoing projects</div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink">
                Projects we advise on.
              </h2>
            </div>
            <p className="text-mute max-w-lg text-sm md:text-base leading-relaxed">
              Each one is a curated pick, with a clear view of who it suits and who should look
              elsewhere. Schedule a private site visit or view project details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-md border border-[rgba(110,60,35,0.16)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2E1E17]">
                  <img
                    src={project.image}
                    alt={`${project.name} in ${project.location}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Contrast Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Status Badge */}
                  <span className="absolute top-3 left-3 z-10 bg-white/95 text-[#3A2118] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
                    {project.status}
                  </span>

                  {/* Top-Right Price Chip */}
                  <span className="absolute top-3 right-3 z-10 bg-[#3A2118]/85 text-[#E3B84F] text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                    {project.price}
                  </span>

                  {/* Project Info on Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-white">
                    <span className="text-[11px] font-medium text-[#E3B84F] flex items-center gap-1 mb-0.5">
                      <MapPin size={11} />
                      {project.location}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold font-heading drop-shadow-sm text-white">
                      {project.name}
                    </h3>
                    <p className="text-[11px] text-white/90 drop-shadow-sm font-medium">
                      {project.config} · {project.carpet}
                    </p>
                  </div>
                </div>

                {/* 2 Reduced Height Action Buttons */}
                <div className="px-3 py-2 bg-card border-t border-[rgba(110,60,35,0.1)] grid grid-cols-2 gap-2">
                  {/* Schedule a Site Visit Button (Reduced Height) */}
                  <button
                    onClick={() => handleScheduleVisit(project)}
                    className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#B4533A] to-[#8E3F26] hover:from-[#A04630] hover:to-[#7A321D] text-white text-xs font-semibold shadow-xs transition-all duration-150 active:scale-95 text-center leading-none"
                    aria-label={`Schedule site visit for ${project.name}`}
                  >
                    <CalendarCheck size={13} className="shrink-0" />
                    <span>Site Visit</span>
                  </button>

                  {/* More About Project Button (Reduced Height) */}
                  <button
                    onClick={() => setDetailsProject(project)}
                    className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-tint hover:bg-[#F2E5D5] text-[#3A2118] border border-[rgba(110,60,35,0.18)] text-xs font-semibold transition-all duration-150 active:scale-95 text-center leading-none"
                    aria-label={`View details about ${project.name}`}
                  >
                    <Info size={13} className="shrink-0 text-brick" />
                    <span>About Project</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={detailsProject}
        isOpen={Boolean(detailsProject)}
        onClose={() => setDetailsProject(null)}
        onScheduleVisit={(proj) => handleScheduleVisit(proj)}
      />
    </>
  );
}
