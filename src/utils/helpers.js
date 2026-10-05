/**
 * Utility functions for the AVM application.
 */

/**
 * Generate a unique lead ID with timestamp component.
 * Format: AVM-YYYYMMDD-XXXXX (random alphanumeric suffix)
 */
export function generateLeadId() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AVM-${datePart}-${randomPart}`;
}

/**
 * Format a Date object into a human-readable UTC string for the spreadsheet.
 */
export function formatTimestamp(date = new Date()) {
  return date.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

/**
 * Normalise a phone number string: remove spaces, dashes, and parentheses.
 */
export function normalisePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[\s\-()]/g, '').trim();
}

/**
 * Basic email format validation.
 */
export function isValidEmail(email) {
  if (!email) return true; // email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Basic phone number validation (Indian or general).
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = normalisePhone(phone);
  // Accept 10-digit Indian numbers, optionally with +91 prefix
  return /^(\+91)?[6-9]\d{9}$/.test(cleaned) || /^\+?\d{7,15}$/.test(cleaned);
}

/**
 * Truncate text to a maximum length, appending an ellipsis if truncated.
 */
export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/**
 * Create a URL-friendly slug from a project name.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Scroll to a section by ID, with offset for the fixed navbar.
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Class name merge utility (simple version).
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
