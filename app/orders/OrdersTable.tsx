"use client";
import React, { useEffect, useState } from "react";
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersPerPage?.map((el) => (
            <TableRow key={el._id}>
              <TableCell>{el.address.name}</TableCell>
              <TableCell>{el.address.email}</TableCell>
              <TableCell>
                <span
                  className={`${
                    el.status === "Confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : el.status === "Food Processing"
                      ? " bg-yellow-200"
                      : "bg-red-100"
                  } py-1 px-2 rounded-full text-slate-800`}
                >
                  {el.status}
                </span>
              </TableCell>
              <TableCell>{`$${el.totalAmount}`}</TableCell>
              <TableCell className="">
                {new Date(el.date).toDateString()}
              </TableCell>
              <TableCell className="">
                <DropDownButton order={el} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={itemCount}
        setCurrentPage={setCurrentPage}
      />
    </Card>
  );
}
