import { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const GALLERY_ITEMS = [
  {
    id: 1,
    badge: '1 BHK Layout',
    title: '1 BHK Contemporary Living & Balcony',
    location: 'Charholi Budruk, Pune',
    description: 'Smart space-optimized living room with natural daylight and private sit-out balcony.',
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&q=80&auto=format',
  },
  {
    id: 2,
    badge: '2 BHK Residence',
    title: '2 BHK Expansive Living & Dining Suite',
    location: 'Wakad, Pune',
    description: 'Open-concept hall with large balcony glass doors, designed for modern family gatherings.',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80&auto=format',
  },
  {
    id: 3,
    badge: 'Dome Architecture',
    title: 'Grand Dome Classical Residential Pavilion',
    location: 'Baner-Pashan, Pune',
    description: 'Iconic dome rooftop clubhouse and landscaped neoclassical architectural estate.',
    src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80&auto=format',
  },
  {
    id: 4,
    badge: '1 BHK Layout',
    title: '1 BHK Master Bedroom Suite',
    location: 'Moshi, Pune',
    description: 'Efficiently planned bedroom with floor-to-ceiling wardrobe niche and ventilation.',
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80&auto=format',
  },
  {
    id: 5,
    badge: '2 BHK Residence',
    title: '2 BHK Master Bedroom with Wooden Finishes',
    location: 'Baner, Pune',
    description: 'Spacious master suite featuring wooden flooring, ambient lighting, and attached washroom.',
    src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1000&q=80&auto=format',
  },
  {
    id: 6,
    badge: 'Dome Architecture',
    title: 'Landmark Dome Tower & Sky Clubhouse',
    location: 'Charholi Growth Corridor, Pune',
    description: 'Distinctive illuminated dome architectural crown overlooking the Pune skyline.',
    src: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&q=80&auto=format',
  },
  {
    id: 7,
    badge: '1 BHK Layout',
    title: '1 BHK Space-Efficient Modular Kitchen',
    location: 'Charholi, Pune',
    description: 'Modern L-shaped granite platform with sleek storage cabinets and utility dry balcony.',
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80&auto=format',
  },
  {
    id: 8,
    badge: '2 BHK Residence',
    title: '2 BHK Kids / Work-From-Home Bedroom',
    location: 'Hinjewadi IT Belt, Pune',
    description: 'Versatile second bedroom suitable for children or home office setup with high-speed fiber.',
    src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1000&q=80&auto=format',
  },
  {
    id: 9,
    badge: 'Dome Architecture',
    title: 'Iconic Skylight Dome Glass Atrium',
    location: 'Kharadi, Pune',
    description: 'Modern central dome atrium filtering natural sun into the grand entrance lobby.',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80&auto=format',
  },
];

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { openContactModal } = useModal();

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const activeLightboxItem =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <>
      <section id="gallery" className="py-20 bg-tint/60 border-t border-[rgba(110,60,35,0.12)]">
        <div className="wrap">
          {/* Section Header */}
          <div className="head mb-10">
            <div>
              <div className="eb">Visual Showcase</div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink">
                Photo Gallery
              </h2>
            </div>
            <p className="text-mute max-w-lg text-sm md:text-base leading-relaxed">
              Explore real photos of 1 BHK, 2 BHK configurations and iconic dome architectural
              landmarks across our verified Pune partner developments.
            </p>
          </div>

          {/* Photo Grid without filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-md border border-[rgba(110,60,35,0.14)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Photo Thumbnail */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#2E1E17] relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Contrast Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Zoom Icon */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={16} />
                    </span>
                  </div>

                  {/* Bottom Info on Card */}
                  <div className="absolute bottom-3.5 left-4 right-4 z-10 text-white">
                    <span className="text-[11px] font-medium text-[#E3B84F] tracking-wide uppercase block">
                      {item.location}
                    </span>
                    <h3 className="text-lg font-bold font-heading line-clamp-1 text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action strip inside Gallery */}
          <div className="mt-12 p-6 md:p-8 bg-card border border-[rgba(110,60,35,0.18)] rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold font-heading text-ink">
                Want to view sample flats &amp; dome architecture in person?
              </h4>
              <p className="text-sm text-mute mt-1">
                We organize personalized private site visits with dedicated transportation across
                Charholi, Wakad, and Baner.
              </p>
            </div>
            <button
              onClick={() => openContactModal({ source: 'Photo Gallery Site Visit CTA' })}
              className="btn shrink-0"
            >
              Schedule a Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full bg-[#2E1E17] rounded-2xl overflow-hidden shadow-2xl border border-white/20 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#3A2118] border-b border-white/10">
              <div>
                <h3 className="text-base font-bold font-heading text-[#FFF8F0]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-[#DCC7B8]">{activeLightboxItem.location}</p>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={22} />
              </button>
            </div>

            {/* High-res Image Display */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.src}
                alt={activeLightboxItem.title}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#B4533A] text-white flex items-center justify-center backdrop-blur-sm transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#B4533A] text-white flex items-center justify-center backdrop-blur-sm transition-all"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Footer */}
            <div className="p-4 md:p-6 bg-[#3A2118] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#DCC7B8] text-center sm:text-left">
                {activeLightboxItem.description}
              </p>
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  openContactModal({
                    location: activeLightboxItem.location,
                  });
                }}
                className="btn text-sm py-2 px-5 shrink-0"
              >
                Inquire About This Layout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
