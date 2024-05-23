// DashNavBar.tsx
'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { ThemeSwitch } from "../theme-switch";
import { FiUpload } from "react-icons/fi";
import Notification from "./notification";
import Link from "next/link";
import { useDashboardContext } from "@/context/DashboardContext";

interface DashNavBarProps {
  toggleSidebar: () => void;
}

const DashNavBar: React.FC<DashNavBarProps> = ({ toggleSidebar }) => {
  const {handleLogout} = useDashboardContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle the file upload here
      console.log(file);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Navbar maxWidth="full"  className=" shadow-sm rounded-md py-2 z-50 w-full">
      <NavbarContent justify="start" className="basis-1/5 sm:basis-full">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <CiMenuBurger size={32} onClick={toggleSidebar} className="cursor-pointer" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" className="items-center w-full  md:w-2/3 ">
        <div className="relative flex items-center w-full">
          <Input
            className="w-full py-3 pl-10"
            placeholder="Type to search..."
            startContent={<CiSearch size={18} />}
            type="search"
          />
          <div className="absolute right-0  items-center pr-3 hidden">
            <FiUpload size={24} className="cursor-pointer" onClick={handleUploadClick} />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitch />
        {/*<Notification/> */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name=""
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/*<DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">
              Settings</DropdownItem> */}
            <DropdownItem key="help_and_feedback">
              <Link href='/contact'>Help & Feedback</Link></DropdownItem>
            <DropdownItem key="logout" color="danger" onClick ={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default DashNavBar;
