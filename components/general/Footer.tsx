"use client";

import Link from "next/link";

const marketLinks = [
  "London Real Estate",
  "Abuja Real Estate",
  "Paris Real Estate",
  "Alabama Real Estate",
  "Alaska Real Estate",
  "Barcelona Real Estate",
  "New Delhi Real Estate",
  "Lagos Real Estate",
  "Abidjan Real Estate",
  "California Real Estate",
];

const popularSearches = [
  "Houses for Sale Near Me",
  "Luxury Apartments for Rent Near Me",
  "Townhomes for Rent Near Me",
  "Condos for Sale Near Me",
  "Apartments for Rent Near Me",
];

const professionalLinks = [
  "Property Management",
  "Real Estate Leads",
  "Rental Communities",
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-background">
      {/* Tagline */}
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-2xl font-semibold"
        >
          <span className="text-text">New</span>
          <span className="rounded-tr-2xl rounded-bl-2xl bg-primary px-2 py-1 text-white">
            Haven Estate
          </span>
        </Link>

        <p className="mt-6 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          discover <span className="text-primary">a place</span> you&apos;ll{" "}
          <span className="text-primary">love</span> to live
        </p>
      </div>

      {/* Footer links */}
      <div className="border-t border-black/5">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-12">
          {/* Real Estate Markets */}
          <div>
            <h3 className="text-sm font-semibold text-text">
              Real Estate Markets
            </h3>

            <ul className="mt-3 space-y-1.5">
              {marketLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/marketplace"
                    className="text-sm text-text/60 transition-colors hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="text-sm font-semibold text-text">
              Popular Searches
            </h3>

            <ul className="mt-3 space-y-1.5">
              {popularSearches.map((link) => (
                <li key={link}>
                  <Link
                    href="/marketplace"
                    className="text-sm text-text/60 transition-colors hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="text-sm font-semibold text-text">
              For Professionals
            </h3>

            <ul className="mt-3 space-y-1.5">
              {professionalLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-text/60 transition-colors hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black/5 py-8 text-center">
        <p className="text-sm text-text/60">
          &copy; 2026 NewHaven Estate. All rights reserved.
        </p>
      </div>

      {/* Decorative city */}
      <div className="relative h-32 overflow-hidden">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-text/80" />

        {/* Buildings */}
        <div className="absolute bottom-0 left-[12%] h-16 w-16 rounded-t-sm bg-primary/80 sm:left-[20%]" />

        <div className="absolute bottom-0 left-[22%] h-24 w-20 rounded-t-sm bg-primary sm:left-[29%]">
          <div className="grid grid-cols-2 gap-3 p-3">
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
          </div>
        </div>

        <div className="absolute bottom-0 left-[43%] h-28 w-24 rounded-t-sm bg-primary/90">
          <div className="grid grid-cols-2 gap-3 p-3">
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
          </div>
        </div>

        <div className="absolute bottom-0 left-[56%] h-20 w-20 bg-primary/70">
          <div className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 bg-primary/70" />
        </div>

        <div className="absolute bottom-0 left-[70%] h-24 w-20 rounded-t-sm bg-primary/80">
          <div className="grid grid-cols-2 gap-3 p-3">
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
            <span className="h-3 w-3 bg-white/80" />
          </div>
        </div>

        {/* Trees */}
        <div className="absolute bottom-0 left-[7%] h-12 w-3 rounded-full bg-primary/60" />
        <div className="absolute bottom-10 left-[6.3%] h-12 w-5 rounded-full bg-primary/60" />

        <div className="absolute bottom-0 right-[10%] h-12 w-3 rounded-full bg-primary/60" />
        <div className="absolute bottom-10 right-[9.3%] h-12 w-5 rounded-full bg-primary/60" />
      </div>
    </footer>
  );
}
