import { Link } from 'react-router-dom';
import Container from './Container';

const FOOTER_LINKS = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'Our Process', to: '/about#process' },
    { label: 'Projects', to: '/projects' },
    { label: 'About AVM', to: '/about' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="font-heading text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5"
              aria-label="AVM Real Estate — Home"
            >
              <span>AVM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block mb-1" />
            </Link>
            <p className="mt-4 text-sm text-slate-500 max-w-xs leading-relaxed">
              Connecting property buyers with relevant real estate projects through curated
              discovery and clear information.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Contact
            </h3>
            <div className="space-y-2.5 text-sm text-slate-600">
              <p>Pune, Maharashtra, India</p>
              <p>
                <a href="mailto:contact@avmrealestate.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                  contact@avmrealestate.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AVM Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
