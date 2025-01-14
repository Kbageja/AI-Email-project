import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
export const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
