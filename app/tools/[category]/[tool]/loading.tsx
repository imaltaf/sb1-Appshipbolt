export default function Loading() {
  return (
    <div className="container section-padding">
      <div className="h-10 w-32 bg-muted animate-pulse rounded mb-8" />
      <div className="glass-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-8 w-8 bg-muted animate-pulse rounded" />
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-4" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}