import { cn } from '../../utils/helpers';

/**
 * Reusable section heading with eyebrow label, heading, and optional description.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className,
}) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-block text-xs font-semibold uppercase tracking-wider mb-2.5',
            dark ? 'text-blue-300' : 'text-blue-600'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-h1 font-bold tracking-tight',
          dark ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3.5 text-base md:text-lead text-slate-600 leading-relaxed max-w-2xl',
            dark ? 'text-white/80' : 'text-slate-600',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
