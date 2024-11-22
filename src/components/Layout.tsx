import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom"; 
import Topbar from "./Topbar";
import Sidebar from "./Sidebar"; 
import RightSidebar from "./RightSidebar"; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation(); // Get current route location

  const showTopbar = location.pathname !== "/chat";

  return (
    <div className="flex flex-col min-h-screen">
      {showTopbar && (
        <div className="sticky top-0 z-10">
          <Topbar />
        </div>
      )}

      <div className="flex flex-1">
        <div className="bg-gray-200 hidden md:block z-20">
          <Sidebar />
        </div>

        <div className="flex-grow pl-4 md:pl-16 pr-4 md:pr-16">
          {children}
        </div>

        <div className="bg-gray-200 hidden md:block z-20">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
