"use client";
import { UserType } from "@/types";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getAllUsers } from "@/utils/api";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      if (err instanceof AxiosError)
        toast.error(
          err.response?.data.message || "Some issue in fetching user"
        );
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col gap-5 lg:w-[40%] min-w-[300px] md:w-full min-h-[80vh]">
      <SearchBar setUsers={setUsers} />
      <div className="flex flex-col gap-3 mt-3 px-0">
      {users && users.length > 0 && users.map((u) => <UserCard user={u} key={u._id}/>)}
      </div>
    </div>
  );
};

export default Users;
