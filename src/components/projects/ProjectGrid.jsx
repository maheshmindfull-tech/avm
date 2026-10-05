import ProjectCard from './ProjectCard';
import { EmptyState } from '../ui/StateDisplays';
import { Search } from 'lucide-react';

/**
 * Responsive grid of project cards with empty state.
 */
export default function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        title="No projects match your criteria"
        message="Try adjusting your search or filters to see more results."
        icon={<Search size={40} strokeWidth={1.5} />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
