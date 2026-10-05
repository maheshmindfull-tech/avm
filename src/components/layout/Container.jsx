import { cn } from '../../utils/helpers';

/**
 * Container component with consistent max-width and horizontal padding.
 */
export default function Container({ children, className, as: Component = 'div' }) {
  return (
    <Component className={cn('w-full max-w-content mx-auto px-5 md:px-8', className)}>
      {children}
    </Component>
  );
}
