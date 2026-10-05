/**
 * Enquiry submission service.
 *
 * Sends lead data to a Google Apps Script web app endpoint when configured,
 * and maintains a local offline copy in localStorage so enquiries are never lost.
 */

import { generateLeadId, formatTimestamp } from '../utils/helpers';

const APPS_SCRIPT_URL =
  import.meta.env.VITE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyL6xUEn9bC7QWnJ7glf8HOt7dbWiZJ8F8ahVdHUjI0McbRNt8zUIdEjPj7q4mv3kkF/exec';
const LOCAL_STORAGE_KEY = 'avm_enquiries';

/**
 * Retrieve all locally recorded enquiries.
 */
export function getStoredEnquiries() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save an enquiry to local storage.
 */
function saveEnquiryLocally(record) {
  try {
    const list = getStoredEnquiries();
    list.unshift(record); // newest first
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to store enquiry locally:', err);
  }
}

/**
 * Submit an enquiry.
 *
 * @param {Object} formData - The form data to submit
 * @param {Object} meta - Additional metadata (sourcePage, projectId, projectName)
 * @returns {Promise<{success: boolean, message: string, leadId?: string}>}
 */
export async function submitEnquiry(formData, meta = {}) {
  const leadId = generateLeadId();
  const timestamp = formatTimestamp();

  const projectId = meta.projectId || formData.projectId || 'general';
  const projectName = meta.projectName || formData.projectName || 'General Enquiry';

  const payload = {
    leadId,
    timestamp,
    fullName: formData.fullName?.trim() || '',
    phone: formData.phone?.trim() || '',
    email: formData.email?.trim() || 'Not Provided',
    city: formData.city?.trim() || 'Pune',
    preferredLocation: formData.preferredLocation || 'Any Location',
    propertyType: formData.propertyType || 'Any Type',
    configuration: formData.configuration || 'Any Configuration',
    budgetRange: formData.budgetRange || 'Any Budget',
    projectId,
    projectName,
    sourcePage: meta.sourcePage || window.location.pathname,
    leadSource: 'Website',
    message: formData.message?.trim().slice(0, 2000) || 'No specific message',
    status: 'New Lead',
    _hp: formData._hp || '',
  };

  // Client-side validation
  if (!payload.fullName) {
    return { success: false, message: 'Please enter your full name.' };
  }
  if (!payload.phone) {
    return { success: false, message: 'Please enter your phone number.' };
  }

  // Always store locally so no enquiry is ever lost
  saveEnquiryLocally(payload);

  // If Google Apps Script URL is configured, send it to Google Sheets
  if (APPS_SCRIPT_URL && !APPS_SCRIPT_URL.includes('YOUR_DEPLOYMENT_ID')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      let result;
      const text = await response.text();
      try {
        result = JSON.parse(text);
      } catch {
        if (response.ok) {
          result = { success: true, message: 'Your enquiry has been submitted.' };
        } else {
          throw new Error(`Server returned status ${response.status}`);
        }
      }

      return {
        success: true,
        message:
          result.message ||
          'Thank you for your enquiry. Your details have been submitted successfully.',
        leadId: result.leadId || leadId,
      };
    } catch (error) {
      console.warn('Google Sheets sync warning (saved locally):', error.message);
      return {
        success: true,
        message:
          'Thank you for your enquiry. Your details have been submitted successfully.',
        leadId,
      };
    }
  }

  // If no Google Apps Script URL is configured, gracefully save locally and return success
  await new Promise((r) => setTimeout(r, 400));
  return {
    success: true,
    message:
      'Thank you for your enquiry. Your details have been submitted successfully.',
    leadId,
  };
}

/**
 * Export all recorded enquiries as a CSV file (openable directly in Excel / Google Sheets).
 */
export function exportEnquiriesToCsv() {
  const list = getStoredEnquiries();
  if (list.length === 0) {
    alert('No enquiries recorded yet.');
    return;
  }

  const headers = [
    'Timestamp',
    'Lead ID',
    'Full Name',
    'Phone',
    'Email',
    'Preferred Location',
    'Property Type',
    'Configuration',
    'Budget Range',
    'Project Name',
    'Source Page',
    'Message',
    'Status',
  ];

  const rows = list.map((item) => [
    `"${item.timestamp || ''}"`,
    `"${item.leadId || ''}"`,
    `"${(item.fullName || '').replace(/"/g, '""')}"`,
    `"${(item.phone || '').replace(/"/g, '""')}"`,
    `"${(item.email || '').replace(/"/g, '""')}"`,
    `"${(item.preferredLocation || '').replace(/"/g, '""')}"`,
    `"${(item.propertyType || '').replace(/"/g, '""')}"`,
    `"${(item.configuration || '').replace(/"/g, '""')}"`,
    `"${(item.budgetRange || '').replace(/"/g, '""')}"`,
    `"${(item.projectName || '').replace(/"/g, '""')}"`,
    `"${(item.sourcePage || '').replace(/"/g, '""')}"`,
    `"${(item.message || '').replace(/"/g, '""')}"`,
    `"${item.status || 'New Lead'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AVM_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
