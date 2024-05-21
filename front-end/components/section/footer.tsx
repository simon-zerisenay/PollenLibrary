import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-8 dark:bg-black dark:text-gray-300 ">
      <div className="container mx-auto flex flex-col lg:flex-row justify-evenly md:items-start items-center  px-4 sm:px-6 lg:px-8 md:gap-3 gap-5 ">

        {/* Company Logo */}
        <div className="mb-4 lg:mb-0">
          <Image src="/logo.png" alt="Company Logo" width={200} height={200} />
        </div>

        {/* Navigation Links */}
        <nav className="mb-4 lg:mb-0">
          <ul className="flex flex-col gap-4 md:items-center items-start justify-start">
            <li className=' font-bold text-lg '>Links</li>
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Location */}
        <div className="mb-4 lg:mb-0">
            <ul className='flex-col flex gap-3 justify-start'>
                <li className=' font-bold text-lg'>Contact Us</li>
                <li className='flex gap-5 items-center'>
                  <MdEmail/> <p>info@frc.ae</p>
                </li>
                <li className='flex gap-5 items-center'>
                  <FaPhoneAlt/> <p>+971 92222411</p>
                </li>
                <li className='flex gap-5 items-center'>
                  <FaLocationDot/> <p>Fujairah, UAE</p>
                </li>
            </ul>
          
        </div>

        {/* Social Media Links */}
        <div className='flex flex-col justify-start gap-5 '>
        <h1 className=' font-bold text-lg '>Social</h1>
        <div className="flex items-center gap-4">
        
          <Link href="#" className="text-xl hover:text-gray-400"><BsLinkedin/></Link>
          <Link href="#" className="text-xl hover:text-gray-400"><AiOutlineInstagram/></Link>
          <Link href="#" className="text-xl hover:text-gray-400"><BsFacebook/></Link>
          <Link href="#" className="text-xl hover:text-gray-400"><FaTwitter/></Link>
        </div>
        </div>
        
      </div>

      {/* Copyright */}
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Fujairah Research Center. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
