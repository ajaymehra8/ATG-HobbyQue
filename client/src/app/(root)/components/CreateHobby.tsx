"use client";
import { useGlobalState } from "@/context/GlobalProvider";
import { createHobby } from "@/utils/api";
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateHobby = () => {
  const { user } = useGlobalState();
  const [name, setName] = useState("");
  const addHobby = async () => {
    try {
      const { data } = await createHobby(name);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err.response?.data.message);
    }
  };
  //  const template = async () => {
  //   try {

  //   } catch (err) {
  //     if (err instanceof AxiosError) toast.error(err.response?.data.message);
  //   }
  // };
  return (
    <div className="w-full h-[15vh] border-2 p-5 bg-[#fff] flex gap-5 items-center justify-start">
      <img
        src={user?.image}
        alt="user-img"
        className="w-10 h-10 rounded-full"
      />
      <input
        value={`Add new hobby`}
        className="cursor-pointer bg-[#e2e6e7] w-full h-10 px-5 rounded-full"
        disabled
        onClick={addHobby}
      />
    </div>
  );
};

export default CreateHobby;
