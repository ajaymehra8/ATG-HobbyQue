"use client";
import { UserType } from "@/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";


// Define the shape of the context
interface GlobalContextType{
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// Create context with a default value
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string>("");



  

  
  const fetchUserDetails = async () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      setUser(null);
      setToken("");
      return;
    }

    try {
      const parsedUser: UserType = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(token);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
    }
  };

 

  useEffect(() => {
    fetchUserDetails();
  }, []);
 
  
  
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use context
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
