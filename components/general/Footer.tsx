"use client";

import Link from "next/link";
import { NavLinks } from "../layout/navbar/Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center lg:flex-row lg:px-12 flex-col items-center justify-between gap-4 lg:flex">
        <Link href={"/"} className="flex items-center text-2xl font-semibold">
          <span className={"text-text"}>New</span>
          <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
            Haven Estate
          </span>
        </Link>

        <div className="items-center gap-8 flex">
          {NavLinks.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `${item.toLowerCase()}`}
              className="text-sm font-medium transition hover:text-primary text-text/70"
            >
              {item}
            </Link>
          ))}
        </div>

        <p className="text-sm text-text/60">&copy; 2026 NewHaven Estate</p>
      </div>
    </footer>
  );
}
