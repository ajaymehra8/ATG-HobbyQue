"use client";
import React, { useEffect, useState } from "react";
import CreateHobby from "./CreateHobby";
import PostHobbyModal from "./PostHobbyModal";
import PostCard from "./PostCard";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getAllHobbies } from "@/utils/api";
import { HobbyType } from "@/types";
import { Loader2 } from "lucide-react";

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
    <div className="flex flex-col gap-5 lg:w-[40%] min-w-[300px] md:w-full min-h-[80vh]">
      <>
        <CreateHobby openModal={openModal} setOpenModal={setOpenModal} />
        {openModal && (
          <PostHobbyModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            setHobbies={setHobbies}
          />
        )}
        {!loading ? (
          hobbies &&
          hobbies?.length > 0 &&
          hobbies.map((hobby) => <PostCard key={hobby._id} hobby={hobby} />)
        ) : (
          <Loader2 size={50} className="self-center animate-spin" />
        )}
      </>
    </div>
  );
};

export default Posts;
