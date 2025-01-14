import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./contexts/userContext"; // Ensure this path is correct
import SideBarProvider from "./contexts/sideBarContext"; // Import the new SideBarProvider
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import router from "./routes/router"; // Import the router from your routes file
import "./App.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SideBarProvider>
          <RouterProvider router={router} /> {/* Use RouterProvider with your router */}
        </SideBarProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
