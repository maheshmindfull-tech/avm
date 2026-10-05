import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

export default function Footer() {
  const location = useLocation();
  const { openContactModal } = useModal();
  const isHome = location.pathname === '/';

  const getHref = (hash) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <Link to="/" className="inline-block mb-2">
            <img
              src="/logo.png"
              alt="AVM Homes: Your Trust. Our Commitment."
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
          <div className="text-xs text-mute mt-1">
            © 2026 AVM Homes · RERA registration details: MahaRERA Authorized Channel Partner Network
          </div>
        </div>
        <div>
          <a href={getHref('#about')}>About</a>
          <a href={getHref('#projects')}>Projects</a>
          <button
            onClick={() => openContactModal({ source: 'Footer Contact Link' })}
            className="hover:text-brick transition-colors cursor-pointer text-inherit font-inherit mr-[18px]"
          >
            Contact
          </button>
          <Link to="/contact">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
