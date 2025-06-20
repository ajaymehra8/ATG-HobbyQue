"use client";
import { UserType } from "@/types";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getAllUsers } from "@/utils/api";
import UserCard from "./UserCard";
import { Loader2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchUsers = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col gap-5 lg:w-[40%] min-w-[300px] md:w-full min-h-[80vh]">
      <SearchBar setUsers={setUsers} setLoading={setLoading} />
      <div className="flex flex-col gap-3 mt-4 px-0">
        {!loading ? (
          users && users.length > 0 ? (
            users.map((u) => <UserCard user={u} key={u._id} />)
          ) : (
            <h1 className="text-4xl self-center mt-[30%]">No user found</h1>
          )
        ) : (
          <Loader2 size={50} className="self-center animate-spin" />
        )}
      </div>
    </div>
  );
};

export default Users;
