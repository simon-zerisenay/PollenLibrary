import React, { useState } from 'react';
import Link from 'next/link';

const Browse: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button
        type="button"
        className="flex w-full  bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200 gap-2 justify-start md:w-11/12 py-2 rounded-md  font-medium"
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
        onClick={toggleDropdown}
      >

        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Browse By</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul id="dropdown-example" className={`${isDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2 bg-transparent text-start`}>
        <li>
          <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

            Common Name

          </Link>
        </li>
        <li>
          <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

            Family

          </Link>
        </li>
        <li>
          <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            Location
          </Link>
        </li>
        <li>
          <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

            All Filters

          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Browse;
