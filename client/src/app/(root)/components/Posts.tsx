"use client";
import React, { useEffect, useState } from "react";
import CreateHobby from "./CreateHobby";
import PostHobbyModal from "./PostHobbyModal";
import PostCard from "./PostCard";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getAllHobbies } from "@/utils/api";
import { HobbyType } from "@/types";

const Posts = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [hobbies, setHobbies] = useState<HobbyType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchHobbies = async () => {
    setLoading(true);
    try {
      const { data } = await getAllHobbies();
      if (data.success) {
        setHobbies(data.hobbies);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHobbies();
  }, []);
  return (
    <div className="flex flex-col gap-5 md:w-[40%] sm:w-full min-h-[80vh]">
      {!loading ? (
        <>
          <CreateHobby openModal={openModal} setOpenModal={setOpenModal} />
          {openModal && (
            <PostHobbyModal openModal={openModal} setOpenModal={setOpenModal} setHobbies={setHobbies}/>
          )}
          {hobbies &&
            hobbies?.length > 0 &&
            hobbies.map((hobby) => <PostCard key={hobby._id} hobby={hobby} />)}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Posts;
