import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  CheckCircle2,
  ChevronRight,
  Share2,
  ArrowLeft,
  Sparkles,
  Info,
} from 'lucide-react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';
import EnquiryForm from '../components/forms/EnquiryForm';
import { getProjectBySlug, getAllProjects } from '../services/projectService';
import { cn } from '../utils/helpers';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = useMemo(() => getProjectBySlug(slug), [slug]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);

  const allProjects = getAllProjects();
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return allProjects
      .filter((p) => p.id !== project.id)
      .slice(0, 3);
  }, [project, allProjects]);

  if (!project) {
    return (
      <main className="pt-32 pb-24 bg-white">
        <Container>
          <div className="max-w-md mx-auto text-center py-16">
            <h1 className="font-heading text-3xl font-semibold text-slate-900 mb-4">
              Project Not Found
            </h1>
            <p className="text-slate-600 mb-8">
              The project you are looking for doesn't exist or may have been updated.
            </p>
            <Button to="/projects" variant="primary">
              <ArrowLeft size={16} className="mr-2" />
              Browse All Projects
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  const galleryImages = [
    project.images?.hero || project.images?.card,
    ...(project.images?.gallery || []),
  ].filter(Boolean);

  const statusColors = {
    'Ongoing': 'bg-blue-600 text-white',
    'Launching Soon': 'bg-amber-500 text-white',
    'Possession Soon': 'bg-emerald-600 text-white',
    'Ready to Move': 'bg-sky-600 text-white',
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${project.name} | AVM Real Estate`,
          url: window.location.href,
        });
      } catch {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="pt-24 md:pt-28 bg-white">
      {/* Breadcrumbs & Actions */}
      <section className="bg-slate-50 border-b border-slate-200 py-3.5">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm">
            <nav className="flex items-center gap-1.5 text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <Link to="/projects" className="hover:text-blue-600 transition-colors">
                Projects
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="font-medium text-slate-900 truncate max-w-[200px] md:max-w-xs">
                {project.name}
              </span>
            </nav>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors px-2.5 py-1 rounded-button hover:bg-slate-200/60 text-xs font-medium"
            >
              <Share2 size={14} />
              {copied ? 'Link Copied!' : 'Share Project'}
            </button>
          </div>
        </Container>
      </section>

      {/* Project Header */}
      <section className="py-8 bg-white border-b border-slate-100">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span
                  className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs',
                    statusColors[project.status] || 'bg-slate-800 text-white'
                  )}
                >
                  {project.status}
                </span>
                <span className="text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
                  {project.propertyType}
                </span>
                {project.demoData && (
                  <span className="text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Info size={12} />
                    Sample Preview Listing
                  </span>
                )}
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-2">
                {project.name}
              </h1>
              <p className="flex items-center gap-1.5 text-slate-600 text-base md:text-lg">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                {project.location}, {project.city}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-4 sm:gap-6 bg-slate-50 p-4 sm:p-5 rounded-card border border-slate-200 shadow-xs">
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Configurations
                </span>
                <span className="font-semibold text-slate-900 text-base">
                  {project.configurations.join(', ')}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Pricing
                </span>
                <span className="font-semibold text-blue-600 text-base">
                  {project.priceRange || 'Contact for pricing'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Media & Details Grid */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Gallery & Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Primary Image Preview */}
              <div className="relative aspect-[16/10] rounded-card overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                <img
                  src={galleryImages[selectedImage] || project.images?.card}
                  alt={`${project.name} preview`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        'relative w-20 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all',
                        selectedImage === idx
                          ? 'border-blue-600 ring-2 ring-blue-600/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Overview & Description */}
              <div className="bg-slate-50/60 p-6 md:p-8 rounded-card border border-slate-200">
                <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-4">
                  Project Overview
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights List */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                      <Sparkles size={16} className="text-blue-600" />
                      Key Highlights & Amenities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-slate-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-blue-600 mt-0.5 shrink-0"
                          />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>


            </div>

            {/* Right Column: Sticky Enquiry Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-white p-6 md:p-8 rounded-card border border-slate-200 shadow-card">
                <div className="mb-6">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Direct Assistance
                  </span>
                  <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-1">
                    Enquire About {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Schedule a private site visit, request pricing sheets, or consult with an AVM property advisor.
                  </p>
                </div>

                <EnquiryForm
                  projectId={project.id}
                  projectName={project.name}
                  sourcePage={`/projects/${project.slug}`}
                  showProjectSelect={false}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Similar Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-16">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Similar Developments
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-slate-900 mt-1">
                  You May Also Be Interested In
                </h2>
              </div>
              <Button to="/projects" variant="secondary" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
