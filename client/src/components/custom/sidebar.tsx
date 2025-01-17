import { cn } from "@/lib/utils";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useContext, useEffect } from "react";
import { useLogout } from "@/services/user/mutations";
import { AuthContext } from "@/contexts/userContext";
import { SideBarContext } from "../../contexts/sideBarContext";

interface SidebarProps {
  toggleOpen: () => void;
}

const normalLink =
  "flex items-center text-base md:text-md text-main-900 font-normal justify-start gap-2 hover:bg-brandprimary hover:bg-opacity-10 px-3 py-3 ";

  const Sidebar = ({ toggleOpen }: SidebarProps) => {
    const sidebarContext = useContext(SideBarContext);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    if (!sidebarContext) {
      throw new Error("Sidebar must be used within a SideBarProvider");
    }
  
    const { selectedItem, setSelectedItem } = sidebarContext;
    const { mutate: logout } = useLogout();
    const isAuthenticated = auth?.data?.data?.name;
  
    useEffect(() => {
      localStorage.setItem("selectedSidebarItem", selectedItem);
      navigate(`/user/dashboard/${selectedItem}`); // Update the route when selectedItem changes
    }, [selectedItem, navigate]);
  
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/"); // Redirect if not authenticated
      }
    }, [isAuthenticated, navigate]);
  
    const handleLogout = () => {
      logout(undefined, {
        onSuccess: () => {
          localStorage.removeItem("selectedSidebarItem");
          localStorage.removeItem("selectedCampaignId");
          localStorage.removeItem("selectedRecipients");
          localStorage.removeItem("extractedData");
          auth?.logout();
          navigate("/");
        },
      });
    };
  
    const handleItemClick = (item: string) => {
      setSelectedItem(item); // Update the selected item in the context
      toggleOpen();
    };
  
    return (
      isAuthenticated && (
        <div className="relative bg-white lg:w-64 flex flex-col border-r-2 border-brightred border-opacity-15 h-screen pt-4 lg:mt-3">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 px-4 sm:px-8 md:px-20">
            <Link to="/" className="hover:text-blue-700">
              Kbfolio
            </Link>
          </div>
          <NavLink
            to="/user/dashboard/CreatedCampaign"
            className={`capitalize flex justify-start items-center text-base h-12 md:text-md rounded-xl tracking-wide px-4 mt-8 mx-4 min-w-56 ${
              selectedItem === "CreatedCampaign"
                ? "bg-blue-500 text-white"
                : "bg-white text-main-900 hover:bg-slate-800 hover:text-white"
            }`}
            onClick={() => handleItemClick("CreatedCampaign")}
          >
            <PiSquaresFourBold className="inline-block rounded-full text-brandprimary w-5 h-5 mr-2 rotate-45" />
            Created Campaign
          </NavLink>
          <NavLink
          to="/user/dashboard/CreateCampaign"
          className={`capitalize flex justify-start items-center text-base h-12 md:text-md rounded-xl tracking-wide px-4 mt-2 mx-4 min-w-56 ${
            selectedItem === "CreateCampaign"
              ? "bg-blue-500 text-white"
              : "bg-white text-main-900 hover:bg-slate-800 hover:text-white"
          }`}
          onClick={() => handleItemClick("CreateCampaign")}
        >
          <PiSquaresFourBold className="inline-block rounded-full text-brandprimary w-5 h-5 mr-2 rotate-45" />
          Create Campaign
        </NavLink>
        <NavLink
          to="/user/dashboard/sendEmail"
          className={`capitalize flex justify-start items-center text-base h-12 md:text-md rounded-xl tracking-wide px-4 mt-2 mx-4 min-w-56 ${
            selectedItem === "SendEmail"
              ? "bg-blue-500 text-white"
              : "bg-white text-main-900 hover:bg-slate-800 hover:text-white"
          }`}
          onClick={() => handleItemClick("SendEmail")}
        >
          <PiSquaresFourBold className="inline-block rounded-full text-brandprimary w-5 h-5 mr-2 rotate-45" />
          Send Emails
        </NavLink>
          {/* Add other links similarly */}
          <div className="absolute w-full bottom-6 left-0 px-4">
            <NavLink to="/dashboard/settings">
              <button className={cn(normalLink, "w-full hover:bg-gray-950")}>
                <CgProfile className="w-5 h-5" />
                Profile
              </button>
            </NavLink>
            <button
              className={cn(normalLink, "w-full text-red-500 hover:bg-gray-950")}
              onClick={handleLogout}
            >
              <MdLogout className="w-5 h-5" />
              {"Sign Out"}
            </button>
          </div>
        </div>
      )
    );
  };
  
  export default Sidebar;