import { createBrowserRouter } from "react-router-dom";


import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import DashboardLayout from "@/layouts/DashBoardLayout";
import { LandingLayout } from "@/layouts/LandingLayout";
import SendEmail from "@/pages/SendEmails";
import CreateCampaign from "@/pages/CreateCampaign";
import CreatedCampaign from "@/pages/CreatedCampaign";


const router = createBrowserRouter([
  // Main Layout Routes
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  // Admin Layout Routes
  {
    path: "/user/dashboard",
    element: <DashboardLayout />,
    children: [ 
      { path: "/user/dashboard/CreateCampaign", element: <CreateCampaign /> },
      { path: "/user/dashboard/CreatedCampaign", element: <CreatedCampaign /> },
      { path: "/user/dashboard/sendEmail", element: <SendEmail /> },
    ],
  },
]);

export default router;
