"use client"
import { UserType } from "@/types";
import React, { useState } from "react";

const Users = () => {
  const [users,setUsers]=useState<UserType[]|null>(null);
  return (
    <div className="border-2 sm:none  md:w-[25%] h-[87vh] overflow-y-auto fixed left-5 pt-3 pl-2">
      <h1 className="text-2xl">All User</h1>
    </div>
  );
};

export default Users;
