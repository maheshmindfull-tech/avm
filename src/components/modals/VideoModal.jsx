import { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import AiPresenterVideo from '../common/AiPresenterVideo';

export default function VideoModal({ isOpen, onClose, title = 'AVM Homes: Property, Better Understood' }) {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-[#2E1E17] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#3A2118]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#B4533A] flex items-center justify-center text-[#E3B84F]">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#FFF8F0] font-heading">{title}</h3>
              <p className="text-xs text-[#DCC7B8]">Official AI Property Advisor Introduction · Pune</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Video Player */}
        <div className="p-2 md:p-4 bg-[#1F140F]">
          <AiPresenterVideo autoPlay={true} />
        </div>
      </div>
    </div>
  );
}
