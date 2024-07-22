import React from "react";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import SideBarActivity from "./SideBarActivity";

export default function SideBarContainer() {
  return (
    <div>
      <Logo />
      <Separator />
      <SideBarActivity />
    </div>
  );
}
