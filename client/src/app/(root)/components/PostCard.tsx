"use client";
import { useGlobalState } from "@/context/GlobalProvider";
import { HobbyType } from "@/types";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import React from "react";

const PostCard = ({ hobby }: { hobby: HobbyType }) => {
  const { user } = useGlobalState();
  const time = moment(hobby.createdAt).fromNow();
  return (
    <div className="relative w-full min-h-30 rounded-2xl p-5 bg-[#fff] flex flex-col gap-1 items-start justify-start cursor-pointer">
      {user?._id === hobby.user._id && (
        <button className="absolute top-5 right-5 cursor-pointer">
          <MoreHorizontal />
        </button>
      )}
      <div className="flex gap-2 items-center justify-start">
        <img
          src={hobby?.user?.image}
          alt="user-img"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-[18px]">{hobby?.user?.name} Mahara</h2>
          <p className="text-[12px] text-gray-600">{time}</p>
        </div>
      </div>
      <h2 className="text-[20px] ml-2">
        {hobby?.user?.name} added a new hobby <b>{hobby?.name}</b>
      </h2>
    </div>
  );
};

export default PostCard;
