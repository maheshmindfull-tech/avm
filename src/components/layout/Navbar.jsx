import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

export default function Navbar() {
  const location = useLocation();
  const { openContactModal } = useModal();
  const isHome = location.pathname === '/';

  const getHref = (hash) => {
    return isHome ? hash : `/${hash}`;
  };

  const handleHomeClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    openContactModal({ source: 'Navbar Contact Us Button' });
  };

  return (
    <header className="site-header">
      <div className="wrap">
        {/* Official Brand Logo */}
        <Link className="flex items-center gap-2 group py-1" to="/" aria-label="AVM Homes, home">
          <img
            src="/logo.png"
            alt="AVM Homes: Your Trust. Our Commitment."
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Navigation Items */}
        <nav className="site-nav" aria-label="Main">
          {/* Home Tab - Standard navigation only */}
          <a
            href="/"
            onClick={handleHomeClick}
            className="cursor-pointer font-medium hover:text-brick transition-colors"
          >
            Home
          </a>

          <a href={getHref('#about')} className="hover:text-brick transition-colors">
            About
          </a>

          <a href={getHref('#projects')} className="hide hover:text-brick transition-colors">
            Projects
          </a>

          <a href={getHref('#gallery')} className="hide hover:text-brick transition-colors">
            Gallery
          </a>

          {/* Contact Us Button - opens the small form modal */}
          <button
            onClick={handleContactClick}
            className="btn"
            aria-label="Open contact consultation form"
          >
            Contact us
          </button>
        </nav>
      </div>
    </header>
  );
}
