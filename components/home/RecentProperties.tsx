import { Suspense } from "react";
import PropertyCard from "../properties/PropertyCard";
import { getRecentProperties } from "@/server-action/getRecentProperties";
import CardSkeleton from "../skeleton/CardSkeleton";

export default async function RecentProperties() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* header */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Featured Listings
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl">
            Fresh Luxury Listings
          </h2>

          <p className="mt-5 text-md leading-relaxed text-text/60">
            Discover newly listed homes, luxury apartments, villas, and
            investment properties curated by trusted owners and expert agents.
          </p>
        </div>

        {/* properties grid */}
        <Suspense fallback={<CardSkeleton />}>
          <RecentPropertiesContent />
        </Suspense>
      </div>
    </section>
  );
}

async function RecentPropertiesContent() {
  const properties = await getRecentProperties();
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
