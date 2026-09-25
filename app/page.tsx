import { Suspense } from "react";
import Image from "next/image";
import RecentProperties from "@/components/home/RecentProperties";
import SearchBox from "@/components/home/SearchBox";
import FrontendLayout from "@/components/layout/FrontendLayout";
import Navbar from "@/components/layout/navbar/Navbar";
import AuthModalHandler from "@/components/auth/AuthModalTrigger";

export default function Home() {
  return (
    <FrontendLayout>
      <Suspense fallback={null}>
        <AuthModalHandler />
      </Suspense>

      <Navbar />

      <section className="relative flex min-h-screen items-center overflow-hidden py-2 pt-32 lg:pt-36">
        {/* Hero image */}
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-0 bg-black/20" />

        {/* Left-to-right gradient */}
        <div className="absolute inset-0 z-10 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent" />

        {/* Content */}
        <div className="relative z-20 w-full text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
                <div className="size-2 rounded-full bg-primary" />

                <span className="text-sm font-medium tracking-wide text-white">
                  Where Luxury Meets Home
                </span>
              </div>

              <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Find a Home That Feels Like Yours
              </h2>

              <p className="mt-4 text-lg text-white/80">
                Discover Extraordinary Homes in the World&apos;s Most Desirable
                Destinations.
              </p>

              <SearchBox />
            </div>
          </div>
        </div>
      </section>

      <RecentProperties />
    </FrontendLayout>
  );
}
