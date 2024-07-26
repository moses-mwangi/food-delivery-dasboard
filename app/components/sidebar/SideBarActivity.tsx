"use client";

import { HomeIcon, LucideUsers2, Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LiaStoreSolid } from "react-icons/lia";
import { LuExternalLink } from "react-icons/lu";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "My Website",
    icon: <LuExternalLink className="w-[22px] h-[22px]" />,
    ref: "https://food-delivery-five-eta.vercel.app/",
  },
  {
    label: "Home",
    icon: <HomeIcon className="w-[22px] h-[22px]" />,
    ref: "/",
  },
  {
    label: "My Orders",
    icon: <ShoppingCart className="w-[22px] h-[22px]" />,
    ref: "/orders",
  },
  {
    label: "Stores",
    icon: <LiaStoreSolid className="w-[22px] h-[22px]" />,
    ref: "/stores",
  },
  {
    label: "Users",
    icon: <LucideUsers2 className="w-[22px] h-[22px]" />,
    ref: "/users",
  },
  {
    label: "Setting",
    icon: <Settings className="w-[22px] h-[22px]" />,
    ref: "/setting",
  },
];

export default function SideBarActivity() {
  const currentPath = usePathname();

  return (
    <div className="px-3 pt-8 flex flex-col gap-2">
      {links.map((el) => (
        <Link
          key={el.label}
          href={el.ref}
          className={`${
            el.ref === currentPath ? " bg-slate-200" : ""
          }   flex gap-2 items-center py-2 px-4 rounded-sm hover:bg-slate-200 transition-all duration-150`}
        >
          <span
            className={`${
              el.ref === currentPath ? " text-blue-700/90" : " text-slate-500"
            }  font-medium`}
          >
            {el.icon}
          </span>
          <span className="font-medium text-slate-600">{el.label}</span>
        </Link>
      ))}
    </div>
  );
}
