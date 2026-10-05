import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format',
    alt: 'Contemporary residential exterior with landscaping',
    category: 'Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format',
    alt: 'Modern living room with natural light',
    category: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&auto=format',
    alt: 'Contemporary kitchen with island counter',
    category: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&auto=format',
    alt: 'Residential building exterior at dusk',
    category: 'Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format',
    alt: 'Spacious bedroom with modern furnishings',
    category: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80&auto=format',
    alt: 'Modern apartment complex with balconies',
    category: 'Architecture',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="section-padding-lg bg-cream" id="gallery">
      <Container>
        <SectionHeading
          eyebrow="Project Gallery"
          title="See the Spaces. Feel the Possibility."
          description="A selection of architectural and interior images from projects available through AVM."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={i}
              className={`relative overflow-hidden rounded-card group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightbox(i)}
              aria-label={`View full image: ${img.alt}`}
            >
              <div className={i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="image-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-forest-deep/0 group-hover:bg-forest-deep/20 transition-colors duration-300" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.category}
              </span>
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <img
            src={GALLERY_IMAGES[lightbox].src.replace('w=800', 'w=1600')}
            alt={GALLERY_IMAGES[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
