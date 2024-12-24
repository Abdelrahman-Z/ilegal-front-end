"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaFileAlt,
//   FaCog,
//   FaPen,
} from "react-icons/fa";
import { RiOrganizationChart } from "react-icons/ri";
// import { BsTranslate } from "react-icons/bs";
// import { AiFillSignature } from "react-icons/ai";
// import { GiInjustice } from "react-icons/gi";



const navLinks = [
  {
    name: "Home",
    icon: <FaHome className="text-2xl" />,
    path: "/home",
  },
  {
    name: "Tenants",
    icon: <RiOrganizationChart className="text-2xl" />,
    path: "/home/tenants",
  },
  {
    name: "Employees",
    icon: <FaFileAlt className="text-2xl" />,
    path: "/home/employees",
  },
//   {
//     name: "Templates",
//     icon: <FaPen className="text-2xl" />,
//     path: "/dashboard/templates",
//   },
//   {
//     name: "Summarization",
//     icon: <FaCog className="text-2xl" />,
//     path: "/dashboard/summarization",
//   },
//   {
//     name: "Translation",
//     icon: <BsTranslate className="text-2xl" />,
//     path: "/dashboard/translation",
//   },
//   {
//     name: "Sign Document",
//     icon: <AiFillSignature  className="text-2xl" />,
//     path: "/dashboard/sign-document",
//   },
//   {
//     name: "Jurisdiction",
//     icon: <GiInjustice className="text-2xl" />,
//     path: "/dashboard/jurisdiction",
//   },
];

const Sidebar = () => {
  return (
    <aside className="w-fit bg-gray-800 h-full flex flex-col items-center py-4 space-y-8 text-white justify-between">
      <div className="text-lg font-bold">Logo</div>
      <nav className="flex flex-col items-center space-y-10">
        {navLinks.map((link, index) => (
          <Button
            key={index}
            startContent={link.icon}
            className="bg-transparent text-white hover:text-gray-300"
            as={Link}
            href={`${link.path}`}
          >
            {link.name}
          </Button>
        ))}
      </nav>
      <div></div>
    </aside>
  );
};

export default Sidebar;