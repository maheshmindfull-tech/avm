import { useEffect } from 'react';
import { X } from 'lucide-react';
import EnquiryForm from '../forms/EnquiryForm';

export default function EnquiryModal({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-card shadow-modal border border-slate-200 p-6 sm:p-8 z-10 my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
            Quick Enquiry
          </span>
          <h2 id="modal-title" className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Enquire With AVM Real Estate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Fill in your details below. An authorized AVM advisor will review your preferences and contact you promptly.
          </p>
        </div>

        {/* Form */}
        <EnquiryForm
          sourcePage="Enquiry Modal"
          showProjectSelect={true}
          compact={false}
        />
      </div>
    </div>
  );
}
