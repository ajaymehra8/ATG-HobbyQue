import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (optional: for authentication)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust based on your auth setup
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  check user is authorized or not
API.interceptors.response.use(
  (response) => response, // If response is OK, return it
  (error) => {
    if (error.response) {
      // Check if the token has expired
      console.log(error);
      if (error.response.status === 401) {
        console.log("Token expired. Logging out...");

        // Perform any task (e.g., logout user, redirect, clear storage)
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login page
      }
    }
    return Promise.reject(error); // Reject the error for further handling
  }
);

// signup and login apis
export const getOtp = (email) =>
  API.get(`/api/v1/auth/send-otp/?email=${email}`);
export const verifyOtp = (email, otp) =>
  API.post(`/api/v1/auth/verify-otp`, { email, otp });
export const signup = (email, password, name) =>
  API.post(`/api/v1/auth/signup`, { email, password, name });
export const login = (email, password) =>
  API.post(`/api/v1/auth/login`, { email, password });


//user apis
export const getUserHobbies = () => API.get(`/api/v1/user/user-hobbies`);
export const getAllUsers = (query) =>{
  if(!query)
   return API.get(`/api/v1/user`);
     return API.get(`/api/v1/user?query=${query}`);

  };


// hobby api
export const createHobby = (name) => API.post(`/api/v1/hobby`, { name });
export const updateHobby = (name, hobbyId) =>
  API.patch(`/api/v1/hobby`, { name, hobbyId });
export const deleteHobby = (hobbyId) => API.delete(`/api/v1/hobby/${hobbyId}`);
export const getAllHobbies = () => API.get(`/api/v1/hobby`);
export const getUsersByHobby = (query) =>API.get(`/api/v1/hobby/user?query=${query}`);
export default API;
