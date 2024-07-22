import React from "react";
import ModeToggle from "./DarkLightMode";

export default function Navbar() {
  return (
    <div className=" w-full border-b border-input flex justify-end py-3 pr-6">
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
