import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/contexts/userContext";

 
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // Check if the user is authenticated (if `data.name` exists)
  const isAuthenticated = auth?.data?.data?.name;

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

  return (
    <nav className="flex items-center justify-between p-4 shadow bg-white">
      {/* Logo Section */}
      
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 px-4 sm:px-8 md:px-20">
  <Link to="/" className="hover:text-blue-700">Kbfolio</Link> {/* Wrap with Link */}
</div>

      {/* Icons and Buttons */}
      <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 md:px-20">
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
    </nav>
  );
};

export default Navbar;
