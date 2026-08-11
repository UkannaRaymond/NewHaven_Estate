import FrontendLayout from "@/components/layout/FrontendLayout";
import Navbar from "@/components/layout/navbar/Navbar";
import EmailForm from "@/components/properties/EmailForm";
import PropertyPageSkeleton from "@/components/skeleton/PropertyPageSkeleton";
import { propertyTypes } from "@/constants/PropertyTypes";
import { getProperty } from "@/server-action/getProperty";
import Image from "next/image";
import { Suspense } from "react";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { LuBath, LuBedDouble } from "react-icons/lu";

export function formatPrice(price: number | string) {
  return Number(price).toLocaleString();
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const propertyId = (await params).propertyId;
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <Suspense fallback={<PropertyPageSkeleton />}>
        <PropertyContent propertyId={propertyId} />
      </Suspense>
    </FrontendLayout>
  );
}

async function PropertyContent({ propertyId }: { propertyId: string }) {
  const property = await getProperty(propertyId);
  return (
    <section className="py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left side */}
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              {property?.listingType === "sale" ? "FOR SALE" : "FOR RENT"}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-text md:text-5xl">
              {property?.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                <FaMapMarkerAlt size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.location}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                <FaRulerCombined size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.area} sqft
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                <LuBedDouble size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.bedrooms} Bedrooms
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                <LuBath size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.bathrooms} Bathrooms
                </span>
              </div>
            </div>
          </div>

          {/* Right side price card */}
          <div className="w-full rounded-[28px] border border-black/5 bg-card p-6 shadow-sm lg:w-[320px] lg:shrink-0">
            <p className="text-sm text-text/60">Property Price</p>

            <h2 className="mt-2 text-4xl font-bold text-primary">
              ${formatPrice(property?.price || "")}
            </h2>
          </div>
        </div>

        <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
          <Image
            src={property?.image || ""}
            alt="property"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {/* left */}
          <div className="lg:col-span-2">
            <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-text">
                About This Property
              </h2>
              <p className="mt-6 leading-relaxed text-text/70">
                {property?.description}
              </p>
            </div>
          </div>

          {/* right */}
          <EmailForm />
          <div></div>
        </div>
      </div>
    </section>
  );
}
