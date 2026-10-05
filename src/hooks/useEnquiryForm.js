import { useState, useCallback, useRef } from 'react';
import { submitEnquiry } from '../services/enquiryService';
import { isValidEmail, isValidPhone } from '../utils/helpers';

const INITIAL_FORM_STATE = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  preferredLocation: '',
  propertyType: '',
  configuration: '',
  budgetRange: '',
  message: '',
  consent: false,
  _hp: '', // honeypot
};

/**
 * Custom hook for managing enquiry form state, validation, and submission.
 *
 * @param {Object} options
 * @param {string} options.projectId - Pre-selected project ID
 * @param {string} options.projectName - Pre-selected project name
 * @param {string} options.sourcePage - Source page identifier
 */
export function useEnquiryForm({ projectId = '', projectName = '', sourcePage = '' } = {}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [resultMessage, setResultMessage] = useState('');
  const submittingRef = useRef(false);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user edits it
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.message && formData.message.length > 2000) {
      newErrors.message = 'Message must be under 2000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      // Prevent double submission
      if (submittingRef.current) return;

      // Honeypot check — bots will fill this hidden field
      if (formData._hp) {
        // Silently pretend it worked to avoid tipping off bots
        setStatus('success');
        setResultMessage('Thank you for your enquiry.');
        return;
      }

      if (!validate()) return;

      submittingRef.current = true;
      setStatus('submitting');
      setResultMessage('');

      try {
        const result = await submitEnquiry(formData, {
          projectId,
          projectName,
          sourcePage,
        });

        if (result.success) {
          setStatus('success');
          setResultMessage(result.message);
          setFormData(INITIAL_FORM_STATE);
        } else {
          setStatus('error');
          setResultMessage(result.message);
        }
      } catch {
        setStatus('error');
        setResultMessage(
          'We couldn\'t submit your enquiry right now. Your information is still available in the form. Please try again.'
        );
      } finally {
        submittingRef.current = false;
      }
    },
    [formData, validate, projectId, projectName, sourcePage]
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setStatus('idle');
    setResultMessage('');
  }, []);

  return {
    formData,
    errors,
    status,
    resultMessage,
    updateField,
    handleSubmit,
    resetForm,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

export default useEnquiryForm;
