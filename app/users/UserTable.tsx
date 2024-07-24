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
import { useSearchParams } from "next/navigation";
import useFetchedUser from "./useUsers";
import Pagination from "../components/ReusablePagination";

export default function OrdersTable() {
  const { sortedUser } = useFetchedUser();

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const startIndex = (currentPage - 1) * pageSize;
  const usersPerPage = sortedUser?.slice(startIndex, startIndex + pageSize);
  const itemCount = sortedUser?.length || 0;

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="lg:block hidden">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersPerPage?.map((el) => (
            <TableRow key={el._id}>
              <TableCell>{el.name}</TableCell>
              <TableCell className="lg:block hidden">{el.email}</TableCell>
              <TableCell>{el.role}</TableCell>
              <TableCell>{el.city}</TableCell>
              <TableCell>{el.address}</TableCell>
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
