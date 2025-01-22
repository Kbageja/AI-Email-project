import axios from "axios";

export const baseapi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Include cookies in all requests
});
