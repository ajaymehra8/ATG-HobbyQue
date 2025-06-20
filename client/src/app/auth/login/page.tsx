"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { AxiosError } from "axios";
import { login } from "../../../utils/api";
import { useGlobalState } from "../../../context/GlobalProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, setToken ,user} = useGlobalState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(()=>{
  if(user){
      router.push("/");
  }
  },[user,router]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await login(email, password );

      if (!data.success) {
        toast.error(data.message || "An error occurred");
      } else {
        toast.success(data.message);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(
          error?.response?.data?.message || "Please try again later."
        );
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white pl-10">
      <div className="w-full max-w-md lg:w-[30%] min-h-[300px] bg-[#EEEEEE] p-6 rounded-lg flex flex-col items-start gap-4 shadow-md shadow-gray-300">
        <h1
          className="text-3xl font-bold cursor-pointer mb-5"
          onClick={() => router.push("/")}
        >
          <span className="text-[#9810FA]">H</span>obbyQue
        </h1>

        <h2 className="text-xl font-medium">Login to your account</h2>

        <p className="text-base font-medium text-black">
          Have an Account?{" "}
          <Link href="/auth/signup" className="text-[#9810FA]">
            Create one
          </Link>
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-black rounded-md text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          name="email"
        />

        <div className="relative w-full">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-black rounded-md text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-2 text-[#9810FA] text-sm cursor-pointer"
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={!loading ? handleSubmit : undefined}
          disabled={loading}
          className={`mt-4 px-4 py-2 text-white rounded-full self-start ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 cursor-pointer"
          }`}
        >
          {loading ? "Wait..." : "Log in"}
        </button>
      </div>
      <Sidebar />
    </div>
  );
};

export default Login;
