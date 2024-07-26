"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";

const sorts = [{ label: "city" }, { label: "role" }, { label: "name" }];

export default function SortUser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Card className="md:block hidden rounded-md ">
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
  );
}
