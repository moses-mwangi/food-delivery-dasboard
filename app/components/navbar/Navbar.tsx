import UserSignPage from "@/app/users/userSign";
import React from "react";
// import ModeToggle from "./DarkLightMode";

export default function Navbar() {
  return (
    <div className=" w-full border-b border-input flex justify-end px-14 py-5">
      <div className="flex gap-6 items-center">
        <UserSignPage />
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
}
