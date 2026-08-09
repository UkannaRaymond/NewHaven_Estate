"use client";

import FrontendLayout from "@/components/layout/FrontendLayout";
import Navbar from "@/components/layout/navbar/Navbar";
import FilterButton from "@/components/marketplace/FilterButton";
import PropertyCard from "@/components/properties/PropertyCard";
import { dummyProperties } from "@/constants/dummyProperties";

export default function MarketPlace() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>

          <FilterButton />
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
          {dummyProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
