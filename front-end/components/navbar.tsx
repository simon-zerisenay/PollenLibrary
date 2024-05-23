'use client'
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";

import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {Image} from "@nextui-org/image";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { useState , useEffect} from "react";


const urlPath = process.env.NEXT_PUBLIC_url;

export const Navbar = () => {
	//const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	// const token = localStorage.getItem('token');
	// useEffect(() => {
	// 	const checkAuth = async () => {
	// 		try {
	// 			const response = await fetch(`${urlPath}/checkAuth`, {
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				},
	// 				body: JSON.stringify({ token: token })
	// 			});
	
	// 			if (response.ok) {
	// 				const result = await response.json();
	// 				// Handle the result, e.g., update state or navigate
	// 				console.log('Auth successful:', result);
	// 				setIsAuthenticated(true);
	// 			} else {
	// 				// Handle non-2xx status codes
	// 				console.error('Auth failed:', response.status);
	
	// 				setIsAuthenticated(false);
	// 				localStorage.removeItem('token');
					
	// 			}
	// 		} catch (error) {
	// 			// Handle network or other errors
	// 			console.error('Error during auth check:', error);
	// 		}
	// 	};
	// 	checkAuth();
	// }, [isAuthenticated, token]); //

	
	
	

	// const handleLogout = () => {
	// 	// Perform logout actions, e.g., clear localStorage, etc.
	// 	localStorage.removeItem('token');
	// 	setIsAuthenticated(false);
	// 	// Redirect the user to the homepage or login page if necessary
	// 	window.location.href = '/';
	//   };

	return (
		<NextUINavbar maxWidth="xl" position="sticky" className="fixed" isBordered>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
					<Image
              width={200}
                 alt="NextUI hero Image"
                 src="/logo.png"
               />
						
					</NextLink>
				</NavbarBrand>
				
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full gap-10 "
				justify="end"
			>
				<ul className="hidden lg:flex gap-4 justify-start ml-2 text-4xl font-medium ">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium "
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				
				
				<NavbarItem className="hidden sm:flex gap-5 md:mr-10">
					<NextLink href="/login">
					<button className='border-[0.5px] dark:border-gray-100 border-gray-900 rounded-full py-2 px-5 text-black dark:text-white font-medium'> Log In</button>
					</NextLink>
					<NextLink href="/signup">
					<button className='border-[0.5px] dark:border-gray-100 border-gray-900 rounded-full py-2 px-5 text-black dark:text-white font-medium' >Sign Up</button>
					</NextLink>
					<ThemeSwitch />
				</NavbarItem>
				
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
			  
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<NextLink
								color="foreground"
								
								href={item.href}
								
							>
								{item.label}
							</NextLink>
					
					
					</NavbarMenuItem>
					))}
					<div className=" flex flex-col">
					<NextLink href="/login">
					<button className='border-[0.5px] dark:border-gray-100 border-gray-900 rounded-full py-2 px-5 text-black dark:text-white font-medium'> Log In</button>
					</NextLink>
					<NextLink href="/signup">
					<button className='border-[0.5px] dark:border-gray-100 border-gray-900 rounded-full py-2 px-5 text-black dark:text-white font-medium' >Sign Up</button>
					</NextLink>
					</div>
					
					
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
