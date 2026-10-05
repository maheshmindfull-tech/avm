import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when an element enters the viewport.
 * Returns a ref to attach to the target element.
 *
 * @param {Object} options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin string
 * @param {boolean} options.triggerOnce - Whether to unobserve after first trigger
 */
export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return ref;
}

export default useScrollAnimation;
