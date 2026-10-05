import ProjectsSection from '../components/sections/ProjectsSection';
import ProblemSolution from '../components/sections/ProblemSolution';
import ContactSection from '../components/sections/ContactSection';

export default function ProjectsPage() {
  return (
    <main className="bg-paper">
      {/* Featured Projects from reference design */}
      <ProjectsSection />

      {/* Why Consult With AVM Before Booking */}
      <ProblemSolution />

      {/* Booking and Consultation Desk */}
      <ContactSection />
    </main>
  );
}
