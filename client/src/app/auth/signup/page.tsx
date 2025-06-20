"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Sidebar from "../components/Sidebar"; // Assuming it's already converted
import { getOtp, signup, verifyOtp } from "@/utils/api";
import Link from "next/link";
import toast from "react-hot-toast";
import { useGlobalState } from "@/context/GlobalProvider";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnState, setBtnState] = useState(1);
  const [otp, setOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { setUser, setToken,user } = useGlobalState();
  const router = useRouter();
useEffect(()=>{
if(user){
    router.push("/");
}
},[user,router]);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (btnState === 1) {
        const { data } = await getOtp(email);
        if (data.success) {
          toast.success(data.message);
          setBtnState(2);
        } else {
          toast.error(data.message || "An error occurred");
          setEmail("");
        }
      } else if (btnState === 2) {
        const { data } = await verifyOtp(email, otp);
        if (data.success) {
          toast.success(data.message);
          setBtnState(3);
        } else toast.error(data.message);
      } else if (btnState === 3) {
        const { data } = await signup(email, password, name);
        if (!data.success) {
          toast.error(data.message);
        } else {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          toast.success("Signup successful");
          router.push("/");
        }
      }
    } catch (err) {
      if (err instanceof AxiosError)
        alert(err?.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-white  md:pl-10 px-5">
      <div className="w-full lg:w-[30%] max-w-md min-h-[300px] bg-[#EEEEEE] p-6 rounded-lg flex flex-col items-start gap-4 border-1">
        <h1 className="text-2xl font-bold cursor-pointer">
          <span className="text-[#9810FA]">H</span>obbyQue
        </h1>
        <h2 className="text-xl font-medium">Create your account</h2>
        <p className="text-base font-medium text-black">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#9810FA]">
            Log in
          </Link>
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-black rounded px-4 py-2 w-full"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={btnState > 1}
        />
        {btnState === 2 && (
          <input
            type="number"
            placeholder="Enter OTP"
            className="border border-black rounded px-4 py-2 w-full"
            onChange={(e) => setOtp(e.target.value)}
            value={otp || ""}
          />
        )}
        {btnState === 3 && (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-black rounded px-4 py-2 w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div className="relative w-full">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-black rounded px-4 py-2 w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="absolute right-2 top-2 text-[#9810FA] text-sm cursor-pointer"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </>
        )}
        <button
          className={`mt-4 px-4 py-2 text-white rounded-full self-start ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 cursor-pointer"
          }`}
          onClick={!loading ? handleSubmit : undefined}
          disabled={loading}
        >
          {btnState === 1 && (loading ? "Wait..." : "Next")}
          {btnState === 2 && (loading ? "Verifying..." : "Verify OTP")}
          {btnState === 3 && (loading ? "Signing..." : "Sign up")}
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
