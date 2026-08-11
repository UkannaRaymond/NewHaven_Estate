import { getUserProperties } from "@/server-action/getUserProperties";
import FrontendLayout from "@/components/layout/FrontendLayout";
import Navbar from "@/components/layout/navbar/Navbar";
import PropertyCard from "@/components/properties/PropertyCard";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { Suspense } from "react";

export default function PropertiesPage() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            Properties
          </h2>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <PropertiesContent />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}

async function PropertiesContent() {
  const properties = await getUserProperties();

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subTitle="You currently have no properties available. Check back later after creating new listings."
      />
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
