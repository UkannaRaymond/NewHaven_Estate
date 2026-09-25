"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthModalStore } from "@/store/useAuthModalStore";

export default function AuthModalHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { openLogin, openRegister } = useAuthModalStore();

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "login") {
      openLogin();
      router.replace("/", { scroll: false });
    }

    if (auth === "register") {
      openRegister();
      router.replace("/", { scroll: false });
    }
  }, [searchParams, openLogin, openRegister, router]);

  return null;
}
