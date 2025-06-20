"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalProvider"; // example global auth

const Page = () => {
  const router = useRouter();
  const { user } = useGlobalState(); // access global user state

  useEffect(() => {
    if (!user) {
      router.push("/auth/signup");
    }
  }, [user, router]);

  if (!user) return null; // optional: avoid rendering anything while redirecting

  return <div>hello</div>;
};

export default Page;
