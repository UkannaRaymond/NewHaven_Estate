"use client";

import { useState } from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.replace(`/marketplace?search=${searchQuery}`);
  };
  return (
    <div
      className="mt-10 rounded-[30px] border border-white/10
  bg-white/10 p-4 shadow-2xl backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-4 lg:flex-row items-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by city, neighborhood, or address"
          className="px-5 py-4 h-14 w-full flex-1 rounded-2xl
          border border-white/10 bg-white/5 text-white
          placeholder:text-white/50 outline-none transition
          focus:border-primary/40"
        />
        <Button onClick={handleSearch}>Search Properties</Button>
      </div>
    </div>
  );
}
