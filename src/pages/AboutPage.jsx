import AboutSection from '../components/sections/AboutSection';
import CoreValues from '../components/sections/CoreValues';
import ProblemSolution from '../components/sections/ProblemSolution';
import ContactSection from '../components/sections/ContactSection';

export default function AboutPage() {
  return (
    <main className="bg-paper">
      {/* Primary About Presentation */}
      <AboutSection />

      {/* Core Values & Promises */}
      <CoreValues />

      {/* Problem & Solution Comparison */}
      <ProblemSolution />

      {/* Direct Contact & Consultation Booking */}
      <ContactSection />
    </main>
  );
}
