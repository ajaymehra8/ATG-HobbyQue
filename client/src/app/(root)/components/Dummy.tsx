"use client";
import {

  Heart,
  Music,
  Camera,
  Paintbrush,
  BookOpen,
  Gamepad2,
  TreePine,
  Dumbbell,
  ChefHat,
  Globe,
  Mic,
  Film,
} from "lucide-react";
import React from "react";

const Dummy = () => {
  const dummyData = [
    { id: 3, name: "Fitness", icon: <Dumbbell /> },
    { id: 4, name: "Photography", icon: <Camera /> },
    { id: 5, name: "Travel", icon: <Globe /> },
    { id: 6, name: "Music", icon: <Music /> },
    { id: 7, name: "Reading", icon: <BookOpen /> },
    { id: 8, name: "Gaming", icon: <Gamepad2 /> },
    { id: 9, name: "Painting", icon: <Paintbrush /> },
    { id: 10, name: "Nature", icon: <TreePine /> },
    { id: 11, name: "Cooking", icon: <ChefHat /> },
    { id: 12, name: "Singing", icon: <Mic /> },
    { id: 13, name: "Movies", icon: <Film /> },
    { id: 15, name: "Volunteering", icon: <Heart /> },
  ];

  return (
    <div className="hidden lg:block lg:fixed w-[25%] h-[87vh] left-5 group">
      <h1 className="text-2xl mb-5">Hobby Suggestions</h1>
      <div className="flex flex-col gap-5 justify-start items-start h-full overflow-hidden group-hover:overflow-y-auto pr-2 pb-20">
        {dummyData.map((data) => (
          <div key={data.id} className="flex gap-3 items-center cursor-pointer">
            {data.icon} <h1 className="text-[20px]">{data.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dummy;
