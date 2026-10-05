import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../projects/ProjectCard';
import { getFeaturedProjects } from '../../services/projectService';

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="section-padding-lg bg-white" id="featured-projects">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Homes Taking Shape Across Pune"
            description="Explore residential projects currently available through AVM. Select a project for more details or to submit an enquiry."
            className="!mb-0"
          />
          <div className="flex-shrink-0">
            <Button to="/projects" variant="primary" size="md">
              View All Projects
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {featured.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
