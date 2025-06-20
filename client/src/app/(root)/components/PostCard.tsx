"use client";
import { useGlobalState } from "@/context/GlobalProvider";
import { HobbyType } from "@/types";
import { deleteHobby } from "@/utils/api";
import { AxiosError } from "axios";
import { Loader2, Trash2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PostCard = ({
  hobby,
  setHobbies,
}: {
  hobby: HobbyType;
  setHobbies: React.Dispatch<React.SetStateAction<HobbyType[] | null>>;
}) => {
  const { user } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const time = moment(hobby.createdAt).fromNow();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const id = hobby._id;
      const { data } = await deleteHobby(hobby._id);
      if (data.success) {
        toast.success(data.message);
        setHobbies((prevHobbies) => {
          if (!prevHobbies) {
            return null;
          }
          return prevHobbies.filter((hobb) => hobb._id != id);
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Proble in deleting hobby");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative w-full min-h-30 rounded-2xl p-5 bg-[#fff] flex flex-col gap-1 items-start justify-start cursor-pointer">
      {user?._id === hobby.user._id && (
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleDelete}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}{" "}
        </button>
      )}
      <div className="flex gap-2 items-center justify-start">
        <img
          src={hobby?.user?.image}
          alt="user-img"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-[18px]">{hobby?.user?.name}</h2>
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
