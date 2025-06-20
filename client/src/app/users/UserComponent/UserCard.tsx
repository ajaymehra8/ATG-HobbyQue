import { UserType } from "@/types";
import React from "react";
interface propType {
  user: UserType;
}
const UserCard = ({ user }: propType) => {
  return (
    <div className="w-full rounded-2xl px-3 py-5 cursor-pointer bg-[#fff] flex gap-5 items-center justify-start">
      <img
        src={user?.image}
        alt="user-img"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h2 className="text-[18px]">{user?.name}</h2>
        <p className="text-[12px] text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
