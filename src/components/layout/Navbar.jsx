import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import Container from './Container';
import EnquiryModal from '../modals/EnquiryModal';
import { cn } from '../../utils/helpers';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const showSolidBg = scrolled || !isHome || mobileOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-200',
          showSolidBg
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
            : 'bg-transparent'
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-[72px]" aria-label="Main navigation">
            {/* Logo */}
            <Link
              to="/"
              className={cn(
                'font-heading text-2xl font-bold tracking-tight transition-colors flex items-center gap-1.5',
                showSolidBg ? 'text-slate-900' : 'text-white'
              )}
              aria-label="AVM Real Estate — Home"
            >
              <span>AVM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block mb-1" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1.5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'px-3.5 py-1.5 rounded-button text-sm font-medium transition-colors',
                      showSolidBg
                        ? isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                        : isActive
                          ? 'text-white bg-white/20'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="ml-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  className="h-10 px-5 text-sm font-semibold shadow-xs hover:shadow-sm"
                >
                  Enquire Now
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                'md:hidden p-2 rounded-button transition-colors',
                showSolidBg
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              )}
              onClick={toggleMobile}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </Container>

        {/* Mobile Navigation */}
        <div
          id="mobile-nav"
          className={cn(
            'md:hidden fixed inset-0 top-[72px] bg-white z-40 transition-all duration-200 border-b border-slate-200 shadow-lg',
            mobileOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          )}
          aria-hidden={!mobileOpen}
        >
          <div className="flex flex-col p-6 gap-2 bg-white">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 rounded-button text-base font-medium transition-colors',
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <Button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setIsModalOpen(true);
                }}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
