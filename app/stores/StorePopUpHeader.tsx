"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdFilterList } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";

const sorts = [{ label: "Name" }, { label: "Price" }];

export default function StorePopUpHeader() {
  const router = useRouter();
  const searchParam = useSearchParams();

  return (
    <div className="flex  lg:hidden justify-between items-center">
      <h1 className="2ll:text-3xl text-2xl font-semibold text-slate-700">
        All Stores
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <MdFilterList className="w-7 h-7" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            <div className="flex md:flex-row flex-col mt-10 md:mt-0 gap-4">
              <Button
                className="h-10 bg-blue-700 hover:bg-blue-800 rounded-md"
                onClick={() => {
                  router.push("/stores/addStore");
                }}
              >
                <GoPlus className="w-[18px] h-[18px] border border-white rounded-full mr-[6px] text-white" />{" "}
                Add Stores
              </Button>
              <Select
                defaultValue={searchParam.get("SortBy") || ""}
                onValueChange={(order) => {
                  const params = new URLSearchParams(searchParam);
                  params.set("SortBy", order.toString());
                  router.push("?" + params.toString());
                  router.refresh();
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sorts.map((el) => (
                      <SelectItem key={el.label} value={el.label}>
                        SortBy ( {el.label} )
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
