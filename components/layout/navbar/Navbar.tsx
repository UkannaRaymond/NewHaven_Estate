"use client";

import Button from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import { useCreatePropertModalStore } from "@/store/useCreatePropertyModal";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export const NavLinks = ["Home", "Properties", "MarketPlace"];

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const { openLogin } = useAuthModalStore();
  const { open: openCreateModal } = useCreatePropertModalStore();

  const isTransparent = variant === "transparent";

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <section
      className={`top-0 left-0 z-50 w-full ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex h-20 items-center justify-between ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" : "px-0"} `}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-xl font-semibold sm:text-2xl"
          >
            <span
              className={`shrink-0 ${isTransparent ? "text-gray-300" : "text-text"}`}
            >
              New
            </span>

            <span className="truncate rounded-tr-2xl rounded-bl-2xl bg-primary px-2 py-1 text-white whitespace-nowrap">
              Haven Estate
            </span>
          </Link>

          {/* desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NavLinks.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`text-sm font-medium transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* desktop buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" onClick={openLogin}>
                Login
              </Button>
            )}

            {!isPending && session && (
              <Button icon variant="outline" onClick={openCreateModal}>
                Add Property
              </Button>
            )}
          </div>

          {/* mobile menu button */}
          <Button
            className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition hover:bg-primary/90 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose size={22} /> : <HiOutlineMenuAlt3 size={22} />}
          </Button>
        </nav>
        {/* mobile menu */}
        {isOpen && (
          <div
            className={`my-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden
              ${
                isTransparent
                  ? "border border-white/10 bg-secondary/95"
                  : "border border-black/5 bg-white"
              }`}
          >
            <div className="flex flex-col gap-5">
              {NavLinks.map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                {session ? (
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="outline" onClick={openLogin}>
                    Login
                  </Button>
                )}
                {!isPending && session && (
                  <Button icon variant="outline" onClick={openCreateModal}>
                    Add Property
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
