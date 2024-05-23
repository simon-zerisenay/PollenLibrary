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
      <div className="flex min-h-screen">
        
          {isSidebarVisible && (
            <div className="md:w-1/5 w-10/12 bg-white dark:bg-gray-950 shadow-lg md:relative absolute inset-0 z-50 md:z-0">
              <SideBar />
            </div>
          )}
          <main className={`flex-1 ${isSidebarVisible ? 'md:w-4/5 w-full' : 'w-full'} transition-all duration-300 ease-in-out`}>
          <DashNavBar toggleSidebar={toggleSidebar} />
                {children}
          </main>
      
      </div>
    </DashBordProvider>
  );
}

export default DashboardLayout;
