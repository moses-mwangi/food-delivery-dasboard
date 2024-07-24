import React from "react";
import SideBarContainer from "./components/sidebar/SideBarContainer";

export default function SideBar() {
  return (
    <div className=" hidden md:block   h-full border-r border-input">
      <SideBarContainer />
    </div>
  );
}
