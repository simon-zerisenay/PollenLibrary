import React from "react";
import { Badge, Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Card } from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";

export default function Notification() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Badge content="5" shape="circle" color="danger" className=" cursor-pointer">
          
            <IoMdNotificationsOutline size={24}  />
          
        </Badge>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem key="new_message">
            <Link href='/Dashboard/notification'>
            View Detail</Link>
            </DropdownItem>
        <DropdownItem key="new_message">
            <Card>
                
            </Card>
        </DropdownItem>
        <DropdownItem key="new_message">Help & Feedback</DropdownItem>
        <DropdownItem key="new_message">Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
