import { getProperties } from "@/server-action/getProperties";
import { Property } from "@/types/property";
import EmptyState from "../ui/EmptyState";
import PropertyCard from "../properties/PropertyCard";

interface MarketPlaceProps {
  searchParams: {
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function MarketPlace({ searchParams }: MarketPlaceProps) {
  const properties: Property[] = await getProperties({
    search: searchParams.search,
    address: searchParams.address,
    location: searchParams.location,
    propertyType: searchParams.propertyType,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Matching Properties"
        subTitle="Try adjusting your search criteria or clearing some filters to see more results."
        filter
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
