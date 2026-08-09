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
      className="group relative h-125
        overflow-hidden rounded-4xl"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[40px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="inset-0 object-cover transition duration-700 group-hover:scale-110"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        {/* top badge */}
        <div
          className="absolute left-5 top-5 z-20 rounded-full
      bg-white/80 px-4 py-2 text-sm font-semibold text-primary"
        >
          {property.status === "rent" ? "For Rent" : "For Sale"}
        </div>

        {/* property details */}
        <div
          className="absolute bottom-5 left-5 right-5 z-20 rounded-[28px]
        border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {property.status === "rent" ? (
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  <span>${property.price.toLocaleString()}</span>
                  <span className="text-sm text-white/60">/month</span>
                </h3>
              ) : (
                <h3 className="text-3xl font-bold text-white">
                  <span>${property.price.toLocaleString()}</span>
                </h3>
              )}

              <p className="mt-1 text-sm text-white/60">{property.location}</p>
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              {property.type}
            </div>
          </div>
        </div>

        <h2 className=" mt-5 text-2xl font-bold text-white">
          {property.title}
        </h2>

        {/* features */}
        <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {property.bedrooms} Beds
          </div>

          <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {property.bathrooms} Bathrooms
          </div>

          <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {property.area} sqft
          </div>
        </div>
      </div>
    </Link>
  );
}
