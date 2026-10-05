import { useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import useEnquiryForm from '../../hooks/useEnquiryForm';
import { getFilterOptions, getAllProjects } from '../../services/projectService';

/**
 * Reusable enquiry form component.
 *
 * @param {Object} props
 * @param {string} props.projectId - Pre-selected project ID (e.g., from a project detail page)
 * @param {string} props.projectName - Pre-selected project name
 * @param {string} props.sourcePage - Identifier for the source page
 * @param {boolean} props.showProjectSelect - Whether to show the project dropdown
 * @param {boolean} props.compact - Whether to use a compact layout
 * @param {string} props.className - Additional CSS classes
 */
export default function EnquiryForm({
  projectId = '',
  projectName = '',
  sourcePage = '',
  showProjectSelect = true,
  compact = false,
  className = '',
}) {
  const {
    formData,
    errors,
    status,
    resultMessage,
    updateField,
    handleSubmit,
    resetForm,
    isSubmitting,
    isSuccess,
    isError,
  } = useEnquiryForm({ projectId, projectName, sourcePage });

  const options = getFilterOptions();
  const projects = getAllProjects();
  const formRef = useRef(null);
  const successRef = useRef(null);

  // Focus the success message when it appears
  useEffect(() => {
    if (isSuccess && successRef.current) {
      successRef.current.focus();
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div
        ref={successRef}
        className={`rounded-card bg-blue-50 border border-blue-200 p-6 md:p-8 text-center ${className}`}
        role="status"
        tabIndex={-1}
      >
        <CheckCircle size={40} className="text-blue-600 mx-auto mb-4" />
        <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
          Enquiry Received
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
          {resultMessage ||
            'Thank you for reaching out. Your enquiry has been received and our team will get in touch with you shortly.'}
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const inputClasses =
    'w-full px-4 py-2.5 rounded-button border border-slate-300 bg-white text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-colors form-input shadow-xs';
  const selectClasses =
    'w-full px-4 py-2.5 rounded-button border border-slate-300 bg-white text-sm text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-colors form-select shadow-xs';
  const labelClasses = 'block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5';
  const errorClasses = 'text-xs text-red-600 mt-1';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {/* Honeypot — hidden from real users */}
      <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this blank
          <input
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData._hp}
            onChange={(e) => updateField('_hp', e.target.value)}
          />
        </label>
      </div>

      {/* Name & Phone */}
      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor="eq-name" className={labelClasses}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="eq-name"
            type="text"
            className={`${inputClasses} ${errors.fullName ? 'border-red-400' : ''}`}
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            autoComplete="name"
            required
          />
          {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="eq-phone" className={labelClasses}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="eq-phone"
            type="tel"
            className={`${inputClasses} ${errors.phone ? 'border-red-400' : ''}`}
            placeholder="+91 00000 00000"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            autoComplete="tel"
            required
          />
          {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="eq-email" className={labelClasses}>Email</label>
        <input
          id="eq-email"
          type="email"
          className={`${inputClasses} ${errors.email ? 'border-red-400' : ''}`}
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          autoComplete="email"
        />
        {errors.email && <p className={errorClasses}>{errors.email}</p>}
      </div>

      {/* Project selection (only if no project pre-selected) */}
      {showProjectSelect && !projectId && (
        <div>
          <label htmlFor="eq-project" className={labelClasses}>Interested In</label>
          <select
            id="eq-project"
            className={selectClasses}
            value={formData.projectId || ''}
            onChange={(e) => {
              const selected = projects.find((p) => p.id === e.target.value);
              updateField('projectId', e.target.value);
              updateField('projectName', selected ? selected.name : '');
            }}
          >
            <option value="">Select a project (optional)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.location}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Pre-selected project banner */}
      {projectName && (
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-button text-xs text-blue-900 flex items-center justify-between">
          <span>Enquiring about: <strong>{projectName}</strong></span>
          <span className="text-blue-600 font-medium">Selected</span>
        </div>
      )}

      {/* Preference selects */}
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="eq-location" className={labelClasses}>Preferred Location</label>
            <select
              id="eq-location"
              className={selectClasses}
              value={formData.preferredLocation}
              onChange={(e) => updateField('preferredLocation', e.target.value)}
            >
              <option value="">Any Location</option>
              {options.locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eq-type" className={labelClasses}>Property Type</label>
            <select
              id="eq-type"
              className={selectClasses}
              value={formData.propertyType}
              onChange={(e) => updateField('propertyType', e.target.value)}
            >
              <option value="">Any Type</option>
              {options.propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eq-config" className={labelClasses}>Configuration</label>
            <select
              id="eq-config"
              className={selectClasses}
              value={formData.configuration}
              onChange={(e) => updateField('configuration', e.target.value)}
            >
              <option value="">Any Configuration</option>
              {options.configurations.map((cfg) => (
                <option key={cfg} value={cfg}>{cfg}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eq-budget" className={labelClasses}>Budget Range</label>
            <select
              id="eq-budget"
              className={selectClasses}
              value={formData.budgetRange}
              onChange={(e) => updateField('budgetRange', e.target.value)}
            >
              <option value="">Any Budget</option>
              {options.budgetRanges.map((b) => (
                <option key={b.label} value={b.label}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="eq-message" className={labelClasses}>Message or Questions</label>
        <textarea
          id="eq-message"
          rows={compact ? 2 : 3}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us what you're looking for or ask a question…"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          maxLength={2000}
        />
        {errors.message && <p className={errorClasses}>{errors.message}</p>}
      </div>


      {/* Error message */}
      {isError && (
        <div className="flex items-start gap-2 p-3 rounded-button bg-red-50 border border-red-200" role="alert">
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{resultMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
      </Button>
    </form>
  );
}
