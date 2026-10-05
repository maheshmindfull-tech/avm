import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs focus-visible:outline-blue-600 font-medium',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 active:bg-slate-100 shadow-xs font-medium',
  'blue-subtle':
    'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 active:bg-blue-200 font-medium',
  outline:
    'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100 font-medium',
  gold:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs font-medium',
  ghost:
    'text-slate-700 hover:bg-slate-100 hover:text-blue-600 active:bg-slate-200 font-medium',
  'ghost-white':
    'text-white border border-white/60 hover:bg-white/15 active:bg-white/25 font-medium',
  'primary-white':
    'bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 shadow-sm font-semibold',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs font-medium',
  md: 'px-5 py-2.5 text-sm font-medium',
  lg: 'px-7 py-3 text-base font-medium',
};

/**
 * Reusable button component with standard blue & light-theme styling.
 * Renders as <button>, <a>, or React Router <Link> depending on props.
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    href,
    to,
    className,
    children,
    disabled,
    loading,
    ...props
  },
  ref
) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-button',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variants[variant] || variants.primary,
    sizes[size],
    loading && 'cursor-wait',
    className
  );

  const content = loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {children}
    </>
  ) : (
    children
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} className={baseClasses} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
});

export default Button;
