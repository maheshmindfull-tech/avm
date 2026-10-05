import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const SCRIPT_SECTIONS = [
  {
    time: 0,
    heading: 'Welcome to AVM Homes',
    text: "Hello and welcome to AVM Homes. I'm your Pune property advisory specialist.",
  },
  {
    time: 15,
    heading: 'Unbiased Advisory vs. Traditional Brokers',
    text: "Unlike traditional brokers who push single developments for high commissions, AVM operates as your personal, fiduciary property advisory partner.",
  },
  {
    time: 35,
    heading: '100% MahaRERA Due Diligence',
    text: "Every project in our portfolio is thoroughly scrutinized: 100% MahaRERA compliance, clear title deeds, and honest usable carpet area calculations.",
  },
  {
    time: 55,
    heading: 'Zero Brokerage Guarantee',
    text: "Best of all, our advisory, private site visits, loan assistance, and legal paperwork guidance are 100% free with zero brokerage to homebuyers.",
  },
  {
    time: 75,
    heading: 'Pune Micro-Markets & Charholi Corridor',
    text: "Whether you are looking in the Charholi growth corridor, Wakad, or Baner, we help you understand the ground reality before you commit.",
  },
];

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCaption, setActiveCaption] = useState(SCRIPT_SECTIONS[0]);
  const totalDuration = 90; // 1:30

  const { openContactModal } = useModal();
  const intervalRef = useRef(null);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          const currentSection = [...SCRIPT_SECTIONS].reverse().find((s) => next >= s.time);
          if (currentSection) setActiveCaption(currentSection);
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Voice narration with SpeechSynthesis
  const speakCurrentCaption = (text) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en')
      );
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback
    }
  };

  useEffect(() => {
    if (isPlaying && !isMuted) {
      speakCurrentCaption(activeCaption.text);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [activeCaption, isPlaying, isMuted]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
    const currentSection = [...SCRIPT_SECTIONS].reverse().find((s) => time >= s.time);
    if (currentSection) setActiveCaption(currentSection);
    if (!isPlaying) setIsPlaying(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="hero" aria-label="Our trust story">
      <div className="wrap">
        {/* Simple In-Place Video Playing Directly on the Same Position */}
        <div
          className="video rise relative rounded-2xl overflow-hidden shadow-2xl bg-[#4A2A1F] aspect-[16/10] select-none"
          onClick={togglePlay}
          role="region"
          aria-label="AVM Video Presentation Player"
        >
          {/* AI Presenter Photo with subtle dynamic motion when playing */}
          <img
            src="/ai-presenter.jpg"
            alt="AVM Homes Property Presenter"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105 filter brightness-105' : 'scale-100'
            }`}
          />

          {/* Cinematic lighting gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E17]/95 via-black/25 to-black/35" />

          {/* Blueprint subtle overlay lines (when paused) */}
          {!isPlaying && (
            <svg
              viewBox="0 0 640 400"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-80"
            >
              <g fill="none" stroke="#F3C96B" strokeWidth="1.6" strokeDasharray="4 4" opacity=".85">
                <path d="M455 78Q430 90 402 112" />
                <path d="M92 128Q110 150 134 186" />
                <path d="M505 372Q500 355 492 344" />
              </g>
              <g className="hand" fill="#F3C96B" fontSize="27" fontWeight="600">
                <text x="440" y="70">Hidden costs?</text>
                <text x="20" y="120">Carpet vs built-up?</text>
                <text x="440" y="392">Who should buy?</text>
              </g>
            </svg>
          )}

          {/* Top Status Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-2 bg-[#2E1E17]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-white">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? 'bg-red-500 animate-ping' : 'bg-emerald-400'
                }`}
              />
              <span className="font-semibold">
                {isPlaying ? 'Playing in Place' : 'AI Video Introduction'}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-[#E3B84F] flex items-center gap-1 font-medium">
                <Sparkles size={12} />
                Pune Advisor
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#2E1E17]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-white">
              <ShieldCheck size={14} className="text-[#E3B84F]" />
              <span>Verified Due Diligence</span>
            </div>
          </div>

          {/* Big Center Play Button (shown when paused) */}
          {!isPlaying && (
            <button
              className="bigplay"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label="Play video introduction"
            >
              <svg width="38" height="38" style={{ position: 'static' }}>
                <use href="#pl" />
              </svg>
            </button>
          )}

          {/* Live Subtitle Banner (shown while playing) */}
          {isPlaying && (
            <div className="absolute bottom-16 left-4 right-4 z-20 pointer-events-none animate-fade-in">
              <div className="bg-[#2E1E17]/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 shadow-lg max-w-lg mx-auto text-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E3B84F] block mb-0.5">
                  {activeCaption.heading}
                </span>
                <p className="text-xs md:text-sm font-medium text-[#FFF8F0] leading-snug">
                  "{activeCaption.text}"
                </p>
              </div>
            </div>
          )}

          {/* In-Place Bottom Control Bar */}
          <div
            className="vc"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white mr-1"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            {/* Mute / Unmute Voice */}
            <button
              onClick={toggleMute}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white mr-2"
              aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
              title={isMuted ? 'Unmute voice' : 'Mute voice'}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            {/* Progress / Seek bar */}
            <i
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                handleSeek(pos * totalDuration);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="h-full bg-[#E3B84F] rounded-full transition-all duration-200"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </i>

            {/* Time Indicator */}
            <span className="text-xs font-mono ml-2">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>

            {/* Restart button */}
            <button
              onClick={() => handleSeek(0)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white ml-1"
              aria-label="Restart"
              title="Restart"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>

        {/* Copy and CTAs */}
        <div className="copy">
          <div className="eb rise" style={{ '--d': '.1s' }}>
            AVM Homes · Property Advisory Partner · Pune
          </div>

          <h1 className="rise" style={{ '--d': '.2s' }}>
            Property, <span className="gt">Better Understood.</span>
          </h1>

          <p className="lead rise" style={{ '--d': '.3s' }}>
            We don't just show you properties. We help you understand them. Honest advice for
            buyers, local sales expertise for builders.
          </p>

          <div className="acts rise" style={{ '--d': '.4s' }}>
            <button
              className="btn"
              onClick={() => openContactModal({ source: 'Hero Consultation Button' })}
            >
              Book a consultation
            </button>
            <a className="btn line" href="#about">
              Meet AVM
            </a>
          </div>

          <ul className="chips rise" style={{ '--d': '.5s' }}>
            <li>
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              Honest pros and cons, every time
            </li>
            <li>
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              RERA, agreements and costs explained
            </li>
            <li>
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              Support from first call to possession
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
