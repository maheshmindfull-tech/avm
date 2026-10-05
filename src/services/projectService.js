/**
 * Project data service.
 *
 * Currently loads from a local data file.
 * Can be replaced with an API integration when a backend is available.
 */

import projects, { LOCATIONS, PROPERTY_TYPES, CONFIGURATIONS, BUDGET_RANGES } from '../data/projects';

/**
 * Get all projects.
 */
export function getAllProjects() {
  return projects;
}

/**
 * Get featured projects only.
 */
export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

/**
 * Get a single project by its slug.
 */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Filter projects based on criteria.
 */
export function filterProjects({ search = '', location = '', propertyType = '', configuration = '' } = {}) {
  let filtered = [...projects];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  if (location) {
    filtered = filtered.filter((p) => p.location === location);
  }

  if (propertyType) {
    filtered = filtered.filter((p) => p.propertyType === propertyType);
  }

  if (configuration) {
    filtered = filtered.filter((p) => p.configurations.includes(configuration));
  }

  return filtered;
}

/**
 * Get filter option lists.
 */
export function getFilterOptions() {
  return {
    locations: LOCATIONS,
    propertyTypes: Object.values(PROPERTY_TYPES),
    configurations: CONFIGURATIONS,
    budgetRanges: BUDGET_RANGES,
  };
}
