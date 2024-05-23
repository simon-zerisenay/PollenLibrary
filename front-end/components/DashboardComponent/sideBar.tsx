// SideBar.tsx
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import Browse from "./Browsby";
import { Card, Button } from "@nextui-org/react";
import Link from "next/link";
import {Image} from "@nextui-org/image";

const SideBar: React.FC = () => {
  return (
    <div className=" sticky top-0 h-screen md:py-10 z-40 transition-[margin-left] ease-in-out duration-500  flex flex-col md:items-center items-start md:pl-0 pl-10     md:overflow-y-auto  gap-2  ">
      <div>
      <Image
              width={200}
                 alt="NextUI hero Image"
                 src="/logo.png"
               />
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 w-2/3 rounded-md mt-10">
        <Link href='/Dashboard' className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Home
        </Link>
      </div>
      {/*<div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 w-2/3 rounded-md active:bg-transparent">
        <Browse /> 
  </div> */}
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 w-2/3 rounded-md">
        <Link href='/Dashboard/list_all' className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            List All
          
        </Link>
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 w-2/3 rounded-md">
        <Link href='/Dashboard/Gallery' className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Gallery      
          
        </Link>
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Link href='/Dashboard/addNew' className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Add New
          
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
