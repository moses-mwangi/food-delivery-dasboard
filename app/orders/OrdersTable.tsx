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
import DropDownButton from "./DropDownOrderButton";
import useOrder from "./useOrder";
import { useSearchParams } from "next/navigation";
import Pagination from "../components/ReusablePagination";

export default function OrdersTable() {
  const { sortedOrder, isLoading, ordersError } = useOrder();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  if (ordersError) return <p>error</p>;
  if (isLoading) return <p>loading</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const ordersPerPage = sortedOrder?.slice(startIndex, startIndex + pageSize);
  const itemCount = sortedOrder?.length || 0;

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className=" hidden lg:block">Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead className=" hidden md:block">Created At</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ordersPerPage?.map((el) => (
            <TableRow key={el._id}>
              <TableCell>{el.address.name}</TableCell>
              <TableCell className=" hidden lg:block">
                {el.address.email}
              </TableCell>
              <TableCell>
                <span
                  className={`${
                    el.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : el.status === "Food Processing"
                      ? " bg-yellow-200"
                      : "bg-red-100"
                  } py-1 px-2 rounded-full text-slate-800`}
                >
                  {el.status}
                </span>
              </TableCell>
              <TableCell>{`$${el.totalAmount}`}</TableCell>
              <TableCell className=" hidden md:block">
                {new Date(el.date).toDateString()}
              </TableCell>
              <TableCell className="">
                <DropDownButton order={el} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Suspense fallback={<p>Loading...</p>}>
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
