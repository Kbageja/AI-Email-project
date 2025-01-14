import { createContext, FC, ReactNode, useState, useMemo, useEffect } from "react";

type SideBarContextType = {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

type SideBarProviderProps = {
  children: ReactNode;
};

const SideBarProvider: FC<SideBarProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<string>(
    "CreatedCampaign"
  );

  useEffect(() => {
    // Sync the selected item with localStorage
    localStorage.setItem("selectedSidebarItem", selectedItem);
  }, [selectedItem]);

  // Create the context value using `useMemo`
  const contextValue = useMemo(
    () => ({
      selectedItem,
      setSelectedItem,
    }),
    [selectedItem]
  );

  return (
    <SideBarContext.Provider value={contextValue}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
