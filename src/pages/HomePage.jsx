import Hero from '../components/sections/Hero';
import CoreValues from '../components/sections/CoreValues';
import AboutSection from '../components/sections/AboutSection';
import ProblemSolution from '../components/sections/ProblemSolution';
import ProjectsSection from '../components/sections/ProjectsSection';
import PhotoGallery from '../components/sections/PhotoGallery';
import ClientStories from '../components/sections/ClientStories';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <CoreValues />
      <AboutSection />
      <ProblemSolution />
      <ProjectsSection />
      <PhotoGallery />
      <ClientStories />
      <ContactSection />
    </main>
  );
}
