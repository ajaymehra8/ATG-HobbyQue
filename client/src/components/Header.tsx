"use client";
import React from "react";
import { Puzzle, Users, Smile, LogOut } from "lucide-react";
import { useGlobalState } from "@/context/GlobalProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Header = () => {
  const { setUser, setToken } = useGlobalState();
  const router = useRouter();
  return (
    <div className="w-screen flex justify-between items-center h-[60px] px-6 sm:px-10 bg-[#fff] fixed z-50 shadow-md">
      {/* Logo Section */}
      <Link href="/" className="cursor-pointer">
        {/* Show full name on medium and up */}
        <h1 className="text-2xl sm:text-3xl font-bold hidden sm:block">
          <span className="text-[#9810FA]">H</span>obby
          <span className="text-[#9810FA]">Q</span>ue
        </h1>

        {/* Show icon only on small screens */}
        <div className="block sm:hidden p-2 bg-[#f0e9ff] rounded-full shadow-sm">
          <Smile className="text-[#9810FA] w-6 h-6" />
        </div>
      </Link>

      {/* Navigation */}
      <ul className="flex list-none gap-4 sm:gap-10 items-center">
        <li
          className="transition duration-300 hover:bg-gray-200 px-4 py-2 rounded-xl cursor-pointer"
          title="All users"
        >
          <Link href="/users">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </li>
        <li
          className="transition duration-300 hover:bg-gray-200 px-4 py-2 rounded-xl cursor-pointer"
          title="Hobbies"
        >
          <Link href="/hobbies">
            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </li>
        <li
          title={"Logout"}
          className="cursor-pointer"
          onClick={() => {
            setUser(null);
            setToken("");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        >
          <LogOut />
        </li>
      </ul>
    </div>
  );
};

export default Header;
