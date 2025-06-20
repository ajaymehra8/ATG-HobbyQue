import { UserType } from "@/types";
import { getAllUsers } from "@/utils/api";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface propType {
  setUsers: React.Dispatch<React.SetStateAction<UserType[] | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  
}
const SearchBar = ({ setUsers,setLoading }: propType) => {
  const [query, setQuery] = useState("");
  const handleSubmit = async() => {
    setLoading(true);
    try {
        const {data}=await getAllUsers(query);
        if(data.success){
            setUsers(data.users);
        }
    } catch (err) {
      if (err instanceof AxiosError)
        toast.error(
          err.response?.data.message || "Some issue in searching user"
        );
    }
    setLoading(false);
    setQuery("");
  };
  return (
    <div className="w-full min-h-[10vh] bg-[#fff] flex justify-center items-center px-4 gap-3 rounded-2xl">
      <input
        type="text"
        placeholder="Search user by name"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        className="cursor-pointer bg-[#e2e6e7] w-full h-10 px-5 rounded-full focus:border-hidden focus:outline-0"
      />
      <Search className="cursor-pointer" onClick={handleSubmit} />
    </div>
  );
};

export default SearchBar;
