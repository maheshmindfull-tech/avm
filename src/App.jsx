import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { ModalProvider } from './context/ModalContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased">
        {/* Global SVG Symbol definitions for architectural blueprint towers and play icon */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <pattern id="wn" width="34" height="44" patternUnits="userSpaceOnUse">
              <rect x="10" y="12" width="14" height="20" fill="#F5C98A" opacity=".85" />
            </pattern>
          </defs>
          <symbol id="tw" viewBox="0 0 400 260" preserveAspectRatio="xMidYMax slice">
            <rect x="20" y="120" width="90" height="140" fill="currentColor" opacity=".55" />
            <rect x="130" y="50" width="120" height="210" fill="currentColor" />
            <rect x="270" y="100" width="110" height="160" fill="currentColor" opacity=".85" />
            <rect x="130" y="50" width="120" height="210" fill="url(#wn)" />
            <rect x="270" y="100" width="110" height="160" fill="url(#wn)" opacity=".8" />
            <rect y="250" width="400" height="10" fill="#000" opacity=".25" />
          </symbol>
          <symbol id="pl" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </symbol>
        </svg>

        <ScrollToTop />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ModalProvider>
  );
}
