import { Link } from 'react-router-dom';
import { MapPin, Home, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * A single project listing card.
 * Displays image, status badge, key details, and links to the project detail page.
 */
export default function ProjectCard({ project, className }) {
  const statusColors = {
    'Ongoing': 'bg-blue-600 text-white',
    'Launching Soon': 'bg-amber-500 text-white',
    'Possession Soon': 'bg-emerald-600 text-white',
    'Ready to Move': 'bg-sky-600 text-white',
  };

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group block bg-white rounded-card border border-slate-200 overflow-hidden shadow-xs',
        'hover:shadow-card-hover hover:border-blue-300 hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={project.images?.card}
          alt={`${project.name} — ${project.location}, ${project.city}`}
          className="image-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Status badge */}
        {project.status && (
          <span
            className={cn(
              'absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs',
              statusColors[project.status] || 'bg-slate-800 text-white'
            )}
          >
            {project.status}
          </span>
        )}
        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200">
            <ArrowUpRight size={18} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-slate-400" />
            {project.location}, {project.city}
          </span>
          <span className="flex items-center gap-1">
            <Home size={13} className="text-slate-400" />
            {project.propertyType}
          </span>
        </div>

        <h3 className="font-heading text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>

        {project.configurations?.length > 0 && (
          <p className="mt-1 text-sm text-slate-500">
            {project.configurations.join(' · ')}
          </p>
        )}

        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-600">
            {project.priceRange}
          </span>
          <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1">
            View Details
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
