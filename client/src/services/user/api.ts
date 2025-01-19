 // Importing types from Axios
import { baseapi } from "@/Api"; // Import the base API instance
import { loginData, registerData } from "@/types/user";

export const getUser = () => {
    return baseapi.get("/user/check-auth");
  };
  export const logoutUser = () => {
    return baseapi.get("/user/logout");
  };
export const register = (data: registerData) => {
    return baseapi.post("/user/register", data);
  };

export const login = (data: loginData) => {
    return baseapi.post("/user/login", data);
  };
