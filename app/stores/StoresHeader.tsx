"use client";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { GoPlus } from "react-icons/go";
import StorePopUpHeader from "./StorePopUpHeader";

const sorts = [{ label: "Name" }, { label: "Price" }];
export default function StoresHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <div className="lg:flex hidden  justify-between items-center">
        <h1 className="text-3xl font-semibold text-slate-700">All Stores</h1>
        <div className="flex gap-4">
          <Card className=" rounded-md ">
            <Select
              defaultValue={searchParams.get("SortBy") || ""}
              onValueChange={(order) => {
                const params = new URLSearchParams(searchParams);
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
          </Card>
          <Button
            className="h-10 bg-blue-700 hover:bg-blue-800 rounded-md"
            onClick={() => {
              router.push("/stores/addStore");
            }}
          >
            <GoPlus className="w-[18px] h-[18px] border border-white rounded-full mr-[6px] text-white" />{" "}
            Add Stores
          </Button>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <StorePopUpHeader />
      </Suspense>
    </>
  );
}
