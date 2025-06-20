import { SponserType } from "@/types";
import Link from "next/link";
import React from "react";
interface propType {
  sponser: SponserType;
}
const SponserCard = ({ sponser }: propType) => {
  return (
    <div className=" min-h-[200px] w-full flex gap-3 items-center">
      <img src={sponser.image} alt="" className="w-[60%] h-[80%] rounded-3xl" />
      <div>
      <h1>{sponser.name}</h1>
      <Link href={sponser.link} className="text-[blue]" target="_blank">Visit now {">"}</Link>
      </div>
    </div>
  );
};

export default SponserCard;
