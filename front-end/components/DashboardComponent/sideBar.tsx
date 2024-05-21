// SideBar.tsx
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import Browse from "./Browsby";
import { Card, Button } from "@nextui-org/react";
import Link from "next/link";

const SideBar: React.FC = () => {
  return (
    <Card className=" sticky h-full py-10 z-40 transition-[margin-left] ease-in-out duration-500  flex flex-col items-center shadow-sm md:overflow-y-auto rounded-md gap-2 ">
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Link href='/'>
          <Button className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Home
          </Button>
        </Link>
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Link href='/Dashboard'>
          <Button className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Library
          </Button>
        </Link>
      </div>
      
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Browse />
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Link href='/Dashboard'>
          <Button className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            List All
          </Button>
        </Link>
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Link href='/Dashboard'>
          <Button className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Gallery      </Button>
        </Link>
      </div>
      <div className="dark:hover:bg-zinc-800 hover:bg-zinc-200 md:w-11/12 rounded-md">
        <Link href='/Dashboard/addNew'>
          <Button className="flex items-center bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 px-3 py-2 rounded-md  font-medium">
            Add New
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SideBar;
