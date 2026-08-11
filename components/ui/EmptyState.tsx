"use client";

import { useRouter } from "next/navigation";
import { HiOutlineHomeModern } from "react-icons/hi2";
import Button from "./button";

interface EmptyStateProps {
  title: string;
  subTitle?: string;
  filter?: boolean;
}

export default function EmptyState({
  title,
  subTitle,
  filter,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
        <HiOutlineHomeModern size={40} className="text-primary" />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-text">{title}</h2>

      {subTitle && (
        <p className="mt-3 max-w-md text-text/60 leading-relaxed">{subTitle}</p>
      )}

      {filter && (
        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => router.replace("/marketplace")}
          >
            {" "}
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
