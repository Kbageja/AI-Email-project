import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/contexts/userContext";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

interface HeaderProps {
  handleScroll: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
}
const Navbar: React.FC<HeaderProps> = ({ handleScroll }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);
  const [open, setOpen] = useState(false);
  // Check if the user is authenticated (if `data.name` exists)
  const isAuthenticated = auth?.data?.data?.name;

  const handleOpen = () => {
    setOpen(!open);
  };

  // Redirect to /user/dashboard if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user/dashboard/CreatedCampaign");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`hidden fixed z-20 w-full py-5  md:flex justify-around transition duration-300 ${
          scrolling
            ? "bg-white/70 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Email Generator</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#features"
                  onClick={handleScroll}
                  className="hover:underline"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={handleScroll}
                  className="hover:underline"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={handleScroll}
                  className="hover:underline"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 md:px-0">
            {!isAuthenticated && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLoginClick}
                  className="bg-blue-500 text-white rounded-full text-xs sm:text-sm md:text-base px-4 py-2"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSignupClick}
                  className="bg-blue-500 text-white rounded-full text-xs sm:text-sm md:text-base px-4 py-2"
                >
                  Signup
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div
        className={` md:hidden w-full z-10 h-14 fixed backdrop:bl top-0 flex justify-end ${
          scrolling
            ? "bg-white/70 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div
          className="block bg-transparent p-2 text-black"
          onClick={handleOpen}
        >
          <HiOutlineBars3 className="h-10 w-10" />
        </div>
      </div>

      <div
        className={`bg-white/20 backdrop-blur-md text-white w-full h-screen fixed top-0 right-0 z-50 duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2  flex justify-end">
          <div className="text-white bg-transparent" onClick={handleOpen}>
            <IoClose className="h-10 w-10 text-black" />
          </div>
        </div>

        <div className=" flex space-y-10 mt-28 font-bold text-2xl flex-col justify-center text-black items-center">
          <div>
            <span className="font-normal uppercase font-inter text-3xl text-black">
              Iam
              <span className="font-extrabold text-main-300">Ready</span>
              <span className="font-extrabold italic">AI.</span>
            </span>
          </div>
          <div
            className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              window.location.href = "/recruiterHome";
            }}
          >
            For Companies
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
