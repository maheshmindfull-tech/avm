/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2E1E17',
          secondary: '#7A5F52',
          muted: '#9E887E',
        },
        paper: '#FFFFFF',
        card: '#FFFFFF',
        tint: '#FBF4EC',
        brick: {
          DEFAULT: '#B4533A',
          dark: '#8E3F26',
          hover: '#A04630',
          light: '#FBF4EC',
        },
        mute: '#7A5F52',
        line: 'rgba(110, 60, 35, 0.16)',
        hdr: 'rgba(255, 255, 255, 0.94)',
        navy: '#3A2118',
        on: '#FFF8F0',
        onm: '#DCC7B8',
        warm: '#E3B84F',
        primary: {
          DEFAULT: '#B4533A',
          hover: '#8E3F26',
          active: '#7A321D',
          light: '#FBF4EC',
          border: 'rgba(110, 60, 35, 0.16)',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Bricolage Grotesque"', '"DM Sans"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'h1': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'h3': ['clamp(1.125rem, 1.8vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'lead': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        'section': 'clamp(3.5rem, 6vw, 5.5rem)',
        'section-lg': 'clamp(4.5rem, 8vw, 6.5rem)',
      },
      maxWidth: {
        'content': '1200px',
        'narrow': '720px',
        'wide': '1400px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'image': '14px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(15, 23, 42, 0.05)',
        'card': '0 1px 3px rgba(15, 23, 42, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
        'nav': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'modal': '0 20px 40px -15px rgba(15, 23, 42, 0.15)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
