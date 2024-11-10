export default function Loading() {
  return (
    <div className="container section-padding">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <div className="h-10 w-48 bg-muted animate-pulse rounded mx-auto mb-4" />
        <div className="h-6 w-full bg-muted animate-pulse rounded" />
      </div>

      <div className="space-y-16">
        {[1, 2, 3, 4].map((section) => (
          <section key={section} className="scroll-mt-20">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-8" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((card) => (
                <div key={card} className="glass-card h-[200px] p-6">
                  <div className="h-8 w-8 bg-muted animate-pulse rounded mb-4" />
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}