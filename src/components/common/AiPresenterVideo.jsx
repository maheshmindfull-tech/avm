import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

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

export default function AiPresenterVideo({ autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCaption, setActiveCaption] = useState(SCRIPT_SECTIONS[0]);
  const totalDuration = 90; // 1:30

  const intervalRef = useRef(null);

  // Handle playback timer
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

  // Web Speech API narration
  const speakCurrentCaption = (text) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    // pick an English Indian voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en'));
    if (enVoice) utterance.voice = enVoice;
    window.speechSynthesis.speak(utterance);
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
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#2E1E17] text-white shadow-2xl border border-[rgba(255,255,255,0.15)] flex flex-col">
      {/* Video Screen Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#1F140F]">
        <img
          src="/ai-presenter.jpg"
          alt="AVM Homes AI Property Presenter"
          className={`w-full h-full object-cover transition-transform duration-1000 ${
            isPlaying ? 'scale-105 filter brightness-105' : 'scale-100'
          }`}
        />

        {/* Cinematic dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E17] via-black/20 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 bg-[#2E1E17]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`} />
            <span>{isPlaying ? 'AI Presenter Live' : 'AI Video Advisory'}</span>
            <span className="text-white/40">•</span>
            <span className="text-[#E3B84F] flex items-center gap-1">
              <Sparkles size={12} />
              4K Broadcast
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#2E1E17]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs">
            <ShieldCheck size={14} className="text-[#E3B84F]" />
            <span className="text-white/90">Fiduciary Advisory</span>
          </div>
        </div>

        {/* Big Center Play Overlay (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-[2px]">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-[#B4533A] hover:bg-[#8E3F26] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
              aria-label="Play video introduction"
            >
              <Play size={36} fill="currentColor" className="ml-1 transition-transform group-hover:scale-110" />
            </button>
          </div>
        )}

        {/* Floating Live Subtitles Banner */}
        <div className="absolute bottom-16 left-4 right-4 z-20">
          <div className="bg-[#2E1E17]/90 backdrop-blur-md border border-white/15 rounded-xl p-3.5 shadow-lg max-w-xl mx-auto text-center">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#E3B84F] block mb-1">
              {activeCaption.heading}
            </span>
            <p className="text-sm md:text-base font-medium text-[#FFF8F0] leading-snug">
              "{activeCaption.text}"
            </p>
          </div>
        </div>

        {/* Video Control Bar at bottom of screen */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-6 flex items-center gap-3 z-30">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Seek progress bar */}
          <div
            className="flex-1 h-2 bg-white/25 rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              handleSeek(pos * totalDuration);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#B4533A] to-[#E3B84F] transition-all duration-200"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>

          <span className="text-xs font-mono text-white/80 shrink-0">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>

          <button
            onClick={() => handleSeek(0)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Restart video"
            title="Restart"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Interactive Chapter Navigator */}
      <div className="bg-[#3A2118] p-4 border-t border-white/10">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#DCC7B8] mb-2.5 block">
          Key Chapters in this Presentation
        </span>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {SCRIPT_SECTIONS.map((sec, idx) => {
            const isActive = activeCaption.heading === sec.heading;
            return (
              <button
                key={idx}
                onClick={() => handleSeek(sec.time)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                  isActive
                    ? 'bg-[#B4533A] border-[#E3B84F] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-[#DCC7B8] hover:bg-white/10'
                }`}
              >
                <span className="font-mono text-[10px] block opacity-75">
                  0:{sec.time < 10 ? '0' : ''}{sec.time}
                </span>
                <span className="font-medium line-clamp-1 mt-0.5">{sec.heading}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
