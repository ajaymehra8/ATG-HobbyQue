"use client";
import { HobbyType } from "@/types";
import { createHobby } from "@/utils/api";
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface propType {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setHobbies: React.Dispatch<React.SetStateAction<HobbyType[] | null>>;
}

const PostHobbyModal = ({ openModal, setOpenModal,setHobbies }: propType) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const addHobby = async () => {
    try {
      setLoading(true);
      const { data } = await createHobby(name);
      if (data.success) {
        setHobbies(prevHobbies=>{
          if(!prevHobbies)
          return [data.hobby];
        return [data.hobby,...prevHobbies];
        });
        toast.success(data.message);
      }
      setOpenModal(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center">
      {/* Dim background overlay */}
      <div
        className="absolute inset-0 bg-black/10"
        onClick={() => setOpenModal(false)}
      />

      {/* Modal content */}
      <div
        className="w-[90vw] max-w-[500px] h-[40vh] flex flex-col gap-3 bg-white shadow-2xl z-50 rounded-xl py-5 px-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inside click
      >
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
        >
          ×
        </button>

        <h1 className="text-lg font-semibold">Write a hobby</h1>
        <textarea
          className="border-2 w-full h-1/2 p-2 text-[18px] rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addHobby}
          className={`mt-auto px-4 py-2 min-w-[80px] text-white rounded-full self-end transition ${
            loading || name.length == 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
          }`}
          disabled={loading || name.length == 0}
        >
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostHobbyModal;
