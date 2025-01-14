import { createContext, FC, ReactNode, useMemo, useState, useEffect } from "react";
import { getAuthentication } from "@/services/user/queries"; // API call to get authentication details

type AuthContextType = {
  data: any; // Replace `any` with your user data type
  isLoading: boolean;
  logout: () => void; // Function to log out the user
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // Use React Query's `useQuery` to fetch authentication data
  const { data, isLoading, error, isError } = getAuthentication();

  // Local state for managing the user data
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data); // Assuming the response contains a `data` field with the user info
    }
  }, [data]);

  const logout = () => {
    setUserData(null); // Clear the user data
    localStorage.removeItem("authData"); // Remove user data from localStorage (if used)
    sessionStorage.removeItem("authData"); // Optionally, clear from sessionStorage
  };

  // Create the context value using `useMemo`
  const contextValue = useMemo(
    () => ({
      data: userData,
      isLoading,
      logout,
    }),
    [userData, isLoading]
  );

  if (isError) {
    console.error("Error fetching authentication:", error);
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
