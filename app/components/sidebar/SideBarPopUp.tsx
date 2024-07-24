import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import SideBarActivity from "./SideBarActivity";
import { Button } from "@/components/ui/button";
import { IoList } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

export default function SideBarPopUp() {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <IoList className="w-6 h-6" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            <Logo />
            <Separator />
            <SideBarActivity />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
