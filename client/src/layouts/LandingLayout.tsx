import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
export const LandingLayout = () => {
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href")?.substring(1);
    const targetElement = document.getElementById(targetId || "");

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Navbar handleScroll={handleScroll} />
      <Outlet />
    </>
  );
};
