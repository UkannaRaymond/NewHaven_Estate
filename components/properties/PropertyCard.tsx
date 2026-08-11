import { Property } from "@/types/property";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="group relative block h-125 overflow-hidden rounded-[40px]"
    >
      {/* Image */}
      <div className="relative h-full w-full overflow-hidden rounded-[40px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      {/* Top badge */}
      <div className="absolute left-5 top-5 z-20 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary">
        {property.listingType === "rent" ? "For Rent" : "For Sale"}
      </div>

      {/* Small glassmorphism details card */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="relative w-[320px] rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
          {/* Property type badge */}
          <div className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
            {property.propertyType}
          </div>

          <div className="pr-16">
            {property.listingType === "rent" ? (
              <h3 className="flex items-center gap-1 text-2xl font-bold text-white">
                <span>${property.price.toLocaleString()}</span>
                <span className="text-xs text-white/70">/month</span>
              </h3>
            ) : (
              <h3 className="text-2xl font-bold text-white">
                ${property.price.toLocaleString()}
              </h3>
            )}

            <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
              <p className="shrink-0">{property.location}</p>
              <span className="shrink-0">•</span>
              <p className="min-w-0 truncate">{property.address}</p>
            </div>
          </div>

          <h2 className="mt-3 text-lg font-bold leading-tight text-white">
            {property.title}
          </h2>

          {/* Features */}
          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
            <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {property.bedrooms} Beds
            </div>

            <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {property.bathrooms} Baths
            </div>

            <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {property.area} sqft
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
