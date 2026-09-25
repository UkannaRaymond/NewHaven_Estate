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

  const handlePropertiesClick = () => {
    if (isPending) return;

    if (!session) {
      setIsOpen(false);
      openLogin();
      return;
    }

    router.push("/properties");
    setIsOpen(false);
  };

  return (
    <section
      className={`top-0 left-0 z-50 w-full ${
        isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex h-20 items-center justify-between ${
            isTransparent
              ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl"
              : "px-0"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 overflow-hidden text-xl font-semibold sm:text-2xl"
          >
            <span
              className={`shrink-0 ${
                isTransparent ? "text-gray-300" : "text-text"
              }`}
            >
              New
            </span>

            <span className="truncate rounded-tr-2xl rounded-bl-2xl bg-primary px-2 py-1 text-white whitespace-nowrap">
              Haven Estate
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {NavLinks.map((item) => {
              if (item === "Properties") {
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={handlePropertiesClick}
                    disabled={isPending}
                    className={`text-sm font-medium transition hover:text-primary disabled:cursor-default ${
                      isTransparent ? "text-white/80" : "text-text/70"
                    }`}
                  >
                    {item}
                  </button>
                );
              }

              return (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`text-sm font-medium transition hover:text-primary ${
                    isTransparent ? "text-white/80" : "text-text/70"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-2 xl:gap-4 lg:flex">
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

          {/* Mobile menu button */}
          <Button
            className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition hover:bg-primary/90 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose size={22} /> : <HiOutlineMenuAlt3 size={22} />}
          </Button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className={`my-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden ${
              isTransparent
                ? "border border-white/10 bg-secondary/95"
                : "border border-black/5 bg-white"
            }`}
          >
            <div className="flex flex-col gap-5">
              {NavLinks.map((item) => {
                if (item === "Properties") {
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={handlePropertiesClick}
                      disabled={isPending}
                      className={`text-left transition hover:text-primary disabled:cursor-default ${
                        isTransparent ? "text-white/80" : "text-text/70"
                      }`}
                    >
                      {item}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={`transition hover:text-primary ${
                      isTransparent ? "text-white/80" : "text-text/70"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}

              <div className="mt-4 flex flex-col gap-3">
                {session ? (
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      openLogin();
                    }}
                  >
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
