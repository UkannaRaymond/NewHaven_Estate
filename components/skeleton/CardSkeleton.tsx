export default function CardSkeleton() {
  return (
    <div className="my-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-105 animate-pulse rounded-3xl bg-black/5"
        />
      ))}
    </div>
  );
}
