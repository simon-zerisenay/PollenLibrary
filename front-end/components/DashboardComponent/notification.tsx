import React from "react";
import { Badge, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

interface ContentItem {
  id: number;
  english_name: string;
  image_src: string;
}

interface NotificationProps {
  content: ContentItem[];
  role:string;
}

const Notification: React.FC<NotificationProps> = ({ content, role }) => {

  
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Badge content={content.length} shape="circle" color="danger" className="cursor-pointer">
          <IoMdNotificationsOutline size={24} />
        </Badge>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem key="view_detail">
          <Link href='/Dashboard/notification'>
            View Detail
          </Link>
        </DropdownItem>
        
          <DropdownItem >
          {content.map((item: ContentItem) => (
            <Card key={item.id} className="hover:bg-zinc-800 my-2">
              <CardHeader>
                {item.id}
              </CardHeader>
              <CardBody>
                <Image src={item.image_src} width={200} alt="image" />
              </CardBody>
              {role === 'admin' && (
                <CardFooter>
                   <Button className=" bg-green-400 hover:bg-green-700 mr-3" >
                      Approve
                   </Button>
                   <Button className=" bg-red-400 hover:bg-red-600" >
                      Reject
                   </Button>
                </CardFooter>
              )}
            </Card>
              ))}
          </DropdownItem>
      
      </DropdownMenu>
    </Dropdown>
  );
}

export default Notification;
