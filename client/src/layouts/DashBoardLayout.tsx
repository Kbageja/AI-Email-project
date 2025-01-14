import Sidebar from "@/components/custom/sidebar";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative flex">
        <div
          className="lg:hidden fixed w-full bg-transparent h-14 backdrop-blur-sm z-50 cursor-pointer flex justify-end"
          onClick={() => setOpen(!open)}
        >
          <IoReorderThreeOutline size={40} className="my-auto w-12 h-12" />
        </div>
        <div
          className={`fixed ${
            open ? "-translate-x-0" : "-translate-x-96"
          } ease-in-out lg:translate-x-0 transition-all delay-75 lg:left-0 top-0 z-50`}
        >
          <Sidebar toggleOpen={() => setOpen(false)} />
        </div>
        <div className="ml-0 lg:ml-[16rem] relative w-full h-screen">
          <div
            className="relative w-full h-screen bg-cover  sm:bg-contain bg-[url('/src/assets/bg-line1.svg'),url('/src/assets/bg-line2.svg')] bg-center bg-no-repeat "
            style={{
              backgroundPosition: "left, right",
            }}
          >
            <Outlet />
          </div>
        </div>
        {open && (
          <div
            className="fixed inset-0 transition-all ease-in-out delay-25 delay-25  bg-black bg-opacity-70 "
            onClick={() => setOpen(!open)}
          ></div>
        )}
      </div>
    </>
  );
};

export default DashBoardLayout;
