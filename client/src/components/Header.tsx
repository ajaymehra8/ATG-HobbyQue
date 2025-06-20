"use client";
import React from "react";
import { Puzzle, Users } from "lucide-react";
import { useGlobalState } from "@/context/GlobalProvider";
import Link from "next/link";

const Header = () => {
  const { user } = useGlobalState();
  return (
    <div className="w-screen flex justify-between items-center h-[60px] px-10 bg-[#fff] fixed z-50">
      <h1 className="text-3xl font-bold cursor-pointer">
        <Link href={'/'}>
        <span className="text-[#9810FA]">H</span>obby
        <span className="text-[#9810FA]">Q</span>ue
        </Link>
      </h1>
      <ul className="flex list-none gap-10 items-center">
        <li
          className="transition duration-500 ease-in-out hover:bg-gray-200 px-5 py-2 rounded-xl cursor-pointer"
          title="All users"
        >
          <Link href="/users">
            <Users />
          </Link>
        </li>
        <li
          title="Hobbies"
          className="transition duration-500 ease-in-out hover:bg-gray-200 px-5 py-2 rounded-xl cursor-pointer"
        >
          <Link href="/hobbies">
            <Puzzle />
          </Link>
        </li>
        <li
          title={user?.name || "Profile"}
          className="px-5 py-2 rounded-xl cursor-pointer"
        >
          <Link href="">
            <img
              src={user?.image || " "}
              alt="user profile"
              className="rounded-full w-8 h-8"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
