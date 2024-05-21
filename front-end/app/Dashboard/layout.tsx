"use client"
// DashboardLayout.tsx
'use client'

import React, { useState, ReactNode } from 'react';
import DashNavBar from "@/components/DashboardComponent/dashNavbar";
import SideBar from "@/components/DashboardComponent/sideBar";
import { DashBordProvider } from "@/context/DashboardContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState);
  };

  return (
    <DashBordProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 relative">
          {isSidebarVisible && (
            <div className="md:w-1/5 w-10/12 md:relative absolute inset-0 z-50 md:z-0 transition-transform duration-500 bg-white dark:bg-gray-950  shadow-lg">
              <SideBar />
            </div>
          )}
          <main className={`flex-1 ${isSidebarVisible ? 'md:w-4/5 w-full' : 'w-full'} transition-all duration-300 ease-in-out p-5`}>
          <DashNavBar toggleSidebar={toggleSidebar} />
              
                {children}
              
           
          </main>
        </div>
      </div>
    </DashBordProvider>
  );
}

export default DashboardLayout;
