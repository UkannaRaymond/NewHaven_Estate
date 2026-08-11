import RecentProperties from "@/components/home/RecentProperties";
import SearchBox from "@/components/home/SearchBox";
import FrontendLayout from "@/components/layout/FrontendLayout";
import Navbar from "@/components/layout/navbar/Navbar";

export default function Home() {
  return (
    <FrontendLayout>
      <Navbar />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[url('/images/hero.png')] bg-cover bg-center pt-32 lg:pt-36 py-2">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-10 w-full text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              {/* badge */}
              <div
                className="mb-6 inline-flex items-center gap-2
            rounded-full border border-white/10 bg-white/5 px-5 py-2
            backdrop-blur-xl"
              >
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-sm font-medium tracking-wide text-white">
                  Where Luxury Meets Home
                </span>
              </div>

              {/* heading */}
              <h2
                className="text-4xl font-bold leading-tight text-white
            md:text-6xl lg:text-7xl"
              >
                Find a Home That Feels Like Yours
              </h2>

              <p>
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
