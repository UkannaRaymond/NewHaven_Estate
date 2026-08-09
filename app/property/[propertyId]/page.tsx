import FrontendLayout from "@/components/layout/FrontendLayout";
import Navbar from "@/components/layout/navbar/Navbar";
import EmailForm from "@/components/properties/EmailForm";
import Image from "next/image";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { LuBath, LuBedDouble } from "react-icons/lu";

export default function PropertyPage() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <section className="py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Top row */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left side */}
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                For Sale
              </p>

              <h1 className="mt-3 text-4xl font-bold text-text md:text-5xl">
                Modern Luxury Apartment
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                  <FaMapMarkerAlt size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">
                    123 Main Street, City, State 12345
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                  <FaRulerCombined size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">
                    2200 sqft
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                  <LuBedDouble size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">
                    6 Bedrooms
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2">
                  <LuBath size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">
                    3 Bathrooms
                  </span>
                </div>
              </div>
            </div>

            {/* Right side price card */}
            <div className="w-full rounded-[28px] border border-black/5 bg-card p-6 shadow-sm lg:w-[320px] lg:shrink-0">
              <p className="text-sm text-text/60">Property Price</p>

              <h2 className="mt-2 text-4xl font-bold text-primary">
                $2,500,000
              </h2>
            </div>
          </div>

          <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
            <Image
              src="/images/property8.png"
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
                  Experience luxury living in this beautifully designed modern
                  apartment, located in one of the city's most desirable
                  neighbourhoods. The home features spacious living areas,
                  premium finishes, and floor-to-ceiling windows that bring in
                  abundant natural light throughout the day. Thoughtfully
                  planned for comfort and style, it offers elegant interiors,
                  generous bedrooms, and access to exceptional amenities,
                  creating a sophisticated home that is perfect for both
                  everyday living and entertaining.
                </p>
              </div>
            </div>

            {/* right */}
            <EmailForm />
            <div></div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}
