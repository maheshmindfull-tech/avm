import Hero from '../components/sections/Hero';
import AboutPreview from '../components/sections/AboutPreview';
import HowItWorks from '../components/sections/HowItWorks';
import WhyChooseAVM from '../components/sections/WhyChooseAVM';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Gallery from '../components/sections/Gallery';
import ContactCTA from '../components/sections/ContactCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <HowItWorks />
      <FeaturedProjects />
      <WhyChooseAVM />
      <Gallery />
      <ContactCTA />
    </main>
  );
}
