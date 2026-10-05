import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <span className="text-red-500 text-2xl font-bold">!</span>
      </div>
      <p className="text-slate-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm">{message}</p>
    </div>
  );
}
