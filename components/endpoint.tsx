import { cn } from '@/lib/cn';

const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-fd-accent text-fd-accent-foreground',
  POST: 'bg-fd-primary text-fd-primary-foreground',
  PUT: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  DELETE: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

export function Endpoint({ method, path }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string }) {
  return (
    <div className="not-prose mb-4 flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-2 font-mono text-sm">
      <span className={cn('rounded-md px-2 py-0.5 text-xs font-bold tracking-wide', METHOD_STYLES[method])}>
        {method}
      </span>
      <span className="text-fd-muted-foreground">{path}</span>
    </div>
  );
}
