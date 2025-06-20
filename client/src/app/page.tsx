"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalProvider"; // example global auth
import Header from "@/components/Header";
import Users from "./(root)/components/Users";
import Sponsered from "./(root)/components/Sponsered";
import Posts from "./(root)/components/Posts";

const Page = () => {
  const router = useRouter();
  const { user } = useGlobalState(); // access global user state

  useEffect(() => {
    if (!user) {
      router.push("/auth/signup");
    }
  }, [user, router]);

  if (!user) return null; // optional: avoid rendering anything while redirecting

  return (
    <>
      <Header />
      <div className="bg-[#f0f4f5] min-h-screen pt-[80px] flex p-10 gap-15 items-start justify-center">
        <Users />
        <Posts />
        <Sponsered />
      </div>
    </>
  );
};

export default Page;
