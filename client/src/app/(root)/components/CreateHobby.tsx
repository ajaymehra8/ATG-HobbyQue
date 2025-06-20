"use client";
import { useGlobalState } from "@/context/GlobalProvider";

import React from "react";

interface propType {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateHobby = ({ openModal, setOpenModal }: propType) => {
  const { user } = useGlobalState();
  console.log(openModal);
  //  const template = async () => {
  //   try {

  //   } catch (err) {
  //     if (err instanceof AxiosError) toast.error(err.response?.data.message);
  //   }
  // };
  return (
    <div className="w-full h-[15vh] rounded-2xl p-5 bg-[#fff] flex gap-5 items-center justify-start">
      <img
        src={user?.image}
        alt="user-img"
        className="w-10 h-10 rounded-full"
      />
      <input
        value={`Add new hobby`}
        className="cursor-pointer bg-[#e2e6e7] w-full h-10 px-5 rounded-full focus:border-hidden"
        onClick={() => {
          console.log("hello");
          setOpenModal(true);
        }}
        readOnly
      />
    </div>
  );
};

export default CreateHobby;
