import { useState, useMemo } from 'react';
import Container from '../components/layout/Container';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';
import ContactCTA from '../components/sections/ContactCTA';
import { filterProjects, getAllProjects } from '../services/projectService';

export default function ProjectsPage() {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    propertyType: '',
    configuration: '',
  });

  const allProjects = getAllProjects();

  const filteredProjects = useMemo(() => {
    return filterProjects(filters);
  }, [filters]);

  return (
    <main className="pt-24 md:pt-28">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="Curated Portfolio"
            title="Explore Verified Real Estate Projects"
            description="Browse premium residential developments handpicked by AVM through trusted developer and channel partner networks."
          />
        </Container>
      </section>

      {/* Projects Section */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          {/* Filter Bar */}
          <ProjectFilters filters={filters} onFilterChange={setFilters} />

          {/* Result Count */}
          <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
            <p>
              Showing{' '}
              <span className="font-semibold text-slate-900">
                {filteredProjects.length}
              </span>{' '}
              of {allProjects.length} projects
            </p>
          </div>

          {/* Grid */}
          <ProjectGrid projects={filteredProjects} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </main>
  );
}
