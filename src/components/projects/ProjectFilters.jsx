import { Search, X } from 'lucide-react';
import { getFilterOptions } from '../../services/projectService';

/**
 * Project filter controls — search, location, property type, configuration.
 */
export default function ProjectFilters({ filters, onFilterChange }) {
  const options = getFilterOptions();

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onFilterChange({ search: '', location: '', propertyType: '', configuration: '' });
  };

  const hasActiveFilters = filters.search || filters.location || filters.propertyType || filters.configuration;

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by project name or location…"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-button border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-colors form-input shadow-xs"
          />
        </div>

        {/* Location */}
        <select
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="px-4 py-2.5 rounded-button border border-slate-300 bg-white text-sm text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-colors form-select shadow-xs"
          aria-label="Filter by location"
        >
          <option value="">All Locations</option>
          {options.locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        {/* Property Type */}
        <select
          value={filters.propertyType}
          onChange={(e) => handleChange('propertyType', e.target.value)}
          className="px-4 py-2.5 rounded-button border border-slate-300 bg-white text-sm text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-colors form-select shadow-xs"
          aria-label="Filter by property type"
        >
          <option value="">All Types</option>
          {options.propertyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Configuration */}
        <select
          value={filters.configuration}
          onChange={(e) => handleChange('configuration', e.target.value)}
          className="px-4 py-2.5 rounded-button border border-slate-300 bg-white text-sm text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-colors form-select shadow-xs"
          aria-label="Filter by configuration"
        >
          <option value="">All Configurations</option>
          {options.configurations.map((cfg) => (
            <option key={cfg} value={cfg}>{cfg}</option>
          ))}
        </select>
      </div>

      {/* Active filter tags & clear button */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Active filters:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              "{filters.search}"
              <button onClick={() => handleChange('search', '')} aria-label="Remove search filter">
                <X size={12} />
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {filters.location}
              <button onClick={() => handleChange('location', '')} aria-label="Remove location filter">
                <X size={12} />
              </button>
            </span>
          )}
          {filters.propertyType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {filters.propertyType}
              <button onClick={() => handleChange('propertyType', '')} aria-label="Remove property type filter">
                <X size={12} />
              </button>
            </span>
          )}
          {filters.configuration && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {filters.configuration}
              <button onClick={() => handleChange('configuration', '')} aria-label="Remove configuration filter">
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
