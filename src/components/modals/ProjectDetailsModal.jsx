import { useEffect } from 'react';
import { X, CalendarCheck, ShieldCheck, MapPin, Building, Ruler, IndianRupee, Check, ArrowRight } from 'lucide-react';

export default function ProjectDetailsModal({ project, isOpen, onClose, onScheduleVisit }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-[rgba(110,60,35,0.18)] overflow-hidden text-ink max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-tint border-b border-[rgba(110,60,35,0.12)] shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-brick/10 text-brick text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-brick/20">
              {project.status}
            </span>
            <span className="text-xs text-mute font-medium">Project Overview</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-mute hover:text-ink hover:bg-[rgba(110,60,35,0.08)] transition-colors"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-4.5">
          {/* Architectural Banner */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-sm bg-[#2E1E17]">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[11px] font-medium text-[#E3B84F] flex items-center gap-1 mb-0.5">
                <MapPin size={12} />
                {project.location}
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-heading text-white leading-tight">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-tint border border-[rgba(110,60,35,0.1)]">
              <span className="text-[10px] text-mute block uppercase tracking-wider font-semibold">Starting Price</span>
              <span className="font-bold text-xs md:text-sm text-ink block mt-0.5">{project.price}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-tint border border-[rgba(110,60,35,0.1)]">
              <span className="text-[10px] text-mute block uppercase tracking-wider font-semibold">Configuration</span>
              <span className="font-bold text-xs md:text-sm text-ink block mt-0.5">{project.config?.split(' ')[0] || '2 BHK'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-tint border border-[rgba(110,60,35,0.1)]">
              <span className="text-[10px] text-mute block uppercase tracking-wider font-semibold">Carpet Area</span>
              <span className="font-bold text-xs md:text-sm text-ink block mt-0.5">{project.carpet}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-tint border border-[rgba(110,60,35,0.1)]">
              <span className="text-[10px] text-mute block uppercase tracking-wider font-semibold">RERA Check</span>
              <span className="font-bold text-xs md:text-sm text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
                <ShieldCheck size={13} />
                100% Valid
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brick mb-1.5 font-heading">
              About the Development
            </h3>
            <p className="text-xs md:text-sm text-mute leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brick mb-2 font-heading">
              Key Project Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-ink bg-tint/60 px-3 py-2 rounded-lg border border-[rgba(110,60,35,0.08)]">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="line-clamp-1">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-3.5 px-5 bg-tint border-t border-[rgba(110,60,35,0.14)] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="text-xs text-mute hover:text-ink font-semibold px-2 py-1 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onScheduleVisit(project);
            }}
            className="btn text-xs py-2 px-4 shadow-sm flex items-center gap-1.5"
          >
            <CalendarCheck size={14} />
            <span>Schedule Site Visit</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
