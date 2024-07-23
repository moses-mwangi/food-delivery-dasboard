"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import restName from "../../public/images/food.png";
import DropDownButton from "./DropDownButton";
import useStore from "./useStore";
import { useSearchParams } from "next/navigation";
import Pagination from "../components/ReusablePagination";

export default function StoresTable() {
  const { stores, isLoading, storeError } = useStore();

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  if (storeError) return <p>error</p>;
  if (isLoading) return <p>loading</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const storesPerPage = stores?.slice(startIndex, startIndex + pageSize);
  const itemCount = stores?.length || 0;

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Image</TableHead>
            <TableHead>Store Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="">Delivery Price</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {storesPerPage?.map((res) => (
            <TableRow key={res._id}>
              <TableCell>
                <Image
                  className=" rounded-[2px]"
                  src={restName}
                  alt="restName"
                  width={37}
                  height={37}
                />
              </TableCell>
              <TableCell>{res.restName}</TableCell>
              <TableCell>{res.location}</TableCell>
              <TableCell className="">${res.deliveryPrice}</TableCell>
              <TableCell className="">
                <DropDownButton res={res} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Suspense fallback={<p>Loading..</p>}>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemCount={itemCount}
          setCurrentPage={setCurrentPage}
        />
      </Suspense>
    </Card>
  );
}
