export default function PropertyPageSkeleton() {
  return (
    <section className="bg-background py-15 animate-pulse">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="flex-1">
            <div className="h-4 w-28 rounded-full bg-black-5" />
            <div className="mt-4 h-12 w-full max-w-xl rounded-2xl bg-black/5" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-28 rounded-full bg-black/5"
                />
              ))}
            </div>
          </div>

          {/* price */}
          <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm">
            <div className="h-4 w-24 rounded bg-black/5" />
            <div className="mt-3 h-10 w-40 rounded bg-black/5" />
          </div>
        </div>

        {/* Image */}
        <div className="relative my-6 h-60 w-full rounded-2xl bg-black/5 md:h-100 lg:h-120" />

        {/* Bottom */}
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {/* description */}
          <div className="lg:col-span-2">
            <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
              <div className="h-10 w-64 rounded bg-black/5" />

              <div className="mt-8 space-y-4">
                <div className="h-4 w-full rounded bg-black/5" />
                <div className="h-4 w-full rounded bg-black/5" />
                <div className="h-4 w-full rounded bg-black/5" />
                <div className="h-4 w-5/6 rounded bg-black/5" />
                <div className="h-4 w-3/4 rounded bg-black/5" />
              </div>
            </div>
          </div>
          {/* Agent Card */}
          <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
            <div className="flex items gap-4">
              <div className="h-16 w-16 rounded-full bg-black/5" />

              <div className="flex-1">
                <div className="h-5 w-32 rounded bg-black/5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-12 rounded-2xl bg-black/5" />
              <div className="h-12 rounded-2xl bg-black/5" />
              <div className="h-12 rounded-2xl bg-black/5" />
              <div className="h-12 rounded-2xl bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
