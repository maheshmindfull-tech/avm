import { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, CalendarCheck, Calendar } from 'lucide-react';
import { submitEnquiry } from '../../services/enquiryService';

export default function QuickContactModal({ isOpen, onClose, initialData = {} }) {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectName: '',
    location: '',
    visitDate: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    submitted: false,
    leadId: null,
  });

  useEffect(() => {
    if (initialData && typeof initialData === 'object') {
      const projName = initialData.projectName || '';
      const loc = initialData.location || '';
      setFormData((prev) => ({
        ...prev,
        projectName: projName,
        location: loc,
      }));
    }
  }, [initialData, isOpen]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, leadId: null });

    const notesSummary = [
      formData.projectName ? `Project: ${formData.projectName}` : '',
      formData.location ? `Location: ${formData.location}` : '',
      formData.visitDate ? `Preferred Date: ${formData.visitDate}` : 'Date: Flexible',
    ]
      .filter(Boolean)
      .join(' | ');

    try {
      const res = await submitEnquiry(
        {
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email.trim() || 'Not Provided',
          projectName: formData.projectName || 'General Advisory',
          city: 'Pune',
          notes: notesSummary,
        },
        {
          sourcePage: formData.projectName
            ? `Site Visit - ${formData.projectName}`
            : 'Navbar Contact Modal',
        }
      );

      setStatus({
        loading: false,
        submitted: true,
        leadId: res?.leadId || null,
      });

      // Reset
      setFormData({
        name: '',
        phone: '',
        email: '',
        projectName: '',
        location: '',
        visitDate: '',
      });
    } catch {
      setStatus({
        loading: false,
        submitted: true,
        leadId: null,
      });
    }
  };

  if (!isOpen) return null;

  const isSiteVisit = Boolean(formData.projectName);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-[rgba(110,60,35,0.18)] overflow-hidden text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-tint border-b border-[rgba(110,60,35,0.12)]">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AVM Homes"
              className="h-9 w-auto object-contain"
            />
            <div className="border-l border-[rgba(110,60,35,0.2)] pl-3">
              <h3 className="text-base font-bold font-heading text-ink leading-none">
                {isSiteVisit ? 'Schedule Site Visit' : 'Quick Consultation'}
              </h3>
              <p className="text-[11px] text-mute flex items-center gap-1 mt-1">
                <ShieldCheck size={12} className="text-brick" />
                Zero Brokerage · Free Assisted Visit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-mute hover:text-ink hover:bg-[rgba(110,60,35,0.08)] transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {status.submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="text-lg font-bold font-heading text-ink">
                {isSiteVisit ? 'Site Visit Requested!' : 'Request Received'}
              </h4>
              <p className="text-xs text-mute max-w-xs mx-auto leading-relaxed">
                An AVM senior property advisor will call you to confirm your timing, transportation,
                and sample flat access.
              </p>
              {status.leadId && (
                <div className="inline-block bg-tint px-3 py-1 rounded-lg border border-[rgba(110,60,35,0.14)] font-mono text-xs text-brick font-semibold">
                  Ref ID: {status.leadId}
                </div>
              )}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="btn text-xs py-2 px-5"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Target Project Banner */}
              {isSiteVisit && (
                <div className="bg-tint border border-[rgba(110,60,35,0.16)] rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brick tracking-wider block">
                      Target Project
                    </span>
                    <span className="font-bold text-ink text-sm block leading-tight">
                      {formData.projectName}
                    </span>
                    <span className="text-[11px] text-mute">{formData.location}</span>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2 rounded-xl border border-[rgba(110,60,35,0.18)] bg-paper text-sm text-ink focus:outline-none focus:border-brick"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2 rounded-xl border border-[rgba(110,60,35,0.18)] bg-paper text-sm text-ink focus:outline-none focus:border-brick"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-[rgba(110,60,35,0.18)] bg-paper text-sm text-ink focus:outline-none focus:border-brick"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1 flex items-center gap-1.5">
                  <Calendar size={13} className="text-brick" />
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  min={today}
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[rgba(110,60,35,0.18)] bg-paper text-sm text-ink focus:outline-none focus:border-brick cursor-pointer"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status.loading}
                className="btn w-full justify-center py-2.5 text-sm font-semibold shadow-md mt-1"
              >
                <CalendarCheck size={15} />
                {status.loading
                  ? 'Submitting...'
                  : isSiteVisit
                    ? 'Schedule Site Visit'
                    : 'Request Consultation'}
              </button>

              <p className="text-[10px] text-center text-mute pt-0.5">
                🔒 Privacy Guarantee: No spam. Direct call from an AVM senior property specialist.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
