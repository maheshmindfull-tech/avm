import { useRef, useState } from 'react';

export default function ClientStories() {
  const trackRef = useRef(null);
  const [playingIdx, setPlayingIdx] = useState(null);

  const stories = [
    {
      c1: '#F2DDB4',
      c2: '#4A2A1F',
      duration: '1:20',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&auto=format',
      quote: '“Everything was explained before we signed.”',
      author: 'Rohit & Sneha K. · Sample Project A (Charholi)',
      title: 'Sample Project A Homebuyer Experience',
    },
    {
      c1: '#F0C0A8',
      c2: '#8E4A32',
      duration: '1:05',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format',
      quote: '“We saw three homes, and one was clearly right.”',
      author: 'Vikram Joshi · Sample Project B (Charholi)',
      title: 'Finding the Right 3 BHK in Charholi',
    },
    {
      c1: '#EBD7C3',
      c2: '#A0613F',
      duration: '1:40',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format',
      quote: '“They stayed with us until the keys.”',
      author: 'Ananya Deshmukh · Sample Project C (Moshi)',
      title: 'End-to-End Homebuyer Support in Moshi',
    },
    {
      c1: '#F4E2C8',
      c2: '#7A4A38',
      duration: '1:15',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format',
      quote: '“As an NRI, the virtual site visit made it easy.”',
      author: 'Siddharth M. · Remote / NRI Buyer (Dubai)',
      title: 'Virtual Advisory & Seamless NRI Booking',
    },
  ];

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trackRef.current.scrollBy({
      left: direction * 360,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const togglePlay = (idx) => {
    setPlayingIdx(playingIdx === idx ? null : idx);
  };

  return (
    <section className="st" id="stories">
      <div className="wrap">
        <div className="head">
          <div>
            <div className="eb">Client stories</div>
            <h2>Hear it from the people who bought.</h2>
          </div>
          <div className="arrows">
            <button onClick={() => scroll(-1)} aria-label="Previous stories">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button onClick={() => scroll(1)} aria-label="Next stories">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Client video stories"
        >
          {stories.map((story, idx) => {
            const isCardPlaying = playingIdx === idx;
            return (
              <article key={idx} className="vcard group">
                <div
                  className="th relative overflow-hidden cursor-pointer select-none"
                  style={{ '--c1': story.c1, '--c2': story.c2 }}
                  onClick={() => togglePlay(idx)}
                >
                  {/* Real Homebuyer Photo */}
                  <img
                    src={story.image}
                    alt={story.author}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      isCardPlaying ? 'scale-110 filter brightness-110' : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />

                  {/* Contrast gradient */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

                  {/* In-place playback indicator / Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(idx);
                    }}
                    aria-label={`Toggle story: ${story.title}`}
                    className="z-10 shadow-lg"
                  >
                    <svg width="26" height="26" style={{ position: 'static' }}>
                      <use href="#pl" />
                    </svg>
                  </button>

                  <em className="z-10 backdrop-blur-sm">
                    {isCardPlaying ? 'Playing' : story.duration}
                  </em>
                </div>
                <div className="t">
                  <q>{story.quote}</q>
                  <small>{story.author}</small>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
