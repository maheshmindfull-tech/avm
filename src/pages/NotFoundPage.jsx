import { Home } from 'lucide-react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-white">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <span className="font-heading text-8xl font-bold text-blue-600/15 block select-none">
            404
          </span>
          <h1 className="font-heading text-3xl font-bold text-slate-900 mt-2 mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="primary">
              <Home size={16} className="mr-2" />
              Return Home
            </Button>
            <Button to="/projects" variant="secondary">
              Browse Projects
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
